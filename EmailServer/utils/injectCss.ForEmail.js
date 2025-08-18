export const injectCSSInHtml = (htmlContent, cssContent) => {
  if (!cssContent) return htmlContent

  const styleTag = `<style>${cssContent}</style>`
  if (htmlContent.includes("<head>")) {
    return htmlContent.replace(/<\/head>/, `${styleTag}</head>`)
  } else {
    return htmlContent.replace("<body>", `<head>${styleTag}</head><body>`)
  }
}
