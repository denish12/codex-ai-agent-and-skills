import chalk from "chalk";

/**
 * Prints informational line.
 * @param message Message text.
 */
export function info(message: string): void {
  process.stdout.write(`${chalk.cyan("info")} ${message}\n`);
}

/**
 * Prints warning line.
 * @param message Message text.
 */
export function warn(message: string): void {
  process.stdout.write(`${chalk.yellow("warn")} ${message}\n`);
}

/**
 * Prints error line.
 * @param message Message text.
 */
export function error(message: string): void {
  process.stderr.write(`${chalk.red("error")} ${message}\n`);
}

/**
 * Prints success line.
 * @param message Message text.
 */
export function success(message: string): void {
  process.stdout.write(`${chalk.green("ok")} ${message}\n`);
}
