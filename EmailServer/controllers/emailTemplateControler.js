import EmailTemplate from "../models/emailTemplateModel.js"
import UserModel from "../models/userModel.js"
import { generateTemplateId } from "../utils/generateTemplateId.js"

export const createTemplate = async (req, res, next) => {
  try {
    const { userId, template_name, template_description, subject, category, html_content, css_content } = req.body

    if (!template_name || !html_content || !css_content) {
      return next(new Error("Template name, HTML, and CSS content are required."))
    }

    const user = await UserModel.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found." })
    }

    const templateId = await generateTemplateId()

    const newTemplate = await EmailTemplate.create({
      userId,
      template_name,
      subject,
      html_content,
      css_content,
      template_description,
      category,
      template_id: templateId,
    })

    const apiUrl = `http://localhost:3001/api/client/send-email-to-client/${newTemplate.id}`
    newTemplate.api_url = apiUrl
    await newTemplate.save()

    res.status(201).json({ success: true, message: "Email template created successfully", data: newTemplate })
  } catch (error) {
    return next(error)
  }
}

export const cloneTemplate = async (req, res, next) => {
  try {
    const { templateId, userId } = req.body
    console.log(req.body)

    if (!templateId || !userId) return res.status(400).json({ error: "Template ID and User ID are required." })

    const user = await UserModel.findByPk(userId)
    if (!user) return res.status(404).json({ error: "User not found." })

    const originalTemplate = await EmailTemplate.findByPk(templateId)
    if (!originalTemplate) return res.status(404).json({ error: "Template not found." })

    if (originalTemplate.userId === userId) {
      return res.status(403).json({ error: "You are not authorized to clone this template." })
    }

    const template_Id = await generateTemplateId()

    const clonedTemplate = await EmailTemplate.create({
      userId,
      template_name: originalTemplate.template_name,
      subject: originalTemplate.subject,
      html_content: originalTemplate.html_content,
      css_content: originalTemplate.css_content,
      template_description: originalTemplate.template_description,
      category: originalTemplate.category,
      template_id: template_Id,
    })

    clonedTemplate.api_url = `http://localhost:3001/api/client/send-email-to-client/${clonedTemplate.id}`
    await clonedTemplate.save()

    return res.status(201).json({ success: true, message: "Template cloned successfully.", data: clonedTemplate })
  } catch (error) {
    console.error("Error cloning template:", error)
    return next(error)
  }
}

export const updateTemplate = async (req, res, next) => {
  console.log("Incoming request body:", req.body)

  const { id } = req.params
  const { template_name, template_description, subject, category, html_content, css_content, isDefault, isApproved } =
    req.body

  try {
    const template = await EmailTemplate.findByPk(id)

    if (!template) {
      return res.status(404).json({ success: false, message: "Template not found." })
    }

    template.template_name = template_name || template.template_name
    template.html_content = html_content || template.html_content
    template.css_content = css_content || template.css_content
    template.category = category || template.category
    template.subject = subject || template.subject
    template.isDefault = isDefault ?? template.isDefault
    template.isApproved = isApproved ?? template.isApproved
    template.template_id = template.template_id
    template.template_description = template_description || template.template_description

    await template.save()

    res.status(200).json({ success: true, message: "Template updated successfully.", data: template })
  } catch (error) {
    console.log(error)
    return next(error)
  }
}

// export const updateTemplate = async (req, res, next) => {
//     const { id } = req.params;
//     const updates = req.body;

//     try {
//         const template = await EmailTemplate.findByPk(id);

//         if (!template) {
//             return res.status(404).json({ success: false, message: "Template not found." });
//         }

//         for (const [key, value] of Object.entries(updates)) {
//             if (value !== undefined) {
//                 template[key] = value;
//             }
//         }

//         await template.save();

//         res.status(200).json({ success: true, message: "Template updated successfully.", data: template });
//     } catch (error) {
//         return next(error);
//     }
// };

// for external API use

export const get_TemplateById = async (req, res, next) => {
  try {
    const { templateId } = req.params

    const template = await EmailTemplate.findOne({
      where: {
        template_id: templateId,
      },
    })

    if (!template) {
      return next(new Error(`Email template with templateId ${templateId} not found.`))
    }

    // Function to extract placeholders from HTML
    const extractPlaceholders = (html) => {
      const placeholders = []
      const regex = /{{(.*?)}}/g
      let match

      // Find all matches for placeholders
      while ((match = regex.exec(html)) !== null) {
        placeholders.push(match[1].trim()) // Extract and trim placeholder name
      }

      return placeholders
    }

    // Extract placeholders from the template's HTML content
    const placeholders = extractPlaceholders(template.html_content)

    // Prepare the processed template data
    const processedTemplate = {
      id: template.id,
      template_id: template.template_id,
      template_name: template.template_name,
      category: template.category, // Include category
      placeholders: placeholders,
    }

    res.status(200).json({
      success: true,
      template: processedTemplate,
    })
  } catch (error) {
    return next(error)
  }
}

export const getAllTemplatesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params
    const templates = await EmailTemplate.findAll({ where: { userId: userId } })

    if (!templates || templates.length === 0) {
      return next(new Error(`No email templates found for user with ID ${userId}.`))
    }

    const extractPlaceholders = (html) => {
      const placeholders = []
      const regex = /{{(.*?)}}/g
      let match
      while ((match = regex.exec(html)) !== null) {
        placeholders.push(match[1].trim())
      }
      return placeholders
    }

    const processedTemplates = templates.map((template) => {
      const placeholders = extractPlaceholders(template.html_content)
      return {
        id: template.id,
        template_id: template.template_id,
        template_name: template.template_name,
        category: template.category,
        placeholders: placeholders,
      }
    })

    res.status(200).json({
      success: true,
      templates: processedTemplates,
    })
  } catch (error) {
    return next(error)
  }
}

export const getAllTemplates = async (req, res, next) => {
  try {
    const templates = await EmailTemplate.findAll()

    if (!templates || templates.length === 0) {
      return next(new Error("No email templates found."))
    }

    // Function to extract placeholders from HTML
    const extractPlaceholders = (html) => {
      const placeholders = []
      const regex = /{{(.*?)}}/g
      let match

      // Find all matches for placeholders
      while ((match = regex.exec(html)) !== null) {
        placeholders.push(match[1].trim()) // Extract and trim placeholder name
      }

      return placeholders
    }

    // Process each template to include extracted placeholders
    const processedTemplates = templates.map((template) => {
      const placeholders = extractPlaceholders(template.html_content)
      return {
        id: template.id,
        template_id: template.template_id,
        template_name: template.template_name,
        category: template.category, // Include category
        placeholders: placeholders,
      }
    })

    res.status(200).json({
      success: true,
      templates: processedTemplates,
    })
  } catch (error) {
    return next(error)
  }
}

export const getCustomTemplate = async (req, res, next) => {
  const { id } = req.params

  try {
    const templates = await EmailTemplate.findAll({
      where: {
        userId: id,
      },
      attributes: [
        "id",
        "template_id",
        "api_url",
        "isDefault",
        "template_name",
        "template_description",
        "category",
        "html_content",
        "css_content",
        "subject",
      ],
    })

    if (!templates.length) {
      return res.status(200).json({ error: "No templates found for this user." })
    }

    res.status(200).json(templates)
  } catch (error) {
    console.error("Error getting template:", error)
    return next(error)
  }
}

export const getTemplateListWithUsers = async (req, res, next) => {
  try {
    const templates = await EmailTemplate.findAll({
      include: [
        {
          model: UserModel,
          attributes: ["name"],
        },
      ],
      attributes: [
        "id",
        "template_id",
        "template_name",
        "template_description",
        "category",
        "html_content",
        "css_content",
        "api_url",
        "isDefault",
        "isApproved",
      ],
    })

    if (!templates.length) {
      return res.status(404).json({ error: "No templates found." })
    }

    res.status(200).json(templates)
  } catch (error) {
    console.error("Error fetching templates:", error)
    return next(error)
  }
}

export const getTemplateById = async (req, res, next) => {
  const { id } = req.params
  try {
    const template = await EmailTemplate.findByPk(id)

    if (!template) return next(new Error("Template not found."))

    res.status(200).json({ success: true, data: template })
  } catch (error) {
    return next(error)
  }
}

export const getGeneralTemplate = async (req, res, next) => {
  try {
    const template = await EmailTemplate.findAll({
      where: { isDefault: true },
    })

    if (!template) return next(new Error("Template not found."))

    res.status(200).json(template)
  } catch (error) {
    return next(error)
  }
}

export const deleteTemplate = async (req, res, next) => {
  try {
    const { id } = req.params
    const template = await EmailTemplate.findByPk(id)

    if (!template) {
      return res.status(404).json({ error: "Template not found" })
    }

    const resp = await template.destroy()

    return res.status(200).json({ message: "Template deleted successfully" })
  } catch (error) {
    console.log("error deleting template", error)
  }
}
