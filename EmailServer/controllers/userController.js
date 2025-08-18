import UserModel from "../models/userModel.js"

export const userList = async (req, res, next) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
    })

    res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await UserModel.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return next(error)
  }
}
