import BaseModel from "@/db/models/BaseModel"
import ProductModel from "@/db/models/ProductModel"

class CategoryModel extends BaseModel {
  static tableName = "categorygroup"
  static get relationMappings() {
    return {
      products: {
        modelClass: ProductModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "categorygroup.categoryID",
          to: "itemcatalog.catalogID",
        },
      },
    }
  }
}

export default CategoryModel
