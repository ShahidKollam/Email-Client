export interface Template {
  id?: string
  title?: string
  template_description?: string
  html_content?: string
  css_content?: string
  template_name?: string
  html?: string
  css?: string
  category?: string
  api_url?: string
  isDefault?: boolean
  template_id?: string
  subject?: string
}

export interface FormValues {
  [key: string]: string
  email: string
}

export interface UserTypes {
  id?: string
  name?: string
  email?: string
  phone?: string
  address?: string
  joinedDate?: string
  avatar?: string
}
