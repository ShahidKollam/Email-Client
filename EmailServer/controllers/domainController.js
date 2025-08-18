import DomainModel from "../models/domain.js"
import UserModel from "../models/userModel.js"

export const getDomains = async (req, res) => {
  try {
    const { userId } = req.params

    const domains = await DomainModel.findAll({
      where: { userId },
      include: [
        {
          model: UserModel,
          attributes: ["name", "email"],
        },
      ],
    })

    if (domains.length === 0) {
      return res.status(404).json({ message: "No domains found for this user." })
    }

    return res.status(200).json(domains)
  } catch (error) {
    console.error("Error fetching domains:", error)
    return res.status(500).json({ message: "Error fetching domains." })
  }
}

export const createDomain = async (req, res) => {
  try {
    const { userId } = req.params
    const { name } = req.body

    const user = await UserModel.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }

    const newDomain = await DomainModel.create({ userId, name })
    return res.status(201).json(newDomain)
  } catch (error) {
    console.error("Error creating domain:", error)
    return res.status(500).json({ message: "Error creating domain." })
  }
}

export const updateDomain = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const domain = await DomainModel.findByPk(id)
    if (!domain) {
      return res.status(404).json({ message: "Domain not found." })
    }

    domain.name = name
    await domain.save()

    return res.status(200).json(domain)
  } catch (error) {
    console.error("Error updating domain:", error)
    return res.status(500).json({ message: "Error updating domain." })
  }
}

export const deleteDomain = async (req, res) => {
  try {
    const { id } = req.params

    const domain = await DomainModel.findByPk(id)
    if (!domain) {
      return res.status(404).json({ message: "Domain not found." })
    }

    await domain.destroy()
    return res.status(200).json({ message: "Domain deleted successfully." })
  } catch (error) {
    console.error("Error deleting domain:", error)
    return res.status(500).json({ message: "Error deleting domain." })
  }
}
