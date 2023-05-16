module.exports = class BedFilterBuilder {
  constructor(numBeds) {
    this.numBeds = numBeds;
  }

  buildWhere() {
    return `listings.num_beds >= ${this.numBeds}`;
  }

  buildClauses() {
    return {
      whereClause: this.buildWhere(),
    };
  }
};
