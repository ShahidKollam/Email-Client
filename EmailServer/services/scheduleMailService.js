import ScheduledEmail from "../models/ScheduledEmail.js"

export const getScheduledEmails = async () => {
  try {
    const pendingEmails = await ScheduledEmail.findAll()
    return pendingEmails
  } catch (error) {
    console.error("Error fetching scheduled emails:", error)
    throw new Error("An error occurred while fetching the scheduled emails.")
  }
}

export const updateEmailStatus = async (emailId, status) => {
  try {
    await ScheduledEmail.update({ status }, { where: { id: emailId } })
    console.log(`Status updated to '${status}' for email ID ${emailId}`)
  } catch (error) {
    console.error(`Error updating status for email ID ${emailId}:`, error)
    throw new Error("An error occurred while updating the email status.")
  }
}

export const deleteScheduledEmail = async (emailId) => {
  try {
    await ScheduledEmail.destroy({ where: { id: emailId } })
    console.log(`Scheduled email with ID ${emailId} has been deleted.`)
  } catch (error) {
    console.error(`Error deleting scheduled email with ID ${emailId}:`, error)
    throw new Error("An error occurred while deleting the scheduled email.")
  }
}
