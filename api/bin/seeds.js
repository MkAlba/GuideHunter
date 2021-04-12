const mongoose = require('mongoose');
const Guide = require('../models/guide.model');
const guidesData = require('../data/guides.json');
const User = require('../models/user.model');
const usersData = require('../data/users.json');
require('../config/db.config');



mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);
  mongoose.connection.db.dropDatabase()
    .then(() => console.log(`- Database dropped`))
    .then(() => Guide.create(guidesData))
    .then(() => User.create(usersData))
    .then(guides => console.info(`- Added ${guides.length} guides`))
    .then(users => console.info(`- Added ${users.length} users`))
    .then(() => console.info(`- All data created!`))
    .catch(error => console.error(error))
    .then(() => process.exit(0))
})