import { model, models, Schema } from "mongoose";

export interface iTag {
  name: string;
  description: string;
  createdAt: Date;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Tag = models.Tag || model<iTag>("Tag", TagSchema);
export default Tag;
