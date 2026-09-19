export type UserRole = 'admin' | 'employee'

export interface User {
  username: string
  password: string
  role: UserRole
  name: string
}

const users: User[] = [
  {
    username: 'admin',
    password: 'admin',
    role: 'admin',
    name: 'Administrator'
  },
  {
    username: 'employee',
    password: 'employee',
    role: 'employee',
    name: 'Employee'
  }
]

export async function getUser(
  username: string,
  password: string
): Promise<User | null> {
  console.log('GET USER:', username, password)

  const user = users.find(
    user =>
      user.username === username &&
      user.password === password
  )

  console.log('FOUND:', user)

  return user ?? null
}