import ClientModel from "../models/clientModel.js"

export const validateClientEmailReq = async (req, res, next) => {
  const { "client-id": clientId, "api-token": apiToken, "secret-key": clientSecret } = req.headers
  const { origin } = req.headers
  console.log("Middleware executed", req.headers)

  if (!clientId || !apiToken || !clientSecret) {
    return res.status(400).json({ success: false, error: "Missing authentication headers" })
  }

  try {
    const client = await ClientModel.findOne({ where: { clientId } })

    if (!client) {
      return res.status(403).json({ success: false, error: "Invalid Client-ID" })
    }

    if (client.apiToken !== apiToken) {
      return res.status(403).json({ success: false, error: "Invalid API-Token" })
    }

    if (client.clientSecret !== clientSecret) {
      return res.status(403).json({ success: false, error: "Invalid Secret-Key" })
    }

    req.client = client

    next()
  } catch (error) {
    console.error("Error validating client credentials:", error)
    return res.status(500).json({ success: false, error: "Internal Server Error" })
  }
}
