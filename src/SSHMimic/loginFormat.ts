export function formatLoginDate(date: Date): string {
  const weekday = date.toLocaleString('en-US', { weekday: 'short' });
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  const ss = date.getSeconds().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${weekday} ${month} ${day} ${hh}:${mm}:${ss} ${year}`;
}