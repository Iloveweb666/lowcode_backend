const SUCCESS_CODE = 0;

export const makeResError = (code: number, message: string) => ({
  success: false,
  code,
  message,
});

export const makeResSuccess = (data: unknown) => ({
  success: true,
  code: SUCCESS_CODE,
  data,
});

export function formatDateTime(input?: Date | string | null): string | undefined {
  if (!input) return undefined;
  const d = typeof input === 'string' ? new Date(input) : input;
  if (!(d instanceof Date) || isNaN(d.getTime())) return undefined;
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  return `${y}-${m}-${day} ${hh}:${mm}:${ss}`;
}
