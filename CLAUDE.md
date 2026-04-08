# Fishing Recorder - Claude Code Instructions

## Project Overview

Full-stack fishing catch recording application with a React frontend and .NET Core backend API.

- **Frontend:** `client-app/` - React 16 SPA (Create React App, JavaScript)
- **Backend:** `backend-api/FishingRecorder/` - ASP.NET Core 3.1 Web API with PostgreSQL

## Architecture

```
fishing-recorder/
  client-app/          # React frontend (CRA)
    src/
      Pages/           # Page components (LoginPage, Protected, Report, NotFound)
      components/      # Reusable components (Navigation, MapView, AddFishButton, Marker, etc.)
      Images/          # Static assets
    public/            # Public HTML and manifest
  backend-api/
    FishingRecorder/
      FishingRecorder.API/         # Web API project
        Controllers/               # API endpoints (FishRecordController, UsersController)
        Models/                    # Database entities, request/response DTOs
        Repositories/              # Data access layer
        Interfaces/                # Repository interfaces
      FishingRecorder.DbMigrations/ # FluentMigrator database migrations
  docs/                # Documentation and modernization plans
```

## Build & Run Commands

### Frontend

```bash
cd client-app
yarn install          # Install dependencies
yarn start            # Dev server on localhost:3000
yarn build            # Production build
yarn test             # Run tests (Jest + React Testing Library)
yarn lint             # ESLint check
yarn format           # Prettier format check
yarn format:fix       # Auto-fix formatting
```

### Backend

```bash
cd backend-api/FishingRecorder
dotnet restore        # Restore NuGet packages
dotnet build          # Build all projects
dotnet run --project FishingRecorder.API  # Run API server
```

### Database Migrations

```bash
cd backend-api/FishingRecorder/FishingRecorder.DbMigrations
# Windows: migrate-dev.cmd / rollback-dev.cmd
# Uses FluentMigrator - migrations are numbered _1_ through _7_
```

## Code Style & Conventions

### Frontend
- **Components:** Functional components with React Hooks (useState, useEffect)
- **File naming:** PascalCase for components (e.g., `MapView.jsx`), each with a paired `.css` file
- **Styling:** React Bootstrap components + CSS files; styled-components for map markers
- **State:** Props drilling from App.js (fish state); Auth0 context for authentication
- **API calls:** fetch() with async/await, base URL: external API endpoint
- **Routing:** React Router v5 with PrivateRoute wrapper for auth-protected pages

### Backend
- **Architecture:** Repository pattern with dependency injection
- **Controllers:** Thin controllers delegating to repository interfaces
- **Models:** Separate Database (EF entities), Request, and Response model directories
- **Auth:** JWT Bearer tokens validated against Auth0
- **Database:** PostgreSQL via Npgsql + Entity Framework Core

## Authentication

- Auth0 provider with JWT Bearer tokens
- Frontend: `@auth0/auth0-react` SDK
- Backend: `Microsoft.AspNetCore.Authentication.JwtBearer`
- Credentials are currently hardcoded (should be moved to environment variables during modernization)

## Key Dependencies

### Frontend
- react@16, react-dom@16, react-scripts@3.4.3
- react-router-dom@5, react-bootstrap@1.3, bootstrap@4.5
- @auth0/auth0-react@1.1, google-map-react@2.1, react-datepicker@3.2
- styled-components@5.2

### Backend
- .NET Core 3.1 (netcoreapp3.1)
- EntityFrameworkCore@3.1.8, Npgsql@3.1.4
- FluentMigrator@3.2.7, Swashbuckle@5.5.0

## CI/CD

GitHub Actions CI runs on all PRs and pushes to master:
- Frontend: install, lint, build, test
- Backend: restore, build

Check PR status checks to verify your changes pass CI before requesting review.

## Session Setup

When starting a new session, ensure dependencies are installed:

```bash
cd client-app && yarn install
cd backend-api/FishingRecorder && dotnet restore
```

These commands are pre-approved in `.claude/settings.json`.

## Known Issues

- CRA 3.x requires `NODE_OPTIONS=--openssl-legacy-provider` on Node 18+ (already set in package.json scripts)
- Auth0 credentials and Google Maps API key are hardcoded in frontend source files
- API base URL (Heroku) is hardcoded in multiple components
- PostgreSQL connection string is hardcoded in `FishingRecorderContext.cs`
- .NET Core 3.1 is end-of-life
- See `docs/MODERNIZATION_PLAN.md` for the full migration roadmap

## When Making Changes

1. Always run `yarn lint` and `yarn build` in `client-app/` before committing frontend changes
2. Always run `dotnet build` in `backend-api/FishingRecorder/` before committing backend changes
3. Follow existing file naming and directory conventions
4. Add tests for new functionality when possible
5. Do not hardcode credentials or API URLs - use environment variables
