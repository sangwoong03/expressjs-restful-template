const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createConnection } = require('typeorm');

async function processData() {
  const conn = await createConnection();

  const amenities = [];

  fs.createReadStream(path.join(__dirname, 'data', 'amenities.csv'))
    .pipe(parse({ columns: true }))
    .on('data', (data) => amenities.push(data))
    .on('error', (err) => console.log(err))
    .on('end', () =>
      conn
        .query(`INSERT INTO amenities (id, name, amenity_type_id) VALUES ?`, [
          amenities.map((amenity) => Object.values(amenity)),
        ])
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => process.exit())
    );
}

processData();
