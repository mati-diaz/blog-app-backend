const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI

async function main() {
    await mongoose.connect(DB_URI);
}

main()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));