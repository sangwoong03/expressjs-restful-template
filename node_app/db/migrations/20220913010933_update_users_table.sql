-- migrate:up
ALTER TABLE users MODIFY age VARCHAR(16) NULL DEFAULT "asdf"

-- migrate:down

