const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createConnection } = require('typeorm');

async function processData() {
  const conn = await createConnection();

  const listings = [];

  fs.createReadStream(path.join(__dirname, 'data', 'listings.csv'))
    .pipe(parse({ columns: true }))
    .on('data', (data) => {
      if (data.num_bedrooms === '') data.num_bedrooms = 0;
      if (data.num_beds === '') data.num_beds = 0;
      if (data.num_baths === '') data.num_baths = 0;
      data.updated_at = data.created_at;
      data.price = parseFloat(data.price).toFixed(2);

      listings.push(data);
    })
    .on('error', (err) => console.log(err))
    .on('end', () =>
      conn
        .query(
          `INSERT INTO listings (id, host_id, listing_type_id, title, description, price, num_guests, num_bedrooms, num_beds, num_baths, country, region, city, address, latitude, longitude, created_at, updated_at) VALUES ?`,
          [listings.map((listing) => Object.values(listing))]
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => process.exit())
    );
}

processData();
