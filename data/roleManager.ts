import { Role } from 'interfaces/session'

export function setWantedRole(role: Role) {
  localStorage.setItem('wantedRole', role)
}

export function getWantedRole(): Role | null {
  return localStorage.getItem('wantedRole') as Role | null
}
