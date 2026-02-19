# code-ai installer

CLI for installing your `agents/` and `.agents/skills/` assets into AI-specific layouts.
The global package contains bundled templates, so `code-ai` works from any directory.

## Supported targets
- `vscode-copilot`
- `gpt-codex`
- `claude`
- `qwen-3.5`
- `google-antugravity`

## Install
```bash
npm install
npm run build
```

## Global install
```bash
# from npm registry
npm install -g code-ai-installer
# or
pnpm add -g code-ai-installer
# or
yarn global add code-ai-installer
# or
bun add -g code-ai-installer

# verify binary in system terminal
code-ai --help
```

```bash
# install globally from local repository
npm install -g .
code-ai --help
```

## Usage
```bash
# interactive wizard (recommended)
code-ai

# list targets
code-ai targets

# list available agents and skills from current repository
code-ai list

# health checks
code-ai doctor --target claude

# dry-run install (default)
code-ai install --target claude --agents conductor,reviewer --skills board,security_review

# install into a newly created folder under current directory
code-ai install --target gpt-codex --create-dir my-new-project --agents all --skills all --apply

# apply install with overwrite
code-ai install --target claude --agents all --skills all --overwrite --apply

# strict mode: require explicit target hints in agent/skill files
code-ai install --target claude --agents all --skills all --strict-hints --apply

# uninstall preview
code-ai uninstall --target claude

# uninstall apply
code-ai uninstall --target claude --apply
```

## What gets generated
- Root orchestration mirror: `AGENTS.md`
- Target instruction file:
  - Copilot: `.github/copilot-instructions.md`
  - GPT Codex: `CODEX.md`
  - Claude: `CLAUDE.md`
  - Qwen: `QWEN.md`
  - Google Antugravity: `GEMINI.md`
- Agent files copied to target-specific agents directory.
- Skill files copied to target-specific skills directory.
- For `gpt-codex`, assets are installed to `agents/` and `.agents/` for native Codex discovery.
- For `google-antugravity`, assets are installed in antugravity-friendly structure:
  - agents: `.gemini/agents/<agent>/prompt.md` and `.gemini/agents/<agent>/config.json`
  - skills: `.gemini/skills/<skill>.md` and `.gemini/skills/<skill>.py`
- For `qwen-3.5`, installer also generates `.qwen/settings.json` with model/context defaults.
- Markdown content is normalized per target (model-specific hint comments like `codex:` are transformed).
  - `codex reasoning` is mapped to target-native hints (`copilot reasoning`, `claude thinking`, `qwen reasoning_effort`, `gemini reasoning`).

## Safety model
- Default mode is `dry-run`.
- Backup is created before writes under `.code-ai-installer/backups/<target>/<timestamp>/`.
- State is tracked in `.code-ai-installer/state/<target>.json` for uninstall.
- Rollback restores previous files on install failure.
- Optional strict adaptation mode: `--strict-hints` enforces target-hint emission and auto-fills missing hints with target defaults.

## Notes
- Target aliases are accepted: `copilot`, `codex`, `claude`, `qwen`, `google`, `antigravity`.
- If your AI tool requires a custom location, pass `--destination <path>`.
- Source templates are resolved automatically: current directory first, bundled package templates second.
