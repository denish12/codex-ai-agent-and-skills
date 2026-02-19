import chalk from "chalk";

const CODE_AI_ASCII = [
  "  ██████╗ ██████╗ ██████╗ ███████╗      █████╗ ██╗",
  " ██╔════╝██╔═══██╗██╔══██╗██╔════╝     ██╔══██╗██║",
  " ██║     ██║   ██║██║  ██║█████╗       ███████║██║",
  " ██║     ██║   ██║██║  ██║██╔══╝       ██╔══██║██║",
  " ╚██████╗╚██████╔╝██████╔╝███████╗     ██║  ██║██║",
  "  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚═╝  ╚═╝╚═╝",
];

/**
 * Prints CODE-AI startup banner with green gradient.
 */
export function printBanner(): void {
  const width = Math.max(...CODE_AI_ASCII.map((line) => line.length));
  const start = { r: 64, g: 224, b: 128 };
  const end = { r: 16, g: 120, b: 72 };

  for (let row = 0; row < CODE_AI_ASCII.length; row += 1) {
    const line = CODE_AI_ASCII[row];
    let out = "";
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === " ") {
        out += ch;
        continue;
      }
      const t = width <= 1 ? 0 : i / (width - 1);
      const r = Math.round(start.r + (end.r - start.r) * t);
      const g = Math.round(start.g + (end.g - start.g) * t);
      const b = Math.round(start.b + (end.b - start.b) * t);
      out += chalk.rgb(r, g, b)(ch);
    }
    process.stdout.write(`${out}\n`);
  }
  process.stdout.write(`${chalk.green("Code-AI installer wizard")}\n\n`);
}

