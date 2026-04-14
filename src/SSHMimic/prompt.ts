export function buildPrompt(user: string, host: string, cwdName: string): string {
  const isRoot = user === 'root';
  const colorUser = isRoot ? '\u001b[31;1m' : '\u001b[35;1m';
  const colorWhite = '\u001b[37;1m';
  const colorBlue = '\u001b[34;1m';
  const colorReset = '\u001b[0m';
  const symbol = isRoot ? '#' : '$';

  return `${colorWhite}[${colorUser}${user}${colorWhite}@${colorBlue}${host}${colorReset} ${cwdName}${colorWhite}]${colorReset}${symbol} `;
}
