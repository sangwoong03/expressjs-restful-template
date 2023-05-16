module.exports = class FilterBuilderDirector {
  constructor(builders) {
    this.builders = builders;
    this.clauses = {
      whereClause: [],
    };
  }

  prepareClauses() {
    this.builders.forEach((builder) => {
      const { whereClause } = builder.buildClauses();

      if (whereClause) this.clauses.whereClause.push(whereClause);
    });
  }

  concatWhereClause() {
    return `WHERE ${this.clauses.whereClause.join(' AND ')}`;
  }

  build() {
    this.prepareClauses();

    const whereClause = this.concatWhereClause();
    return whereClause;
  }
};
