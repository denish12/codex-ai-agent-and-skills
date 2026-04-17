<div align="center">
  <h1>🤖 Code-AI Installer</h1>
  <p><b>The ultimate CLI tool to orchestrate AI Agents, Skills, and Workflows across multiple AI Coding Assistants.</b></p>
  
  [![npm version](https://img.shields.io/npm/v/code-ai-installer.svg)](https://www.npmjs.com/package/code-ai-installer)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green.svg)](https://nodejs.org)
</div>

<br/>

**Code-AI Installer** (`code-ai`) is a powerful, production-ready CLI that injects your `.agents/`, `.agents/skills/`, and `.agents/workflows/` directly into the specific environment layouts required by different AI tools. Write your agentic pipelines once, and deploy them universally to Copilot, Codex, Claude, Qwen, or Google Antigravity.

---

## ✨ Features

- 🚀 **Interactive Wizard**: Out-of-the-box interactive CLI to easily pick targets, agents, and skills.
- 🌍 **Multi-AI Support**: Automatically adapts instructions, reasoning hints, and files for Copilot, GPT Codex, Claude, Qwen 3.5, and Google Antigravity.
- 📦 **Standalone & Global**: Bundled with base templates—run it from anywhere on your machine!
- 🛡️ **Bulletproof Safety**: Default `dry-run` mode, automatic backups to `.code-ai-installer/backups/`, and built-in rollbacks.
- 🧠 **Smart Transformation**: Normalizes markdown content. Automatically translates target-native AI hints (e.g., mapping `codex reasoning` to `claude thinking` or `gemini reasoning`).
- 🌐 **Localization**: First-class support for English (`en`) and Russian (`ru`).

---

## 🏛️ Domain Architecture

Code-AI Installer comes pre-bundled with dedicated professional systems separated by **Domains** to cleanly isolate workflows based on your project needs. You can choose which domain to deploy during installation:

- 💻 **Software Development Domain** (`development`): An 8-gate robust agentic pipeline tailored for end-to-end web app development. Includes roles like Product Manager, UX/UI Designer, Architect, Senior Full Stack Developer, Reviewer, DevOps, and QA Tester.
- 📝 **Content Production Domain** (`content`): A creative pipeline dedicated to producing digital content (social media, blogs, visuals). Orchestrates roles such as Content Strategist, Copywriter, Researcher, and Visual Concept Designer.
- 📊 **Business Analytics Domain** (`analytics`): An adversarial analytical pipeline with two competing teams (Analysts vs Critics) and a Mediator — plus Designer and Layouter for PDF reports. Strategic frameworks (SWOT, PEST, Porter's Five Forces, BCG, Blue Ocean, Ansoff, Unit Economics, Cohort, etc.).
- 📦 **Product Management Domain** (`product`): A B2B SaaS product management pipeline — discovery → strategy → prioritization → PRD → UX → release → measurement. Dual adversarial axes: Customer-Champion vs Business-Champion on strategy, Build-Camp vs Cut-Camp on prioritization. Includes Discovery, Product Strategist, PM, UX Designer, Tech Lead, Data Analyst, Mediator, Designer, Layouter.

*(You can select your target domain during the interactive installation process!)*

---

## 🎯 Supported AI Targets

- `vscode-copilot` / `copilot`
- `gpt-codex` / `codex`
- `claude`
- `qwen-3.5` / `qwen`
- `google-antigravity` / `antigravity`

---

## 🔧 Installation

### 1. Global Installation (Recommended)

Install the CLI globally to run it in any of your projects:

```bash
# via npm
npm install -g code-ai-installer

# via pnpm, yarn, or bun
pnpm add -g code-ai-installer
yarn global add code-ai-installer
bun add -g code-ai-installer
```

Verify the installation:
```bash
code-ai --help
```

### 2. Local Installation (For Development)

If you are cloning this repository to build or contribute:
```bash
git clone https://github.com/denish12/codex-ai-agent-and-skills.git
cd codex-ai-agent-and-skills
npm install
npm run build
npm install -g .
```

---

## 🚀 Usage

### The Interactive Wizard
Just run `code-ai` inside your project directory to trigger the fully interactive guide:
```bash
code-ai
```

### CLI Commands & Flags

```bash
# List all supported targets
code-ai targets

# List available agents and skills (from local repo or global fallback)
code-ai list
code-ai list --lang en

# Check system health and compatibility for a specific target
code-ai doctor --target claude

# Run a safe Dry-Run installation preview (Default)
code-ai install --target claude --agents conductor,reviewer --skills board

# Apply Installation (actually write files)
code-ai install --target gpt-codex --agents all --skills all --apply

# Overwrite existing files securely
code-ai install --target claude --agents all --skills all --overwrite --apply

# Strict Mode (Enforces explicit target hints in agent files)
code-ai install --target claude --agents all --skills all --strict-hints --apply

# Uninstall / Clean up AI assets securely
code-ai uninstall --target claude --apply
```

---

## 🏗️ What Gets Generated?

Depending on the chosen `--target`, `code-ai` restructures your environment intelligently:

1. **Root Orchestration Rules**: Generates `AGENTS.md` (and alias files like `CLAUDE.md`, `CODEX.md`, `GEMINI.md`, etc.).
2. **Agents**: Copies roles to target-specific directories (e.g., `.gemini/agents/<agent>/prompt.md`, `.github/copilot-instructions.md`).
3. **Skills & Workflows**: Deploys the necessary execution skillsets and custom workflows specific to the target AI.
4. **Configuration**: Generates workspace settings (e.g., `.qwen/settings.json`).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [issues page](https://github.com/denish12/codex-ai-agent-and-skills/issues).

## 📄 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
