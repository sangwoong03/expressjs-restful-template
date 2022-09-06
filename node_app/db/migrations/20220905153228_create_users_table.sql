-- migrate:up
CREATE TABLE `users` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `email` varchar(255) NOT NULL UNIQUE,
    `last_name` varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `profile_img_url` varchar(2000) DEFAULT NULL,
    `password` varchar(255) NOT NULL, 
    `birthday` varchar(16) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT NULL on UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
drop table users;
