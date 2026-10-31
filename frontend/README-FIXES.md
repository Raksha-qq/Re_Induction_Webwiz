# Webwiz Recruitment Frontend (fixed)

## Install / run
1. Extract this folder.
2. Open a terminal in this `frontend` folder.
3. Run `npm install` (only needed if dependencies are not already installed).
4. Run `npm run dev`.
5. Keep the backend running separately on port 5000.

The frontend uses `http://localhost:5000/api` by default. To change it, create a `.env` file in this frontend folder with:
`VITE_API_URL=http://localhost:5000/api`

## What was fixed
- Shared React authentication and application state.
- Application status is fetched after login and after a page refresh.
- The `/applications/me` response is read as `{ application: null }` or `{ application: {...} }`.
- Successful submission immediately updates shared state and navigates to the status page.
- Duplicate submission (HTTP 409 with an existing application) routes to the status page.
- Home-page CTAs adapt to signed-out, signed-in, and already-applied states.
- Added a dedicated application status page.
- Login, registration, and application errors are displayed in the form.

Do not copy `node_modules` from another computer. Do not put backend secrets in frontend environment variables.
