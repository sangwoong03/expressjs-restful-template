const UserDao = require('./api/models/userDao');
const ListingDao = require('./api/models/listingDao');

const AuthService = require('./api/services/authService');
const ListingService = require('./api/services/listingService');

class Service {
  constructor(config) {
    const userDao = new UserDao(config.db);
    const listingDao = new ListingDao(config.db);

    this.authService = new AuthService(userDao);
    this.listingService = new ListingService(listingDao);
  }
}

module.exports = Service;
