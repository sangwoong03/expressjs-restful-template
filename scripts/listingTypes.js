const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createConnection } = require('typeorm');

async function processData() {
  const conn = await createConnection();

  const listingTypes = [];

  fs.createReadStream(path.join(__dirname, 'data', 'listing_types.csv'))
    .pipe(parse({ columns: true }))
    .on('data', (data) => listingTypes.push(data))
    .on('error', (err) => console.log(err))
    .on('end', () =>
      conn
        .query(`INSERT INTO listing_types (id, type) VALUES ?`, [
          listingTypes.map((listingType) => Object.values(listingType)),
        ])
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => process.exit())
    );
}

processData();
