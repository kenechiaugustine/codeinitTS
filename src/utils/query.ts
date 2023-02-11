/** @format */

export default class AppQuery {
  constructor(modelQuery: any, queryString: any) {
    //@ts-ignore
    this.modelQuery = modelQuery;
    //@ts-ignore
    this.queryString = queryString;
  }

  filter() {
    //@ts-ignore
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //@ts-ignore
    this.modelQuery = this.modelQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    //@ts-ignore
    if (this.queryString.sort) {
      //@ts-ignore
      const sortBy = this.queryString.sort.split(',').join(' ');
      //@ts-ignore
      this.modelQuery = this.modelQuery.sort(sortBy);
    } else {
      //@ts-ignore
      this.modelQuery = this.modelQuery.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    //@ts-ignore
    if (this.queryString.fields) {
      //@ts-ignore
      const fields = this.queryString.fields.split(',').join(' ');
      //@ts-ignore
      this.modelQuery = this.modelQuery.select(fields);
    } else {
      //@ts-ignore
      this.modelQuery = this.modelQuery.select('-__v');
    }
    return this;
  }

  paginate() {
    //@ts-ignore
    const page = this.queryString.page * 1 || 1;
    //@ts-ignore
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    //@ts-ignore
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}
