-- migrate:up
CREATE TABLE listing_images (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(2000) NOT NULL,
    listing_id INT NOT NULL,
    sequence INT NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);

-- migrate:down
DROP TABLE listing_images;