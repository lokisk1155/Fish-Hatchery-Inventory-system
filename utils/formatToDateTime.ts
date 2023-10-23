export function formatToDateTime(dateString: string) {
  if (!dateString) {
    return ''
  }
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // pad with 0 if single digit
  const day = date.getDate().toString().padStart(2, '0') // pad with 0 if single digit
  const hours = date.getHours().toString().padStart(2, '0') // pad with 0 if single digit
  const minutes = date.getMinutes().toString().padStart(2, '0') // pad with 0 if single digit
  return `${year}-${month}-${day}T${hours}:${minutes}`
}
