# code-ai installer

CLI for installing your `agents/` and `.agents/skills/` assets into AI-specific layouts.

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

## Usage
```bash
# interactive wizard (recommended)
npx tsx src/index.ts

# list targets
npx tsx src/index.ts targets

# list available agents and skills from current repository
npx tsx src/index.ts list

# health checks
npx tsx src/index.ts doctor --target claude

# dry-run install (default)
npx tsx src/index.ts install --target claude --agents conductor,reviewer --skills board,security_review

# apply install with overwrite
npx tsx src/index.ts install --target claude --agents all --skills all --overwrite --apply

# strict mode: require explicit target hints in agent/skill files
npx tsx src/index.ts install --target claude --agents all --skills all --strict-hints --apply

# uninstall preview
npx tsx src/index.ts uninstall --target claude

# uninstall apply
npx tsx src/index.ts uninstall --target claude --apply
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
- Markdown content is normalized per target (model-specific hint comments like `codex:` are transformed).
  - `codex reasoning` is mapped to target-native hints (`claude thinking`, `qwen reasoning_effort`, `gemini reasoning`).

## Safety model
- Default mode is `dry-run`.
- Backup is created before writes under `.code-ai-installer/backups/<target>/<timestamp>/`.
- State is tracked in `.code-ai-installer/state/<target>.json` for uninstall.
- Rollback restores previous files on install failure.
- Optional strict policy: `--strict-hints` fails install if selected agent/skill files don't contain explicit target-native hint markers.

## Notes
- Target aliases are accepted: `copilot`, `codex`, `claude`, `qwen`, `google`, `antigravity`.
- If your AI tool requires a custom location, pass `--destination <path>`.
