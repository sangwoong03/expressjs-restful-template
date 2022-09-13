-- migrate:up
CREATE TABLE `posts` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `title` varchar(255) NOT NULL,
    `content` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` datetime not null default CURRENT_TIMESTAMP,
    `updated_at` datetime default null on UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)

-- migrate:down
DROP TABLE posts;

