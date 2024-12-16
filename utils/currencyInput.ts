export function cleanCurrencyInput(input: string): string {
  // Remove currency symbols, commas, and spaces
  const cleanString = input.replace(/[$,\s]/g, '');

  // Only allow digits and one decimal point
  const validNumber = cleanString.replace(/[^\d.]/g, '');

  // Ensure only one decimal point
  const parts = validNumber.split('.');
  if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');

  return validNumber;
}

export function validateCurrencyInput(input: string): boolean {
  if (!/^[$,.\d]+$/.test(input)) {
    return false
  }

  // Clean and parse the number
  const cleanNumber = input.replace(/[$,]/g, '')
  const parsedNumber = parseFloat(cleanNumber)

  // Validate the number
  if (isNaN(parsedNumber)) {
    return false
  }

  if (parsedNumber <= 0) {
    return false
  }

  return true
}
