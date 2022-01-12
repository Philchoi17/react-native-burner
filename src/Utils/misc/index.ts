export function removeItemFromArray<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

export function dateFormat(dateObj: any) {
  return dateObj.toISOString().substring(0, 10)
}

export function handleLongString(str: string, len: number) {
  return str.length > len ? str.substring(0, len - 3) + '...' : str
}
