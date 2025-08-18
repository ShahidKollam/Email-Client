const AUTH_BASE_URL = `${import.meta.env.VITE_API_SERVER_URL}`

const URL = {
  SEND_BULK_EMAIL: `${AUTH_BASE_URL}/api/sendmail/sendBulkMail`,
  UPDATE_TEMPLATE: (id: string | undefined) => `${AUTH_BASE_URL}/api/template/update-template/${id}`,
}

export default URL
