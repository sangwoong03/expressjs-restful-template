module.exports = class BathFilterBuilder {
  constructor(numBaths) {
    this.numBaths = numBaths;
  }

  buildWhere() {
    return `listings.num_baths >= ${this.numBaths}`;
  }

  buildClauses() {
    return {
      whereClause: this.buildWhere(),
    };
  }
};
