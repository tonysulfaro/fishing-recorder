# Fishing Recorder

Web application for recording and visualizing fishing catches on an interactive map.

## Tech Stack

### Frontend (`client-app/`)
- React 16 (Create React App)
- React Bootstrap + styled-components
- Auth0 authentication
- Google Maps integration
- React Router v5

### Backend (`backend-api/FishingRecorder/`)
- ASP.NET Core 3.1 Web API
- PostgreSQL + Entity Framework Core
- FluentMigrator for schema migrations
- JWT Bearer authentication (Auth0)
- Swagger API documentation

## Getting Started

### Prerequisites
- Node.js 18+ and Yarn
- .NET Core 3.1 SDK
- PostgreSQL database

### Frontend

```bash
cd client-app
yarn install    # Install dependencies
yarn start      # Dev server at http://localhost:3000
yarn build      # Production build
yarn test       # Run tests
yarn lint       # ESLint check
yarn format     # Prettier format check
```

### Backend

```bash
cd backend-api/FishingRecorder
dotnet restore  # Restore packages
dotnet build    # Build solution
dotnet run --project FishingRecorder.API  # Run API server
```

## Project Structure

```
fishing-recorder/
  client-app/                    # React frontend
    src/
      Pages/                     # Page components
      components/                # Reusable components
  backend-api/
    FishingRecorder/
      FishingRecorder.API/       # Web API project
      FishingRecorder.DbMigrations/  # Database migrations
  .claude/                       # Claude Code configuration
    commands/                    # Reusable prompt templates
  .github/
    workflows/                   # CI pipeline
    ISSUE_TEMPLATE/              # Issue templates
  docs/                          # Documentation
```

## CI/CD

GitHub Actions runs on all PRs and pushes to master:
- **Frontend**: install, lint, build, test
- **Backend**: restore, build

## Modernization

This project is undergoing a phased modernization. See [docs/MODERNIZATION_PLAN.md](docs/MODERNIZATION_PLAN.md) for the full roadmap:
- Phase 0: Extract hardcoded config, add tests, create API service layer
- Phase 1: Initialize Next.js 15 + shadcn/ui alongside existing CRA app
- Phase 2: Migrate components one-by-one to Next.js + shadcn/ui + TypeScript
- Phase 3: shadcn/ui component mapping reference
- Phase 4: Backend upgrade to .NET 8+
- Phase 5: Cleanup and cutover

## License

See [LICENSE](LICENSE) for details.
