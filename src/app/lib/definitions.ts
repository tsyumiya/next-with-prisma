export type User = {
  id: string
  name: string
  email: string
  password: string
}

export type Post = {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
}
