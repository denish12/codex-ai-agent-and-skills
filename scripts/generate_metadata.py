from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

TITLE_OVERRIDES = {
    "a11y": "A11y",
    "adr": "ADR",
    "api": "API",
    "ci": "CI",
    "css": "CSS",
    "devops": "DevOps",
    "e2e": "E2E",
    "go": "Go",
    "js": "JS",
    "k8s": "K8s",
    "mongodb": "MongoDB",
    "n8n": "n8n",
    "pm": "PM",
    "prd": "PRD",
    "qa": "QA",
    "qwen": "Qwen",
    "react": "React",
    "rtk": "RTK",
    "sdk": "SDK",
    "supabase": "Supabase",
    "tdd": "TDD",
    "ts": "TS",
    "typescript": "TypeScript",
    "ui": "UI",
    "ux": "UX",
    "wix": "Wix",
}

RU_DISPLAY_NAME_OVERRIDES = {
    "a11y_baseline": "\u0411\u0430\u0437\u043e\u0432\u0430\u044f \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e\u0441\u0442\u044c UI",
    "adr_log": "\u0416\u0443\u0440\u043d\u0430\u043b ADR",
    "api_contract_compliance_review": "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044f API-\u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u0430\u043c",
    "api_contracts": "API-\u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u044b",
    "architecture_compliance_review": "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044f \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0435",
    "architecture_doc": "\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u0430\u044f \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0438\u044f",
    "board": "\u041f\u0440\u043e\u0435\u043a\u0442\u043d\u0430\u044f \u0434\u043e\u0441\u043a\u0430",
    "cloud_infrastructure_security": "\u0411\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c \u043e\u0431\u043b\u0430\u043a\u0430 \u0438 \u0438\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u044b",
    "code_review_checklist": "\u0427\u0435\u043a-\u043b\u0438\u0441\u0442 \u043a\u043e\u0434-\u0440\u0435\u0432\u044c\u044e",
    "current_state_analysis": "\u0410\u043d\u0430\u043b\u0438\u0437 \u0442\u0435\u043a\u0443\u0449\u0435\u0433\u043e \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f",
    "data_model": "\u041c\u043e\u0434\u0435\u043b\u044c \u0434\u0430\u043d\u043d\u044b\u0445",
    "dependency_supply_chain_review": "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0437\u0430\u0432\u0438\u0441\u0438\u043c\u043e\u0441\u0442\u0435\u0439 \u0438 \u0446\u0435\u043f\u043e\u0447\u043a\u0438 \u043f\u043e\u0441\u0442\u0430\u0432\u043e\u043a",
    "deployment_ci_plan": "\u041f\u043b\u0430\u043d \u0434\u0435\u043f\u043b\u043e\u044f \u0438 CI",
    "design_intake": "\u0421\u0431\u043e\u0440 \u0434\u0438\u0437\u0430\u0439\u043d-\u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u043e\u0432",
    "design_parity_review": "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0434\u0438\u0437\u0430\u0439\u043d-\u043f\u0430\u0440\u0438\u0442\u0435\u0442\u0430",
    "design_systems": "\u0418\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f \u0434\u0438\u0437\u0430\u0439\u043d-\u0441\u0438\u0441\u0442\u0435\u043c\u044b",
    "dev_reference_snippets": "\u0420\u0435\u0444\u0435\u0440\u0435\u043d\u0441\u044b \u0438 \u0441\u043d\u0438\u043f\u043f\u0435\u0442\u044b \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438",
    "docker_kubernetes_architecture": "\u0410\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u0430 Docker \u0438 Kubernetes",
    "es2025_beast_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 ES2025",
    "gates": "\u0413\u0435\u0439\u0442\u044b \u0438 \u043a\u0440\u0438\u0442\u0435\u0440\u0438\u0438 \u0433\u043e\u0442\u043e\u0432\u043d\u043e\u0441\u0442\u0438",
    "go_beast_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 Go",
    "handoff": "\u041f\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u0430 \u0430\u0433\u0435\u043d\u0442\u0430\u043c",
    "k8s_manifests_conventions": "\u041a\u043e\u043d\u0432\u0435\u043d\u0446\u0438\u0438 Kubernetes-\u043c\u0430\u043d\u0438\u0444\u0435\u0441\u0442\u043e\u0432",
    "memory": "\u041f\u0430\u043c\u044f\u0442\u044c \u0438 \u0432\u0435\u043a\u0442\u043e\u0440\u043d\u0430\u044f \u0411\u0414",
    "mongodb_mongoose_best_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 MongoDB \u0438 Mongoose",
    "n8n_pinecone_qdrant_supabase": "\u0421\u0432\u044f\u0437\u043a\u0430 n8n, Pinecone/Qdrant \u0438 Supabase",
    "node_express_beast_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 Node \u0438 Express",
    "observability_logging": "\u041b\u043e\u0433\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u0438 \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0441\u0442\u044c",
    "observability_plan": "\u041f\u043b\u0430\u043d \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0441\u0442\u0438",
    "observability_review": "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0435\u043c\u043e\u0441\u0442\u0438",
    "performance_review_baseline": "\u0411\u0430\u0437\u043e\u0432\u0430\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438",
    "pm_backlog": "PM-\u0431\u044d\u043a\u043b\u043e\u0433",
    "pm_interview": "PM-\u0438\u043d\u0442\u0435\u0440\u0432\u044c\u044e \u0438 \u0434\u0438\u0441\u043a\u0430\u0432\u0435\u0440\u0438",
    "pm_prd": "PRD",
    "qa_api_contract_tests": "QA: API-\u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442\u043d\u044b\u0435 \u0442\u0435\u0441\u0442\u044b",
    "qa_e2e_playwright": "QA: E2E \u043d\u0430 Playwright",
    "qa_manual_run": "QA: \u0440\u0443\u0447\u043d\u043e\u0439 \u043f\u0440\u043e\u0433\u043e\u043d",
    "qa_security_smoke_tests": "QA: \u0431\u0430\u0437\u043e\u0432\u044b\u0435 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438",
    "qa_test_plan": "QA: \u0442\u0435\u0441\u0442-\u043f\u043b\u0430\u043d",
    "qa_ui_a11y_smoke": "QA: UI \u0438 a11y smoke",
    "react_15_3_wix_iframe": "React 15.3 \u0438 Wix iFrame",
    "react_beast_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 React",
    "release_gate": "\u0420\u0435\u043b\u0438\u0437\u043d\u044b\u0439 \u0433\u0435\u0439\u0442",
    "release_gate_checklist_template": "\u0428\u0430\u0431\u043b\u043e\u043d \u0447\u0435\u043a-\u043b\u0438\u0441\u0442\u0430 \u0440\u0435\u043b\u0438\u0437\u043d\u043e\u0433\u043e \u0433\u0435\u0439\u0442\u0430",
    "review_reference_snippets": "\u0420\u0435\u0444\u0435\u0440\u0435\u043d\u0441\u044b \u0434\u043b\u044f \u0440\u0435\u0432\u044c\u044e",
    "security_baseline_dev": "\u0411\u0430\u0437\u043e\u0432\u0430\u044f \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u044c \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438",
    "security_review": "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f",
    "security_review_baseline": "\u0411\u0430\u0437\u043e\u0432\u0430\u044f security-\u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430",
    "state_rtk_beast_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 RTK",
    "state_zustand_beast_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 Zustand",
    "styling_css_stack": "\u0421\u0442\u0430\u0439\u043b\u0438\u043d\u0433 \u0438 CSS-\u0441\u0442\u0435\u043a",
    "system_design_checklist": "\u0427\u0435\u043a-\u043b\u0438\u0441\u0442 \u0441\u0438\u0441\u0442\u0435\u043c\u043d\u043e\u0433\u043e \u0434\u0438\u0437\u0430\u0439\u043d\u0430",
    "tanstack_beast_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 TanStack",
    "tdd_workflow": "TDD-\u043f\u0440\u043e\u0446\u0435\u0441\u0441",
    "testing_strategy_js": "\u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u044f \u0442\u0435\u0441\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f JS/TS",
    "tests_quality_review": "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0430 \u0442\u0435\u0441\u0442\u043e\u0432",
    "threat_model_baseline": "\u0411\u0430\u0437\u043e\u0432\u0430\u044f \u043c\u043e\u0434\u0435\u043b\u044c \u0443\u0433\u0440\u043e\u0437",
    "tooling_bun_biome": "\u0418\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442\u044b Bun \u0438 Biome",
    "typescript_beast_practices": "\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0438 TypeScript",
    "ui_a11y_smoke_review": "UI \u0438 a11y smoke-\u0440\u0435\u0432\u044c\u044e",
    "ui_inventory": "\u0418\u043d\u0432\u0435\u043d\u0442\u0430\u0440\u0438\u0437\u0430\u0446\u0438\u044f UI-\u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442\u043e\u0432",
    "ux_discovery": "UX discovery",
    "ux_spec": "UX-\u0441\u043f\u0435\u0446\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f",
    "wix_iframe_sdk": "Wix iFrame SDK",
    "wix_self_hosted_embedded_script": "\u0421\u0430\u043c\u043e\u0445\u043e\u0441\u0442\u0438\u0440\u0443\u0435\u043c\u044b\u0439 \u0432\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u044b\u0439 \u0441\u043a\u0440\u0438\u043f\u0442 \u0434\u043b\u044f Wix",
}

EN_DISPLAY_NAME_OVERRIDES = {
    "a11y_baseline": "Minimum baseline accessibility for web UI",
    "adr_log": "ADR Log",
    "api_contracts": "API Contracts",
    "architecture_compliance_review": "Architecture Compliance Review",
    "architecture_doc": "Architecture Document",
    "board": "Project Board",
    "current_state_analysis": "Current State Analysis",
    "data_model": "Data Model",
    "deployment_ci_plan": "Deployment & CI Plan",
    "design_intake": "Design Intake",
    "google_stitch_skill": "Google Stitch",
    "handoff": "Handoff Envelope",
    "mongodb_mongoose_best_practices": "MongoDB + Mongoose Best Practices",
    "observability_plan": "Observability Plan",
    "pm_backlog": "PM Backlog",
    "pm_interview": "PM Interview / Discovery",
    "qa_test_plan": "QA Test Plan",
    "release_gate": "Release Gate",
    "release_gate_checklist_template": "Release Gate Checklist Template",
    "state_rtk_beast_practices": "Redux Toolkit Best Practices",
    "state_zustand_beast_practices": "Zustand Best Practices",
    "styling_css_stack": "Styling & CSS Stack",
    "system_design_checklist": "System Design Checklist",
    "testing_strategy_js": "JS/TS Testing Strategy",
    "tests_quality_review": "Tests Quality Review",
    "threat_model_baseline": "Threat Model Baseline",
    "ui_a11y_smoke_review": "UI & Accessibility Smoke Review",
    "ui_inventory": "UI Inventory",
    "ux_discovery": "UX Discovery",
    "ux_spec": "UX Spec",
    "wix_iframe_sdk": "Wix iFrame SDK",
    "wix_self_hosted_embedded_script": "Wix Self-Hosted Embedded Script",
}

PIPELINE_STAGES = [
    "PM(PRD)",
    "UX(UX Spec)",
    "ARCH(Architecture/ADR/Contracts)",
    "DEV(TDD)",
    "REV(Security/Best)",
    "TEST(Test plan/report)",
    "RG(Release Gate)",
]

ROOT = Path(__file__).resolve().parents[1]
LOCALE_ROOTS = [
    ("ru", ROOT),
    ("en", ROOT / "locales" / "en"),
]


def main() -> None:
    for locale, root in LOCALE_ROOTS:
        generate_for_root(root, locale)


def generate_for_root(root: Path, locale: str) -> None:
    skill_names = sorted(list_skill_names(root))
    role_names = sorted(list_role_names(root))

    for skill_dir in iter_skill_dirs(root):
        build_skill_metadata(skill_dir, locale)

    build_orchestrator_metadata(root, locale, role_names, skill_names)


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



def list_skill_names(root: Path) -> list[str]:
    return [skill_dir.name for skill_dir in iter_skill_dirs(root)]


def list_role_names(root: Path) -> list[str]:
    agents_dir = root / "agents"
    if not agents_dir.exists():
        return []
    return [file.stem for file in sorted(agents_dir.glob("*.md")) if file.is_file()]


def parse_frontmatter(text: str) -> dict[str, str]:
    normalized = text.replace("\r\n", "\n")
    match = re.match(r"^\ufeff?---\n(.*?)\n---\n", normalized, re.DOTALL)
    if not match:
        raise ValueError("Missing YAML frontmatter")
    metadata: dict[str, str] = {}
    for raw_line in match.group(1).splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip().strip('"').strip("'")
    return metadata


def titleize_name(name: str) -> str:
    parts = [part for part in re.split(r"[_\-]+", name) if part]
    pretty_parts: list[str] = []
    for part in parts:
        if part.isdigit():
            pretty_parts.append(part)
            continue
        lowered = part.lower()
        if lowered in TITLE_OVERRIDES:
            pretty_parts.append(TITLE_OVERRIDES[lowered])
            continue
        pretty_parts.append(part.capitalize())
    return " ".join(pretty_parts)


def build_skill_metadata(skill_dir: Path, locale: str) -> None:
    skill_path = skill_dir / "SKILL.md"
    skill_text = skill_path.read_text(encoding="utf-8")
    metadata = parse_frontmatter(skill_text)
    name = metadata.get("name", skill_dir.name)
    description = metadata.get("description", build_fallback_description(name, locale))
    display_name = resolve_skill_display_name(name, skill_text, description, locale)
    default_prompt = build_default_prompt(name, display_name, locale)
    triggers = build_skill_triggers(name, display_name, description, locale)
    capabilities = [part.lower() for part in re.split(r"[_\-]+", name) if part]
    available_locales = ["ru", "en"] if counterpart_exists(skill_dir, locale) else [locale]

    portable_metadata = {
        "version": 1,
        "name": name,
        "display_name": display_name,
        "description": description,
        "default_prompt": default_prompt,
        "triggers": triggers,
        "capabilities": capabilities,
        "tools": [],
        "invocation": {
            "explicit": True,
            "implicit": True,
        },
        "localization": {
            "default_locale": locale,
            "available_locales": available_locales,
        },
    }

    agents_dir = skill_dir / "agents"
    agents_dir.mkdir(parents=True, exist_ok=True)
    write_yaml(agents_dir / "skill.yaml", portable_metadata)
    write_yaml(agents_dir / "openai.yaml", build_openai_skill_metadata(display_name, description, default_prompt))

    base_json = build_model_json(name, display_name, description, default_prompt, triggers, capabilities)
    write_json(agents_dir / "claude.json", base_json)
    write_json(agents_dir / "gemini.json", base_json)
    write_json(agents_dir / "copilot.json", base_json)
    write_json(agents_dir / "qwen.json", base_json)
    write_yaml(agents_dir / "kimi.yaml", base_json)


def build_orchestrator_metadata(root: Path, locale: str, role_names: list[str], skill_names: list[str]) -> None:
    agents_text = (root / "AGENTS.md").read_text(encoding="utf-8")
    display_name = extract_heading(root / "AGENTS.md") or (
        "\u041e\u0440\u043a\u0435\u0441\u0442\u0440 \u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438" if locale == "ru" else "Web Development Orchestra"
    )
    description = (
        "\u0411\u0430\u0437\u043e\u0432\u044b\u0439 \u043a\u043e\u043d\u0442\u0440\u0430\u043a\u0442 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0440\u043e\u043b\u0435\u0439, skills \u0438 delivery-gates \u0434\u043b\u044f \u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438."
        if locale == "ru"
        else "Baseline orchestration contract for roles, skills, and delivery gates in web development."
    )
    default_prompt = (
        "\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 AGENTS.md, \u043a\u043e\u0433\u0434\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0440\u043e\u043b\u0435\u0439, skills \u0438 delivery-\u0433\u0435\u0439\u0442\u043e\u0432 \u0440\u0435\u043f\u043e\u0437\u0438\u0442\u043e\u0440\u0438\u044f."
        if locale == "ru"
        else "Use AGENTS.md when the task needs repository-level orchestration across roles, skills, and delivery gates."
    )
    triggers = build_orchestrator_triggers(display_name, description, agents_text, locale)

    portable_metadata = {
        "version": 1,
        "name": "web_development_orchestra",
        "display_name": display_name,
        "description": description,
        "default_prompt": default_prompt,
        "triggers": triggers,
        "roles": role_names,
        "skills": skill_names,
        "pipeline": PIPELINE_STAGES,
        "invocation": {
            "explicit": False,
            "implicit": True,
        },
        "localization": {
            "default_locale": locale,
            "available_locales": ["ru", "en"],
        },
    }

    write_yaml(root / "AGENTS.yaml", portable_metadata)

    vendor_dir = root / "agents"
    vendor_dir.mkdir(parents=True, exist_ok=True)
    write_yaml(
        vendor_dir / "orchestrator.openai.yaml",
        {
            "interface": {
                "display_name": display_name,
                "short_description": description,
                "default_prompt": default_prompt,
            },
            "catalog": {
                "roles": role_names,
                "skills": skill_names,
            },
            "pipeline": PIPELINE_STAGES,
            "policy": {
                "always_on": True,
            },
        },
    )

    base_json = {
        "name": "web_development_orchestra",
        "display_name": display_name,
        "description": description,
        "default_prompt": default_prompt,
        "roles": role_names,
        "skills": skill_names,
        "pipeline": PIPELINE_STAGES,
        "implicit_invocation": True,
    }
    write_json(vendor_dir / "orchestrator.claude.json", base_json)
    write_json(vendor_dir / "orchestrator.gemini.json", base_json)
    write_json(vendor_dir / "orchestrator.copilot.json", base_json)
    write_json(vendor_dir / "orchestrator.qwen.json", base_json)
    write_yaml(vendor_dir / "orchestrator.kimi.yaml", base_json)


def build_fallback_description(name: str, locale: str) -> str:
    if locale == "ru":
        return f"\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 {name}, \u043a\u043e\u0433\u0434\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u043e\u0442\u043d\u043e\u0441\u0438\u0442\u0441\u044f \u043a \u044d\u0442\u043e\u043c\u0443 skill-\u0434\u043e\u043c\u0435\u043d\u0443."
    return f"Use {name} when the task matches this skill domain."


def resolve_skill_display_name(name: str, skill_text: str, description: str, locale: str) -> str:
    if locale == "ru" and name in RU_DISPLAY_NAME_OVERRIDES:
        return RU_DISPLAY_NAME_OVERRIDES[name]
    if locale == "en" and name in EN_DISPLAY_NAME_OVERRIDES:
        return EN_DISPLAY_NAME_OVERRIDES[name]

    heading = clean_heading(extract_heading_from_text(skill_text))
    if heading:
        return heading

    lead_phrase = extract_lead_phrase(description)
    if lead_phrase:
        return lead_phrase

    return titleize_name(name)


def build_skill_triggers(name: str, display_name: str, description: str, locale: str) -> list[str]:
    triggers = [name, name.replace("_", " "), display_name]
    lead_phrase = extract_lead_phrase(description)
    if lead_phrase:
        triggers.append(lead_phrase)
    if locale == "ru":
        triggers.append(display_name.casefold())
    return dedupe(triggers)


def build_orchestrator_triggers(display_name: str, description: str, agents_text: str, locale: str) -> list[str]:
    triggers = ["AGENTS.md", display_name]
    if locale == "ru":
        triggers.extend(["\u043e\u0440\u043a\u0435\u0441\u0442\u0440\u0430\u0442\u043e\u0440", "\u043e\u0440\u043a\u0435\u0441\u0442\u0440 \u0432\u0435\u0431-\u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438"])
    else:
        triggers.extend(["orchestrator", "web development orchestra"])
    lead_phrase = extract_lead_phrase(description)
    if lead_phrase:
        triggers.append(lead_phrase)
    first_role_block = extract_first_role_line(agents_text)
    if first_role_block:
        triggers.append(first_role_block)
    return dedupe(triggers)


def build_default_prompt(name: str, display_name: str, locale: str) -> str:
    if locale == "ru":
        return f'\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 ${name}, \u043a\u043e\u0433\u0434\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u043e\u0442\u043d\u043e\u0441\u0438\u0442\u0441\u044f \u043a \u043d\u0430\u0432\u044b\u043a\u0443 "{display_name}".'
    return f'Use ${name} when the task matches the "{display_name}" skill.'


def build_openai_skill_metadata(display_name: str, description: str, default_prompt: str) -> dict[str, Any]:
    return {
        "interface": {
            "display_name": display_name,
            "short_description": shorten(description, 96),
            "default_prompt": default_prompt,
        },
        "dependencies": {
            "tools": [],
        },
        "policy": {
            "allow_implicit_invocation": True,
        },
    }


def build_model_json(
    name: str,
    display_name: str,
    description: str,
    default_prompt: str,
    triggers: list[str],
    capabilities: list[str],
) -> dict[str, Any]:
    return {
        "name": name,
        "display_name": display_name,
        "description": description,
        "default_prompt": default_prompt,
        "triggers": triggers,
        "capabilities": capabilities,
        "tools": [],
        "implicit_invocation": True,
    }


def extract_heading(path: Path) -> str:
    return extract_heading_from_text(path.read_text(encoding="utf-8"))


def extract_heading_from_text(text: str) -> str:
    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith("# "):
            return stripped[2:].strip()
    return ""


def clean_heading(heading: str) -> str:
    cleaned = re.sub(r"^Skill:\s*", "", heading, flags=re.IGNORECASE).strip()
    return cleaned.strip(" -")


def extract_lead_phrase(text: str) -> str:
    cleaned = re.sub(r"\s+", " ", text).strip().strip(".")
    if not cleaned:
        return ""
    lead = re.split(r"[:.;]", cleaned, maxsplit=1)[0].strip()
    return lead


def extract_first_role_line(text: str) -> str:
    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith("- agents/"):
            return stripped.removeprefix("- agents/").removesuffix(".md")
    return ""


def counterpart_exists(skill_dir: Path, locale: str) -> bool:
    if locale == "ru":
        candidates = [
            ROOT / "locales" / "en" / ".agents" / skill_dir.name / "SKILL.md",
            ROOT / "locales" / "en" / ".agents" / "skills" / skill_dir.name / "SKILL.md",
        ]
    else:
        candidates = [
            ROOT / ".agents" / "skills" / skill_dir.name / "SKILL.md",
            ROOT / ".agents" / skill_dir.name / "SKILL.md",
        ]
    return any(candidate.exists() for candidate in candidates)



def dedupe(values: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for value in values:
        normalized = value.strip()
        if not normalized:
            continue
        key = normalized.casefold()
        if key in seen:
            continue
        seen.add(key)
        result.append(normalized)
    return result


def shorten(value: str, limit: int) -> str:
    if len(value) <= limit:
        return value
    trimmed = value[: limit - 1].rstrip()
    return f"{trimmed}\u2026"


def yaml_scalar(value: Any) -> str:
    if isinstance(value, bool):
        return "true" if value else "false"
    if value is None:
        return "null"
    if isinstance(value, (int, float)):
        return str(value)
    return json.dumps(str(value), ensure_ascii=False)


def emit_yaml(value: Any, indent: int = 0) -> list[str]:
    prefix = "  " * indent
    if isinstance(value, dict):
        lines: list[str] = []
        for key, nested in value.items():
            if isinstance(nested, (dict, list)):
                if isinstance(nested, list) and not nested:
                    lines.append(f"{prefix}{key}: []")
                else:
                    lines.append(f"{prefix}{key}:")
                    lines.extend(emit_yaml(nested, indent + 1))
            else:
                lines.append(f"{prefix}{key}: {yaml_scalar(nested)}")
        return lines
    if isinstance(value, list):
        lines = []
        for item in value:
            if isinstance(item, (dict, list)):
                lines.append(f"{prefix}-")
                lines.extend(emit_yaml(item, indent + 1))
            else:
                lines.append(f"{prefix}- {yaml_scalar(item)}")
        return lines
    return [f"{prefix}{yaml_scalar(value)}"]


def write_yaml(path: Path, data: dict[str, Any]) -> None:
    path.write_text("\n".join(emit_yaml(data)) + "\n", encoding="utf-8")


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
