import { Document, model, models, Schema } from "mongoose";

export interface iInteraction extends Document {
  action: string;
  user: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  createdAt: Date;
  answer: Schema.Types.ObjectId;
  tags: Schema.Types.ObjectId[];
}

const InteractionSchema = new Schema({
  action: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  createdAt: { type: Date, default: Date.now },
});

const Interaction =
  models.Interaction || model<iInteraction>("Interaction", InteractionSchema);

export default Interaction;
