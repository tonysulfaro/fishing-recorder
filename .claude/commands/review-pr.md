Review the changes in a pull request for correctness, style, and potential issues.

## Instructions

1. **Read all changed files** in the PR diff
2. **Check for correctness**:
   - Does the code do what the PR description says?
   - Are there logic errors, off-by-one bugs, or missing edge cases?
   - Are API calls handling errors properly?
   - Is auth/authorization handled correctly?
3. **Check for security issues**:
   - No hardcoded secrets, API keys, or credentials
   - No SQL injection or XSS vulnerabilities
   - Proper input validation on API endpoints
4. **Check for style consistency**:
   - Follows existing patterns (functional components, hooks, repository pattern)
   - PascalCase component filenames, co-located CSS files
   - No unnecessary dependencies added
5. **Check build/test impact**:
   - Run `cd client-app && yarn lint && yarn build` for frontend changes
   - Run `cd backend-api/FishingRecorder && dotnet build` for backend changes
6. **Provide feedback**: Summarize findings with specific file:line references

## PR Context

$ARGUMENTS
