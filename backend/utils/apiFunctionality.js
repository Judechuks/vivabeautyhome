// api functionalities such as filtering, searching, pagination, etc.
// where query is mongoDB query
// where queryStr is the query parameter

class APIFunctionality {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  // Method to search the query based on the query string
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // 'i' for case-insensitive search
          },
        }
      : {};
    // Adding the search condition to the query
    this.query = this.query.find({ ...keyword });
    return this; // for method chaining
  }

  // Method to filter the query based on the query string
  filter() {
    const queryCopy = { ...this.queryStr }; // Create a copy of the query string

    // Removing fields from the query string that are not needed for filtering
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    // Adding the filter condition to the query
    this.query = this.query.find(queryCopy);
    return this; // for method chaining
  }

  // Method to paginate the query results
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // Default to page 1 if not specified
    const skip = resultPerPage * (currentPage - 1); // Calculating the number of documents to skip
    this.query = this.query.limit(resultPerPage).skip(skip); // Applying limit and skip to the query
    return this; // for method chaining
  }
}

export default APIFunctionality;
