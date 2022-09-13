-- migrate:up
ALTER TABLE posts MODIFY image_url varchar(2000) NULL default "base.png";

-- migrate:down

