export function toPx(value: number | string) {
  if (value || value === 0) {
    return value + (typeof value === 'number' && value !== 0 ? 'px' : '')
  }
  return undefined
}
