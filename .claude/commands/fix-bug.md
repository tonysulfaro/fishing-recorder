Investigate and fix a bug in the fishing-recorder application.

## Instructions

1. **Understand the bug**: Read the issue description or user report carefully
2. **Reproduce**: Identify the affected code path by searching for relevant components, API endpoints, or data flow
3. **Locate root cause**: Trace the bug through the relevant files:
   - Frontend components: `client-app/src/components/` and `client-app/src/Pages/`
   - Backend controllers: `backend-api/FishingRecorder/FishingRecorder.API/Controllers/`
   - Backend repositories: `backend-api/FishingRecorder/FishingRecorder.API/Repositories/`
4. **Fix**: Make the minimal change needed to resolve the issue
5. **Verify**: Run the appropriate checks:
   - Frontend: `cd client-app && yarn lint && yarn build`
   - Backend: `cd backend-api/FishingRecorder && dotnet build`
6. **Test**: Add or update tests if the bug area has test coverage

## Context

$ARGUMENTS
