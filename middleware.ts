import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: { signIn: '/admin/login' },
})

export const config = {
  matcher: ['/admin((?!/login).*)'], // protects everything under /admin except /admin/login
}
