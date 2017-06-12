export type UserId = {
  userId: string
}

export type User = UserId & {
  displayName: string
  profilePicture: string
}

export type ChatUser = User & {
  online: boolean
}
