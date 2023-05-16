const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createConnection } = require('typeorm');

async function processData() {
  const conn = await createConnection();

  const hosts = [];

  fs.createReadStream(path.join(__dirname, 'data', 'hosts.csv'))
    .pipe(parse({ columns: true }))
    .on('data', (data) => hosts.push(data))
    .on('error', (err) => console.log(err))
    .on('end', () =>
      conn
        .query(`INSERT INTO hosts (id, user_id) VALUES ?`, [
          hosts.map((host) => Object.values(host)),
        ])
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => process.exit())
    );
}

processData();
