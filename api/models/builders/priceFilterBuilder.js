module.exports = class priceFilterBuilder {
  constructor(priceRange) {
    const [minPrice, maxPrice] = priceRange.split(',');
    this.minPrice = parseFloat(minPrice);
    this.maxPrice = parseFloat(maxPrice);
  }

  buildWhere() {
    return `listings.price BETWEEN ${this.minPrice} AND ${this.maxPrice}`;
  }

  buildClauses() {
    return {
      whereClause: this.buildWhere(),
    };
  }
};
