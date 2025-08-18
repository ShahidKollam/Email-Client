// src/utils/editorUtils.ts
export const saveContent = (editor: any) => {
  if (editor) {
    const html = editor.getHtml()
    const css = editor.getCss()
    const content = { html, css }
    localStorage.setItem("MyPage", JSON.stringify(content))
  }
}

export const clearContent = (editor: any) => {
  if (editor) {
    editor.setComponents("")
    editor.setStyle("")
    localStorage.removeItem("MyPage")
  }
}

export const getPreviewContent = (editor: any) => {
  if (editor) {
    const html = editor.getHtml()
    const css = editor.getCss() || ""
    return { html, css }
  }
  return null
}
