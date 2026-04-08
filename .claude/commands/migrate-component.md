Migrate a React Bootstrap component to shadcn/ui as part of the Next.js modernization.

## Instructions

1. **Identify the component** to migrate from `client-app/src/components/` or `client-app/src/Pages/`
2. **Read the current implementation** thoroughly - understand its props, state, styling, and behavior
3. **Map the UI primitives** using this reference:
   | React Bootstrap | shadcn/ui Replacement |
   |----------------|----------------------|
   | `Button` | `Button` from `@/components/ui/button` |
   | `Modal` | `Dialog` from `@/components/ui/dialog` |
   | `Form`, `Form.Control`, `Form.Group` | `Form` + `Input` + `Select` from shadcn |
   | `Table` | `Table` from `@/components/ui/table` |
   | `Navbar`, `Nav` | `NavigationMenu` from `@/components/ui/navigation-menu` |
   | `Spinner` | Custom loading or `Skeleton` |
   | styled-components | Tailwind CSS utility classes |
4. **Convert the component**:
   - Rewrite as TypeScript (`.tsx`)
   - Replace React Bootstrap imports with shadcn/ui imports
   - Convert CSS/styled-components to Tailwind utility classes
   - Use `cn()` helper for conditional classes
   - Add proper TypeScript types for props
5. **Update routing** if this is a page component:
   - React Router `useHistory` -> Next.js `useRouter` from `next/navigation`
   - React Router `Link` -> Next.js `Link` from `next/link`
   - React Router `useLocation` -> Next.js `usePathname`
6. **Update auth** if the component uses Auth0:
   - `@auth0/auth0-react` hooks -> `@auth0/nextjs-auth0` equivalents
7. **Verify**: Run `yarn lint` and `yarn build` in the Next.js project directory

## Component to Migrate

$ARGUMENTS
