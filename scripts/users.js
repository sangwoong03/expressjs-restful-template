const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { createConnection } = require('typeorm');

async function processData() {
  const conn = await createConnection();

  const users = [];

  fs.createReadStream(path.join(__dirname, 'data', 'users.csv'))
    .pipe(parse({ columns: true }))
    .on('data', (data) => users.push(data))
    .on('error', (err) => console.log(err))
    .on('end', () =>
      conn
        .query(
          `INSERT INTO users (id, first_name, last_name, password, mobile_number, email, kakao_id) VALUES ?`,
          [users.map((user) => Object.values(user))]
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => process.exit())
    );
}

processData();
