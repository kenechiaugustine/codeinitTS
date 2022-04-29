export default class AppQuery {
    constructor(query: any, queryString: any) {
        //@ts-ignore
        this.query = query;
        //@ts-ignore
        this.queryString = queryString;
    }

    filter() {
        //@ts-ignore
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        //@ts-ignore
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        //@ts-ignore
        if (this.queryString.sort) {
            //@ts-ignore
            const sortBy = this.queryString.sort.split(',').join(' ');
            //@ts-ignore
            this.query = this.query.sort(sortBy);
        } else {
            //@ts-ignore
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields() {
        //@ts-ignore
        if (this.queryString.fields) {
            //@ts-ignore
            const fields = this.queryString.fields.split(',').join(' ');
            //@ts-ignore
            this.query = this.query.select(fields);
        } else {
            //@ts-ignore
            this.query = this.query.select('-__v');
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
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}
