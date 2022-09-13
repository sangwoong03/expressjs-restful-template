-- migrate:up
ALTER TABLE users MODIFY profile_img_url VARCHAR(2500) NULL;

-- migrate:down

