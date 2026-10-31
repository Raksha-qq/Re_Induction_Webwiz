# Webwiz backend update

## What was fixed
- `GET /api/applications/me` now always returns HTTP 200 with `{ "application": null }` when the user has not applied, or `{ "application": { ... } }` when they have.
- Application submission returns the saved application on success and on duplicate submission.
- The server registers routes before calling `app.listen()`.
- Email delivery is best-effort: an email-provider error does not undo a saved application.
- User email is normalized to lowercase and application text is escaped in notification HTML.

## Apply these files
Replace the matching files in your existing `backend` folder with the files in this package.
Do NOT replace your real `.env` with `.env.example`. Keep your existing `.env` locally.

## Database
Your existing tables are expected to have:
- `users`: id, name, email, password
- `applications`: id, user_id, name, email, department, year, preferred_team, reason, status, created_at

The application table must enforce one application per user. If `user_id` is not already unique, run `schema-add-unique-index.sql` in pgAdmin. If the index creation reports duplicate rows, stop and inspect those records before proceeding.

## Run
From the backend directory:
```bash
node server.js
```

Test:
- `http://localhost:5000/api/health`
- While logged in, `GET http://localhost:5000/api/applications/me` with header `Authorization: Bearer YOUR_TOKEN`

Expected response before applying:
```json
{ "application": null }
```

Expected response after applying:
```json
{ "application": { "id": 1, "status": "Pending" } }
```
(The actual response includes the other application fields too.)
