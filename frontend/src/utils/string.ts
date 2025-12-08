export const toTitleCase = (value: unknown): string => {
  if (value === null || value === undefined) return '';

  const str = String(value);

  return str
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};
