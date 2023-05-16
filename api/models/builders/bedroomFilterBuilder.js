module.exports = class BedroomFilterBuilder {
  constructor(numBedrooms) {
    this.numBedrooms = numBedrooms;
  }

  buildWhere() {
    return `listings.num_bedrooms >= ${this.numBedrooms}`;
  }

  buildClauses() {
    return {
      whereClause: this.buildWhere(),
    };
  }
};
