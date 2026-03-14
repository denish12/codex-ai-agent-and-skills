from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
LOCALE_ROOTS = [ROOT, ROOT / "locales" / "en"]
SKILL_VENDOR_FILES = ["skill.yaml", "openai.yaml", "claude.json", "gemini.json", "copilot.json", "qwen.json"]
ORCHESTRATOR_VENDOR_FILES = [
    "AGENTS.yaml",
    "agents/orchestrator.openai.yaml",
    "agents/orchestrator.claude.json",
    "agents/orchestrator.gemini.json",
    "agents/orchestrator.copilot.json",
    "agents/orchestrator.qwen.json",
]
JSON_VENDOR_FILES = ["claude.json", "gemini.json", "copilot.json", "qwen.json"]


def main() -> int:
    errors: list[str] = []
    for root in LOCALE_ROOTS:
        errors.extend(validate_root(root))

    if errors:
        print("Metadata validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Metadata validation passed.")
    return 0


def validate_root(root: Path) -> list[str]:
    errors: list[str] = []

    orchestrator_yaml = root / "AGENTS.yaml"
    portable_orchestrator = ensure_yaml(orchestrator_yaml, errors, "orchestrator")
    if portable_orchestrator is not None:
        if portable_orchestrator.get("name") != "web_development_orchestra":
            errors.append(f"AGENTS.yaml name mismatch in {orchestrator_yaml}")
        for key in ("display_name", "description", "default_prompt"):
            if not portable_orchestrator.get(key):
                errors.append(f"Missing {key} in {orchestrator_yaml}")

    for relative_path in ORCHESTRATOR_VENDOR_FILES[1:]:
        path = root / relative_path
        if not path.exists():
            errors.append(f"Missing {path}")
            continue

        if path.suffix == ".json":
            payload = ensure_json(path, errors)
            if payload is None:
                continue
            if payload.get("name") != "web_development_orchestra":
                errors.append(f"Vendor orchestrator name mismatch in {path}")
            if portable_orchestrator is not None:
                compare_equal(payload, portable_orchestrator, path, errors, "display_name")
                compare_equal(payload, portable_orchestrator, path, errors, "description")
                compare_equal(payload, portable_orchestrator, path, errors, "default_prompt")
        else:
            payload = ensure_yaml(path, errors, "vendor orchestrator")
            if payload is None:
                continue
            interface = payload.get("interface")
            if not isinstance(interface, dict):
                errors.append(f"Missing interface section in {path}")
                continue
            for key in ("display_name", "short_description", "default_prompt"):
                if not interface.get(key):
                    errors.append(f"Missing interface.{key} in {path}")
            if portable_orchestrator is not None:
                if interface.get("display_name") != portable_orchestrator.get("display_name"):
                    errors.append(f"display_name mismatch between {orchestrator_yaml} and {path}")
                if interface.get("default_prompt") != portable_orchestrator.get("default_prompt"):
                    errors.append(f"default_prompt mismatch between {orchestrator_yaml} and {path}")

    for skill_dir in iter_skill_dirs(root):
        skill_file = skill_dir / "SKILL.md"
        if not skill_file.exists():
            errors.append(f"Missing {skill_file}")
            continue

        metadata = parse_frontmatter(skill_file.read_text(encoding="utf-8"))
        expected_name = skill_dir.name
        if metadata.get("name") != expected_name:
            errors.append(f"Frontmatter name mismatch in {skill_file}: expected {expected_name}")

        agents_dir = skill_dir / "agents"
        for file_name in SKILL_VENDOR_FILES:
            metadata_path = agents_dir / file_name
            if not metadata_path.exists():
                errors.append(f"Missing {metadata_path}")

        skill_yaml_path = agents_dir / "skill.yaml"
        portable_skill = ensure_yaml(skill_yaml_path, errors, f"skill {expected_name}")
        if portable_skill is not None:
            if portable_skill.get("name") != expected_name:
                errors.append(f"skill.yaml name mismatch in {skill_yaml_path}")
            if portable_skill.get("description") != metadata.get("description"):
                errors.append(f"skill.yaml description mismatch in {skill_yaml_path}")
            for key in ("display_name", "description", "default_prompt"):
                if not portable_skill.get(key):
                    errors.append(f"Missing {key} in {skill_yaml_path}")

        openai_yaml_path = agents_dir / "openai.yaml"
        openai_payload = ensure_yaml(openai_yaml_path, errors, f"skill {expected_name} openai")
        if openai_payload is not None:
            interface = openai_payload.get("interface")
            if not isinstance(interface, dict):
                errors.append(f"Missing interface section in {openai_yaml_path}")
            else:
                for key in ("display_name", "short_description", "default_prompt"):
                    if not interface.get(key):
                        errors.append(f"Missing interface.{key} in {openai_yaml_path}")
                if portable_skill is not None:
                    if interface.get("display_name") != portable_skill.get("display_name"):
                        errors.append(f"display_name mismatch between {skill_yaml_path} and {openai_yaml_path}")
                    if interface.get("default_prompt") != portable_skill.get("default_prompt"):
                        errors.append(f"default_prompt mismatch between {skill_yaml_path} and {openai_yaml_path}")

        for json_file_name in JSON_VENDOR_FILES:
            json_path = agents_dir / json_file_name
            payload = ensure_json(json_path, errors)
            if payload is None:
                continue
            if payload.get("name") != expected_name:
                errors.append(f"Vendor metadata name mismatch in {json_path}")
            if portable_skill is not None:
                compare_equal(payload, portable_skill, json_path, errors, "display_name")
                compare_equal(payload, portable_skill, json_path, errors, "description")
                compare_equal(payload, portable_skill, json_path, errors, "default_prompt")

    return errors


def compare_equal(payload: dict[str, Any], source: dict[str, Any], path: Path, errors: list[str], key: str) -> None:
    if payload.get(key) != source.get(key):
        errors.append(f"{key} mismatch in {path}")


def iter_skill_dirs(root: Path):
    nested_root = root / ".agents" / "skills"
    if nested_root.exists():
        for child in sorted(nested_root.iterdir()):
            if child.is_dir() and (child / "SKILL.md").exists():
                yield child

    flat_root = root / ".agents"
    if not flat_root.exists():
        return
    for child in sorted(flat_root.iterdir()):
        if child.name in {"skills", "workflows"} or not child.is_dir():
            continue
        if (child / "SKILL.md").exists():
            yield child



def parse_frontmatter(text: str) -> dict[str, str]:
    normalized = text.replace("\r\n", "\n")
    match = re.match(r"^\ufeff?---\n(.*?)\n---\n?", normalized, re.DOTALL)
    if not match:
        return {}
    metadata: dict[str, str] = {}
    for raw_line in match.group(1).splitlines():
        line = raw_line.strip()
        if not line or ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip().strip('"').strip("'")
    return metadata


def ensure_json(path: Path, errors: list[str]) -> dict[str, Any] | None:
    if not path.exists():
        return None
    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        errors.append(f"Invalid JSON in {path}: {exc}")
        return None
    if not isinstance(payload, dict):
        errors.append(f"Expected JSON object in {path}")
        return None
    return payload


def ensure_yaml(path: Path, errors: list[str], label: str) -> dict[str, Any] | None:
    if not path.exists():
        return None
    try:
        payload = parse_simple_yaml(path.read_text(encoding="utf-8"))
    except ValueError as exc:
        errors.append(f"Invalid YAML in {path}: {exc}")
        return None
    if not isinstance(payload, dict):
        errors.append(f"Expected YAML mapping in {path} for {label}")
        return None
    return payload


def parse_simple_yaml(text: str) -> dict[str, Any]:
    lines = [line.rstrip() for line in text.splitlines() if line.strip()]
    root: dict[str, Any] = {}
    stack: list[tuple[int, Any]] = [(-1, root)]

    for index, line in enumerate(lines):
        indent = len(line) - len(line.lstrip(" "))
        stripped = line.strip()

        while len(stack) > 1 and indent <= stack[-1][0]:
            stack.pop()

        container = stack[-1][1]

        if stripped.startswith("- "):
            if not isinstance(container, list):
                raise ValueError(f"Unexpected list item: {line}")
            container.append(parse_yaml_scalar(stripped[2:].strip()))
            continue

        if ":" not in stripped:
            raise ValueError(f"Invalid mapping line: {line}")

        key, raw_value = stripped.split(":", 1)
        key = key.strip()
        raw_value = raw_value.strip()

        if not isinstance(container, dict):
            raise ValueError(f"Unexpected mapping in list context: {line}")

        if raw_value == "":
            next_line = next_non_empty(lines, index + 1)
            if next_line is not None:
                next_indent = len(next_line) - len(next_line.lstrip(" "))
                nested: Any = [] if next_indent > indent and next_line.strip().startswith("- ") else {}
            else:
                nested = {}
            container[key] = nested
            stack.append((indent, nested))
            continue

        container[key] = parse_yaml_scalar(raw_value)

    return root


def next_non_empty(lines: list[str], start: int) -> str | None:
    for index in range(start, len(lines)):
        if lines[index].strip():
            return lines[index]
    return None


def parse_yaml_scalar(raw_value: str) -> Any:
    if raw_value == "[]":
        return []
    if raw_value == "true":
        return True
    if raw_value == "false":
        return False
    if raw_value == "null":
        return None
    if raw_value.startswith('"') and raw_value.endswith('"'):
        return json.loads(raw_value)
    if raw_value.startswith("'") and raw_value.endswith("'"):
        return raw_value[1:-1]
    try:
        return int(raw_value)
    except ValueError:
        pass
    try:
        return float(raw_value)
    except ValueError:
        pass
    return raw_value


if __name__ == "__main__":
    sys.exit(main())
