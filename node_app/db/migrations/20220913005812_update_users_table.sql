-- migrate:up
ALTER TABLE users MODIFY profile_img_url varchar(2540) NULL DEFAULT "Input your profile Image"

-- migrate:down

