-- migrate:up
ALTER TABLE posts ADD image_url VARCHAR(2000) NOT NULL

-- migrate:down