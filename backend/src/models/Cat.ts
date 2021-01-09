import { create } from "domain";
import { createSchema, Type, typedModel } from "ts-mongoose";

//const Cat = mongoose.model("Cat", { name: String });

const CatSchema = createSchema({
  name: Type.string(),
});

const Cat = typedModel("Cat", CatSchema);

export = Cat;
