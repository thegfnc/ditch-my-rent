export function getInitialsFromFullName(fullName: string): string {
  if (!fullName) return '';

  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();
}
