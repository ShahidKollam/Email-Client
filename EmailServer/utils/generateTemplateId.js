// utils/templateUtils.js

import EmailTemplate from "../models/emailTemplateModel.js"

export const generateTemplateId = async () => {
  // Fetch the highest existing template_id
  const lastTemplate = await EmailTemplate.findOne({
    order: [["id", "DESC"]],
    attributes: ["id", "template_id"],
  })

  let nextId = 1 // Default if no existing templates
  if (lastTemplate && lastTemplate.template_id) {
    const match = lastTemplate.template_id.match(/\d+$/) // Extract numeric part
    if (match) {
      nextId = Number.parseInt(match[0]) + 1
    }
  }

  return `TEMP-${nextId.toString().padStart(4, "0")}` // Ensure 4 digits in template_id
}
