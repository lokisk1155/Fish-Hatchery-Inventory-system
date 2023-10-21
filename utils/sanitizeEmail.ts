export default function sanitizeEmail(email: string): string {
  return email.replace(/\./g, ',')
}
