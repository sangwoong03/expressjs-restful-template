module.exports = class AccomodationsFilterBuilder {
  constructor(numGuests) {
    this.numGuests = numGuests;
  }

  buildWhere() {
    return `listings.num_guests >= ${this.numGuests}`;
  }

  buildClauses() {
    return {
      whereClause: this.buildWhere(),
    };
  }
};
