# Modernization Plan: fishing-recorder

## Overview

Migrate from **React 16 CRA + React Bootstrap** to **Next.js 15 (App Router) + shadcn/ui + TypeScript**.

The migration is structured in phases so each phase produces a working application. Phases can be executed as independent PRs.

---

## Phase 0: Pre-Migration Foundation

Prepare the existing codebase before starting the framework migration.

### 0.1 Extract Hardcoded Values to Environment Variables

Currently hardcoded across multiple files:

| Value | Files | Environment Variable |
|-------|-------|---------------------|
| Auth0 domain (`rallyokr.us.auth0.com`) | `index.js`, `Navigation.jsx`, `AddFishButton.jsx`, `Profile.jsx` | `REACT_APP_AUTH0_DOMAIN` |
| Auth0 client ID | `index.js` | `REACT_APP_AUTH0_CLIENT_ID` |
| Auth0 audience | `index.js` | `REACT_APP_AUTH0_AUDIENCE` |
| Google Maps API key | `MapView.jsx` | `REACT_APP_GOOGLE_MAPS_KEY` |
| API base URL (`https://fishing-recorder-api.herokuapp.com`) | `MapView.jsx`, `Navigation.jsx`, `AddFishButton.jsx` | `REACT_APP_API_BASE_URL` |
| PostgreSQL connection string | `FishingRecorderContext.cs` | `ConnectionStrings__DefaultConnection` |

**Tasks:**
- Create `client-app/.env.example` with placeholder values (committed)
- Create `client-app/.env.local` with real values (gitignored)
- Update all frontend files to use `process.env.REACT_APP_*`
- Move backend connection string to `appsettings.json` / env var
- Add GitHub Actions secrets for CI if needed

### 0.2 Create API Service Layer

Centralize scattered `fetch()` calls into a single service:

```
client-app/src/services/api.js
```

- Extract API calls from `MapView.jsx`, `Navigation.jsx`, `AddFishButton.jsx`
- Single `API_BASE_URL` source
- Shared auth token handling
- This layer translates directly into Next.js server actions later

### 0.3 Add Baseline Tests

Add smoke tests for every component using the already-installed `@testing-library/react`:

- `App.test.js` - renders without crash
- `LoginPage.test.jsx` - renders login button
- `Navigation.test.jsx` - renders nav elements
- `MapView.test.jsx` - renders loading state
- `AddFishButton.test.jsx` - renders button, opens modal
- `Report.test.jsx` - renders table structure

These serve as a safety net during migration to catch regressions.

---

## Phase 1: Initialize Next.js Project

### 1.1 Create Next.js App

```bash
npx create-next-app@latest next-app --typescript --tailwind --app --src-dir --use-yarn
```

This creates `next-app/` at the repo root alongside `client-app/`. Both run in parallel until migration is complete.

### 1.2 Install and Initialize shadcn/ui

```bash
cd next-app
npx shadcn@latest init
```

Configure with default theme, New York style, and CSS variables for theming.

### 1.3 Set Up Auth0 for Next.js

- Install `@auth0/nextjs-auth0` (different SDK from the React one)
- Create route handler: `app/api/auth/[...auth0]/route.ts`
- Configure middleware for protected routes
- Environment variables:
  - `AUTH0_SECRET`, `AUTH0_BASE_URL`
  - `AUTH0_ISSUER_BASE_URL`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`

### 1.4 Set Up Environment Variables

- `next-app/.env.local` (gitignored) - real values
- `next-app/.env.example` (committed) - placeholder template
- Variables: Auth0, Google Maps API key, backend API URL

---

## Phase 2: Migrate Components

Migrate in dependency order (leaf components first, then composites, then pages).

### 2.1 Leaf Components

| # | Current Component | New Location | Key Changes |
|---|------------------|--------------|-------------|
| 1 | `CurrentLocationMarker.jsx` | `src/components/current-location-marker.tsx` | styled-components -> Tailwind |
| 2 | `Marker.jsx` | `src/components/marker.tsx` | styled-components -> Tailwind, add shadcn Popover |
| 3 | `LoginButton.jsx` | `src/components/login-button.tsx` | shadcn Button + nextjs-auth0 |
| 4 | `LogoutButton.jsx` | `src/components/logout-button.tsx` | shadcn Button + nextjs-auth0 |
| 5 | `Profile.jsx` | `src/components/profile.tsx` | nextjs-auth0 `useUser` hook |

### 2.2 Composite Components

| # | Current Component | New Location | Key Changes |
|---|------------------|--------------|-------------|
| 6 | `AddFishButton.jsx` | `src/components/add-fish-dialog.tsx` | Modal -> shadcn Dialog, Form -> shadcn Form + zod + react-hook-form, Select -> shadcn Select |
| 7 | `Navigation.jsx` | `src/components/navigation.tsx` | Navbar -> shadcn NavigationMenu or custom Tailwind nav |
| 8 | `MapView.jsx` | `src/components/map-view.tsx` | Keep google-map-react or switch to `@vis.gl/react-google-maps`, extract API to server actions |

### 2.3 Pages (App Router)

| # | Current Page | New Route | Notes |
|---|-------------|-----------|-------|
| 9 | `LoginPage.jsx` (`/`) | `app/page.tsx` | Public landing/login page |
| 10 | `Protected.jsx` (`/protected`) | `app/dashboard/page.tsx` | Rename to `/dashboard`, middleware auth |
| 11 | `Report.jsx` (`/report`) | `app/report/page.tsx` | Table -> shadcn Table, middleware auth |
| 12 | `NotFound.jsx` | `app/not-found.tsx` | Next.js built-in convention |
| 13 | — | `app/layout.tsx` | Auth provider, global CSS, metadata |

### 2.4 Routing Migration Reference

| React Router v5 | Next.js App Router |
|-----------------|-------------------|
| `BrowserRouter` / `Switch` / `Route` | File-based routing (automatic) |
| `PrivateRoute` component | Next.js middleware + auth check |
| `useHistory().push()` | `useRouter().push()` from `next/navigation` |
| `<Redirect to="/">` | `redirect()` from `next/navigation` |
| `useLocation` | `usePathname()` from `next/navigation` |
| `<Link to="/report">` | `<Link href="/report">` from `next/link` |

---

## Phase 3: shadcn/ui Component Mapping Reference

Install components as needed with `npx shadcn@latest add <component>`.

| React Bootstrap Component | shadcn/ui Replacement | Install Command |
|--------------------------|----------------------|-----------------|
| `Button` | `Button` | `npx shadcn@latest add button` |
| `Modal` | `Dialog` | `npx shadcn@latest add dialog` |
| `Form` + `Form.Group` + `Form.Label` | `Form` + `Label` | `npx shadcn@latest add form label` |
| `Form.Control` (text input) | `Input` | `npx shadcn@latest add input` |
| `Form.Control as="select"` | `Select` | `npx shadcn@latest add select` |
| `Table` | `Table` | `npx shadcn@latest add table` |
| `Navbar` + `Nav` | `NavigationMenu` | `npx shadcn@latest add navigation-menu` |
| `Spinner` | `Skeleton` or custom | `npx shadcn@latest add skeleton` |
| `Nav.Link` | shadcn `Button` variant="link" or custom | — |
| styled-components | Tailwind CSS utility classes | (built-in) |
| CSS files (co-located) | Tailwind classes inline or CSS modules | (built-in) |

---

## Phase 4: Backend Modernization

### 4.1 Upgrade .NET Version

- Migrate from .NET Core 3.1 (end-of-life) to .NET 8 (current LTS)
- Update `TargetFramework` in both `.csproj` files to `net8.0`
- Update all NuGet packages to latest compatible versions
- Replace `Startup.cs` + `Program.cs` pattern with minimal API builder pattern

### 4.2 Fix Configuration Management

- Move hardcoded PostgreSQL connection string from `FishingRecorderContext.cs` to `appsettings.json`
- Use `IConfiguration` injection in DbContext
- Support environment variable overrides for deployment

### 4.3 Add Backend Tests

- Create `FishingRecorder.Tests` project with xUnit
- Unit tests for `FishRepository` and `UserRepository` (mock DbContext)
- Integration tests for `FishRecordController` and `UsersController`
- Add to solution and CI pipeline

### 4.4 Containerize

- Add `Dockerfile` for the API project
- Add `docker-compose.yml` with API + PostgreSQL services
- Update CI to optionally build Docker image

---

## Phase 5: Cleanup and Cutover

1. Remove `client-app/` directory entirely
2. Rename `next-app/` to `client-app/` (or `web/`)
3. Update `CLAUDE.md` with new commands (`next build`, `next lint`, etc.)
4. Update `.github/workflows/ci.yml` for Next.js pipeline
5. Update `README.md` with new tech stack
6. Remove unused dependencies: `react-bootstrap`, `bootstrap`, `styled-components`, `react-router-dom`, `@reach/router`, `react-scripts`

---

## Estimated Scope Per Phase

| Phase | PRs | Complexity |
|-------|-----|------------|
| Phase 0: Foundation | 3 | Low |
| Phase 1: Next.js Init | 1 | Low |
| Phase 2: Component Migration | 5-8 | Medium |
| Phase 3: (reference only) | — | — |
| Phase 4: Backend | 3-4 | Medium-High |
| Phase 5: Cleanup | 1 | Low |

---

## AI Agent Workflow

Each phase/task can be assigned as a GitHub issue. An AI agent can:

1. Pick up an issue
2. Create a feature branch
3. Use the `/migrate-component` slash command for component migrations
4. Run `yarn lint && yarn build` to self-verify
5. Open a PR using the PR template
6. Monitor CI checks for pass/fail
7. Iterate on review feedback

The `.claude/commands/migrate-component.md` template provides step-by-step guidance for each component migration.
