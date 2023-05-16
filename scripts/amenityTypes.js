const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createConnection } = require('typeorm');

async function processData() {
  const conn = await createConnection();

  const amenityTypes = [];

  fs.createReadStream(path.join(__dirname, 'data', 'amenity_types.csv'))
    .pipe(parse({ columns: true }))
    .on('data', (data) => amenityTypes.push(data))
    .on('error', (err) => console.log(err))
    .on('end', () =>
      conn
        .query(`INSERT INTO amenity_types (id, type) VALUES ?`, [
          amenityTypes.map((amenityType) => Object.values(amenityType)),
        ])
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => process.exit())
    );
}

processData();
