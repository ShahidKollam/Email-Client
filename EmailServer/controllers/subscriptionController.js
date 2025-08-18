import SubscriptionModel from "../models/subscriptionModel.js"
import UserModel from "../models/userModel.js"

export const createSubscriptionForUser = async (user, subscriptionType) => {
  const startDate = new Date()
  const expiryDate = new Date(startDate)

  if (subscriptionType === "freetier") {
    expiryDate.setMonth(expiryDate.getMonth() + 1) // Add 1 month
  }

  const subscription = await SubscriptionModel.create({
    userId: user.id,
    subscriptionType,
    startDate,
    expiryDate,
    isApproved: false,
  })

  return subscription
}

export const createSubscription = async (req, res, next) => {
  try {
    const { userId, subscriptionType } = req.body

    // Check if user exists
    const user = await UserModel.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Create subscription
    const subscription = await createSubscriptionForUser(userId, subscriptionType)

    res.status(201).json({
      message: "Subscription created successfully",
      subscription,
    })
  } catch (error) {
    console.error("Error creating subscription:", error)
    return next(error)
  }
}

export const getSubscriberById = async (req, res, next) => {
  try {
    const { userId } = req.params

    const subscription = await SubscriptionModel.findOne({
      where: { userId },
      include: {
        model: UserModel,
        attributes: ["id", "name", "email"],
      },
    })

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found for this user" })
    }

    return res.status(200).json({
      message: "Subscription found",
      subscription,
    })
  } catch (error) {
    console.error("Error fetching subscription by userId:", error)
    return next(error)
  }
}

export const updateSubscription = async (req, res, next) => {
  const { subscriptionType, startDate, expiryDate, isActive } = req.body
  const { userId } = req.params

  try {
    const subscription = await SubscriptionModel.findOne({ where: { userId } })
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" })
    }
    await subscription.update({
      subscriptionType,
      startDate,
      expiryDate,
      isActive,
    })
    res.json(subscription)
  } catch (err) {
    console.error(err)
    return next(err)
  }
}
