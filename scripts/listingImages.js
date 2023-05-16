const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createConnection } = require('typeorm');

async function processData() {
  const conn = await createConnection();

  const listingImages = [];

  fs.createReadStream(path.join(__dirname, 'data', 'listing_images.csv'))
    .pipe(parse({ columns: true }))
    .on('data', (data) => listingImages.push(data))
    .on('error', (err) => console.log(err))
    .on('end', () =>
      conn
        .query(
          `INSERT INTO listing_images (id, image_url, listing_id, sequence) VALUES ?`,
          [listingImages.map((listingImage) => Object.values(listingImage))]
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => process.exit())
    );
}

processData();
