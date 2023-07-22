module.exports = class ApiFeature {
  constructor(model, queryString, aggregateArray) {
    this.model = model;
    this.queryString = queryString;
    this.aggregateArray = aggregateArray;
  }

  paginate() {
    let limit = this.queryString.limit * 1 || 12;

    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    console.log(page, limit);
    let skip = (page - 1) * limit;
    console.log(page, limit, skip);
    this.aggregateArray.push({ $skip: skip }, { $limit: limit });
    return this;
  }

  filter() {
    console.log("filter");
    let filterObj = { ...this.queryString };
    let excludedQuery = ["page", "sort", "fields", "keyword", "limit"];
    excludedQuery.forEach((q) => {
      delete filterObj[q];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filterObj = JSON.parse(filterObj);

    console.log("parsedobject", filterObj);

    if (Object.keys(filterObj).length === 0) {
      console.log("The object is empty");
    } else {
      for (let key in filterObj) {
        const value = filterObj[key];
        if (typeof value === "object") {
          // If the value is an object, iterate over its keys and parse its values
          for (let subkey in value) {
            const subvalue = value[subkey];
            if (!isNaN(subvalue)) {
              // If the subvalue is a number string, parse it to a number
              value[subkey] = parseInt(subvalue);
            } else if (subvalue === "true" || subvalue === "false") {
              // If the subvalue is a boolean string, parse it to a boolean
              value[subkey] = JSON.parse(subvalue);
            }
          }
        } else if (!isNaN(value)) {
          // If the value is a number string, parse it to a number
          filterObj[key] = parseInt(value);
        } else if (value === "true" || value === "false") {
          // If the value is a boolean string, parse it to a boolean
          filterObj[key] = JSON.parse(value);
        }
      }

      console.log("parsed", filterObj);
      this.aggregateArray.unshift({ $match: filterObj });
      console.log("aggerefcfvvcgsvv", this.aggregateArray);
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.aggregateArray.push({ $sort: sortBy });
    }
    return this;
  }

  // search() {
  //   if (this.queryString.keyword) {
  //     const searchFields = Object.keys(this.model.schema.paths)
  //       .filter((path) => this.model.schema.paths[path].instance === "String")
  //       .map((path) => ({
  //         [path]: { $regex: this.queryString.keyword, $options: "i" },
  //       }));
  //     const searchQuery = { $or: searchFields };
  //     this.aggregateArray.unshift({ $match: searchQuery });
  //   }
  //   return this;
  // }

  search() {
    console.log("search");
    if (this.queryString.keyword) {
      const searchQuery = {
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
          { firstName: { $regex: this.queryString.keyword, $options: "i" } },
          { lastName: { $regex: this.queryString.keyword, $options: "i" } },
          {
            "address.country": {
              $regex: this.queryString.keyword,
              $options: "i",
            },
          },
          {
            "address.city": { $regex: this.queryString.keyword, $options: "i" },
          },
        ],
      };

      this.aggregateArray.unshift({ $match: searchQuery });
      console.log("aggerefcfvvcgsvv search", this.aggregateArray);
    }
    return this;
  }

  fields() {
    console.log("fields");
    if (this.queryString.fields) {
      let fields = this.queryString.fields.replace(/,/g, " ");

      const projectStage = {
        $project: {},
      };
      fields.split(" ").forEach((field) => {
        projectStage.$project[field] = 1;
      });
      projectStage.$project["reviews"] = 0;

      this.aggregateArray.push(projectStage);
      console.log("aggerefcfvvcgsvv ", this.aggregateArray);
    }
    return this;
  }
};
