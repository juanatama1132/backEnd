import ProductModel from "../models/product.model.js";
class ProductMannager {
  constructor() {
    this.products = [];
  }

  addProduct = async (params) => {
    const { title, description, code, price, stock, category, thumbnails } =
      params;
    return await ProductModel.create({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    });
  };

  delProduct = async (id) => {
    return await ProductModel.updateOne({ _id: id }, { status: false });
  };

  modProduct = async (id, code, description, stock) => {
    // const{ code, description, stock}=params
    return await ProductModel.updateOne(
      { _id: id },
      { description, stock, status: true }
    );
  };

  getProducts = async (params) => {
    let { limit, page, query, sort } = params;
    // console.log(params);
    limit = !limit ? 10 : limit;
    page = !page ? 1 : page;
    query = !query ? "status:true" : "status:true," + query;
    sort = !sort ? "" : sort;
    try {
      const res = await ProductModel.paginate(
        { query },
        { limit: limit, page: page, sort: { sort }, lean: true }
      );
      return res;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  getProductById = async (id) => {
    return await ProductModel.find({ _id: id }).lean();
  };
  getProductByCode = async (code) => {
    return await ProductModel.find({ code: code }).lean();
  };
}

const PM = new ProductMannager();
export default PM;