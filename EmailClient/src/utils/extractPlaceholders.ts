export const extractPlaceholders = (htmlContent: string) => {
  const regex = /{{(.*?)}}/g
  const placeholders = []
  let match
  while ((match = regex.exec(htmlContent)) !== null) {
    placeholders.push(match[1].trim())
  }
  return placeholders
}
