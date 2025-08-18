import ClientModel from "../models/clientModel.js"
import { nanoid } from "nanoid"
import UserModel from "../models/userModel.js"

export const createClient = async (req, res) => {
  try {
    const { entityId, userId, clientName } = req.body

    const newClient = await ClientModel.create({
      clientId: nanoid(20),
      apiToken: nanoid(20),
      clientSecret: nanoid(20),
      entityId,
      userId,
      clientName,
    })

    return res.status(201).json({ message: "Successfully created." })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}

export const getAllClientByUserId = async (req, res) => {
  try {
    const { userId } = req.params

    const clientData = await ClientModel.findAll({
      where: { userId },
      include: {
        model: UserModel,
        required: true,
        attributes: ["entityId", "entityName"],
      },
    })

    if (!clientData) {
      return res.status(404).json({ message: "Client not found" })
    }

    return res.json(clientData)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}

export const getEntity = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await UserModel.findOne({
      where: { id: userId },
      attributes: ["entityName", "entityId"],
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({
      entityName: user.entityName,
      entityId: user.entityId,
    })
  } catch (error) {
    console.error("Error fetching entity data:", error)
    res.status(500).json({ error: "Failed to fetch entity data" })
  }
}

export const updateClient = async (req, res) => {
  try {
    const { clientId, apiToken, clientSecret, entityId, userId } = req.body
    const updatedClient = await ClientModel.update(
      { clientId, apiToken, clientSecret, entityId, userId },
      { where: { id: req.params.id } },
    )

    if (updatedClient[0] === 0) {
      return res.status(404).json({ message: "Client not found or no changes made" })
    }

    return res.status(200).json({ message: "Client updated successfully" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteClient = async (req, res) => {
  try {
    console.log("ok", req.params.id)

    const client = await ClientModel.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (client === 0) {
      return res.status(404).json({ message: "Client not found" })
    }

    return res.status(200).json({ message: "Client deleted successfully" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
