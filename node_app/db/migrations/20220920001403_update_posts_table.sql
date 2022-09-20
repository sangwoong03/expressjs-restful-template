-- migrate:up
ALTER TABLE posts ADD `like` INT NULL DEFAULT 0 AFTER content;

-- migrate:down

