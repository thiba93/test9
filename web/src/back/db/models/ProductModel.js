import BaseModel from "@/db/models/BaseModel"
import CategoryModel from "@/db/models/CategoryModel"
import UserModel from "@/db/models/UserModel"

class ProductModel extends BaseModel {
  static tableName = "itemcatalog"
  static get relationMappings() {
    return {
      category: {
        modelClass: CategoryModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "itemcatalog.categoryId",
          to: "categories.id",
        },
      },
      user: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "itemcatalog.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default ProductModel
