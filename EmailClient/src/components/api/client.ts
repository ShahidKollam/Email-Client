const AUTH_BASE_URL = `${import.meta.env.VITE_API_SERVER_URL}`

const CLIENT_API = {
  GET_DOMAIN: (userId: string | null) => `${AUTH_BASE_URL}/api/domain/get-domain/${userId}`,
  ADD_DOMAIN: (userId: string | null) => `${AUTH_BASE_URL}/api/domain/add-domain/${userId}`,

  UPDATE_DOMAIN: (id: number | null) => `${AUTH_BASE_URL}/api/domain/update/${id}`,
  DELETE_DOMAIN: (id: number | null) => `${AUTH_BASE_URL}/api/domain/delete/${id}`,
}

export default CLIENT_API
