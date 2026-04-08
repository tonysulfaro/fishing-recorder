Add tests for existing code in the fishing-recorder application.

## Instructions

1. **Identify the target** code to test from the arguments
2. **Read the implementation** thoroughly to understand behavior, inputs, outputs, and edge cases
3. **Write tests** following these conventions:

### Frontend Tests
- Test file location: alongside the component (e.g., `ComponentName.test.jsx`)
- Framework: Jest + React Testing Library (already installed)
- Test patterns:
  - Smoke test: component renders without crashing
  - Content test: expected text/elements appear
  - Interaction test: buttons, forms, navigation work
  - State test: component state changes correctly
- Mock Auth0: `jest.mock('@auth0/auth0-react')` with `useAuth0` returning test values
- Mock fetch: `jest.fn()` or `jest-fetch-mock` for API calls
- Example structure:
  ```jsx
  import { render, screen } from '@testing-library/react';
  import ComponentName from './ComponentName';

  describe('ComponentName', () => {
    it('renders without crashing', () => {
      render(<ComponentName />);
    });
  });
  ```

### Backend Tests (.NET)
- If no test project exists, create `FishingRecorder.Tests/` with xUnit
- Test patterns: unit tests for repositories (mock DbContext), controller tests
- Register in the solution file

4. **Run tests**: `cd client-app && CI=true yarn test` or `cd backend-api/FishingRecorder && dotnet test`
5. **Verify all tests pass** before finishing

## Target

$ARGUMENTS
