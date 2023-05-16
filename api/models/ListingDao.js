const FilterBuilderDirector = require('./builders/filterBuilderDirector');

module.exports = class ListingDao {
  constructor(db) {
    this.db = db;
  }

  async getListings(builders, limit, offset) {
    const filterQuery = new FilterBuilderDirector(builders).build();
    console.log(
      `
      SELECT * FROM listings
      ${filterQuery}
      LIMIT ?
      OFFSET ?;
    `
    );

    const result = await this.db.query(
      `
      SELECT * FROM listings
      ${filterQuery}
      LIMIT ?
      OFFSET ?;
    `,
      [limit, offset]
    );
    return result;
  }

  async getListing(id) {
    const [result] = await this.db.query(
      `SELECT * FROM listings WHERE id = ?;`,
      [id]
    );
    return result;
  }

  async getListingImages(listingId) {
    const result = await this.db.query(
      `SELECT * FROM listing_images WHERE listing_id = ?;`,
      [listingId]
    );
    return result;
  }
};
