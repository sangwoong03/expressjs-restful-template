module.exports = class CityFilterBuilder {
  constructor(keyword) {
    this.keyword = keyword;
  }

  buildWhere() {
    return `listings.city LIKE "%${this.keyword}%"`;
  }

  buildClauses() {
    return {
      whereClause: this.buildWhere(),
    };
  }
};
