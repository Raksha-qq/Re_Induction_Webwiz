-- Run this once in pgAdmin if applications.user_id is not already UNIQUE.
-- If this reports duplicate user_id values, resolve those duplicates first.
CREATE UNIQUE INDEX IF NOT EXISTS applications_one_per_user_idx
ON applications (user_id);
