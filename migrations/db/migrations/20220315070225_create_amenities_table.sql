-- migrate:up
CREATE TABLE amenity_types (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE amenities (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amenity_type_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (amenity_type_id) REFERENCES amenity_types(id)
);

CREATE TABLE listings_amenities (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amenity_id INT NOT NULL,
    listing_id INT NOT NULL,
    FOREIGN KEY (amenity_id) REFERENCES amenities(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id)
);

-- migrate:down
DROP TABLE listings_amenities;
DROP TABLE amenities;
DROP TABLE amenity_types;