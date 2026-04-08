Implement a new feature in the fishing-recorder application.

## Instructions

1. **Understand the requirement**: Parse the feature description and identify which parts of the stack are affected (frontend, backend, or both)
2. **Plan the implementation**:
   - Identify existing patterns to follow (component structure, API patterns, data models)
   - List the files that need to be created or modified
3. **Implement**:
   - Frontend components go in `client-app/src/components/` (PascalCase, `.jsx` + `.css` pairs)
   - Frontend pages go in `client-app/src/Pages/` (PascalCase, `.jsx` + `.css` pairs)
   - Backend controllers go in `backend-api/.../Controllers/`
   - Backend models go in `backend-api/.../Models/` (Database/, Request/, or Response/)
   - Backend repositories go in `backend-api/.../Repositories/` with matching interfaces in `Interfaces/`
4. **Follow conventions**:
   - Functional components with React Hooks
   - React Bootstrap for UI elements
   - Repository pattern with DI on the backend
   - Async/await for API calls
5. **Verify**:
   - `cd client-app && yarn lint && yarn build`
   - `cd backend-api/FishingRecorder && dotnet build`
6. **Add tests** for the new functionality where possible

## Feature Description

$ARGUMENTS
