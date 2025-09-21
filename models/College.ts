import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICollege extends Document {
  name: string;
  district: string;
  main_city: string;
  type: string; // e.g. "government"
  courses_available: string[];
  category: string; // e.g. "degree_college"
  cd_score: string; // e.g. "₹ 12,440MA- 1st Year Fees"
  course_fees: string; // e.g. "--"
  placement: {
    average_package: string;
    highest_package: string;
    placement_percent: string;
  };
  user_reviews: string; // e.g. "3.8 / 5 ..."
  ranking: string; // e.g. "#39th/50 in India 2025"
}

const CollegeSchema = new Schema<ICollege>(
  {
    name: { type: String, required: true },
    district: { type: String, required: true },
    main_city: { type: String, required: true },
    type: { type: String, required: true },
    courses_available: { type: [String], required: true },
    category: { type: String, required: true },
    cd_score: { type: String, required: true },
    course_fees: { type: String, required: true },
    placement: {
      average_package: { type: String, required: true },
      highest_package: { type: String, required: true },
      placement_percent: { type: String, required: true },
    },
    user_reviews: { type: String, required: true },
    ranking: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent recompilation on hot reload
// Ensure hot-reload doesn't reuse an old schema
if (mongoose.models.College) {
  // Available since Mongoose v6.8+: deleteModel; fallback to delete from models map
  // @ts-ignore
  if (typeof mongoose.deleteModel === "function") {
    // @ts-ignore
    mongoose.deleteModel("College");
  } else {
    // @ts-ignore
    delete mongoose.models.College;
  }
}

const CollegeModel: Model<ICollege> = mongoose.model<ICollege>(
  "College",
  CollegeSchema
);

export default CollegeModel;
