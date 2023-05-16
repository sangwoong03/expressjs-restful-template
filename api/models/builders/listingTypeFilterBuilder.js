module.exports = class ListingTypeFilterBuilder {
  constructor(listingTypeId) {
    this.listingTypeId = listingTypeId;
  }

  buildWhere() {
    return `listings.listing_type_id = ${this.listingTypeId}`;
  }

  buildClauses() {
    return {
      whereClause: this.buildWhere(),
    };
  }
};
