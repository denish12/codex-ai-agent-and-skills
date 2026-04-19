import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── 1. Fix one-liner in all 40 agent .md files ─────────────────────────────

const AGENT_DIRS = [
  path.join(ROOT, 'agents'),
  path.join(ROOT, 'domains', 'analytics', 'agents'),
  path.join(ROOT, 'domains', 'content', 'agents'),
  path.join(ROOT, 'domains', 'development', 'agents'),
  path.join(ROOT, 'domains', 'product', 'agents'),
];

const OLD_LINE = '- **$karpathy-guidelines** — обязательное правило качества (думай, упрощай, хирургически, цель)';
const NEW_LINE = '- **$karpathy-guidelines** — сначала думай, делай только нужное, правь точечно, работай от результата';

let agentFixed = 0;
for (const dir of AGENT_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const fp = path.join(dir, file);
    const content = fs.readFileSync(fp, 'utf8');
    if (!content.includes(OLD_LINE)) continue;
    fs.writeFileSync(fp, content.replace(OLD_LINE, NEW_LINE), 'utf8');
    console.log(`agent fixed: ${path.relative(ROOT, fp)}`);
    agentFixed++;
  }
}

// ── 2. Fix AGENTS.md rule block ────────────────────────────────────────────

const agentsMd = path.join(ROOT, 'AGENTS.md');
let agentsContent = fs.readFileSync(agentsMd, 'utf8');

agentsContent = agentsContent
  .replace(
    '**$karpathy-guidelines применяется всеми агентами во всех доменах.** Перед выполнением любой нетривиальной задачи:\n1. **Думай перед тем как делать** — явно формулируй допущения, спрашивай при неопределённости.\n2. **Простота прежде всего** — минимум, решающий задачу. Ничего спекулятивного.\n3. **Хирургические изменения** — трогай только то, что необходимо.\n4. **Ориентация на цель** — определи проверяемые критерии успеха до начала работы.',
    '**$karpathy-guidelines обязателен для всех агентов во всех доменах.** Перед любой нетривиальной задачей:\n1. **Сначала думай, потом делай** — явно называй предположения, спрашивай при неопределённости.\n2. **Делай только то, что просили** — минимум, решающий задачу. Ничего лишнего.\n3. **Правь точечно** — трогай только то, что необходимо для задачи.\n4. **Работай от результата** — определи проверяемые критерии успеха до начала работы.'
  );

fs.writeFileSync(agentsMd, agentsContent, 'utf8');
console.log('AGENTS.md fixed');

// ── 3. Fix config files (RU) ───────────────────────────────────────────────

const CONFIG_DIR = path.join(ROOT, '.agents', 'skills', 'karpathy-guidelines', 'agents');

const OLD_DESC = 'Поведенческие правила для снижения типичных ошибок LLM — думай перед тем как делать, простота прежде всего, хирургические изменения, ориентация на цель.';
const NEW_DESC = 'Правила работы для предотвращения типичных ошибок LLM — сначала думай, делай только нужное, правь точечно, работай от результата.';

const OLD_TRIGGER_THINK = '"думай перед тем как делать"';
const NEW_TRIGGER_THINK = '"сначала думай потом делай"';

const OLD_TRIGGER_THINK_YAML = '  - "думай перед тем как делать"';
const NEW_TRIGGER_THINK_YAML = '  - "сначала думай потом делай"';

const OLD_SHORT_DESC = 'Поведенческие правила для снижения типичных ошибок LLM — думай перед тем как делать, простота прежде всего, хирургически…';
const NEW_SHORT_DESC = 'Правила работы для предотвращения типичных ошибок LLM — сначала думай, делай только нужное, правь точечно, работай от результата.';

for (const file of fs.readdirSync(CONFIG_DIR)) {
  const fp = path.join(CONFIG_DIR, file);
  let content = fs.readFileSync(fp, 'utf8');
  let changed = false;

  if (content.includes(OLD_DESC)) {
    content = content.replace(OLD_DESC, NEW_DESC);
    changed = true;
  }
  if (content.includes(OLD_TRIGGER_THINK)) {
    content = content.replace(OLD_TRIGGER_THINK, NEW_TRIGGER_THINK);
    changed = true;
  }
  if (content.includes(OLD_TRIGGER_THINK_YAML)) {
    content = content.replace(OLD_TRIGGER_THINK_YAML, NEW_TRIGGER_THINK_YAML);
    changed = true;
  }
  if (content.includes(OLD_SHORT_DESC)) {
    content = content.replace(OLD_SHORT_DESC, NEW_SHORT_DESC);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log(`config fixed: ${path.relative(ROOT, fp)}`);
  }
}

console.log(`\nDone. Agents fixed: ${agentFixed}`);
