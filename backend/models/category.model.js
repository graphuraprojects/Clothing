import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      trim: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    collection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true
    },

    gender: {
      type: String,
      enum: ["boys", "girls", null],
      default: null
    }
  },
  { timestamps: true }
);

/* compound unique index */
categorySchema.index(
  { name: 1, collection: 1, gender: 1, isActive: 1 },
  { unique: true }
);

/* optional: slug unique per collection/gender */
categorySchema.index(
  { slug: 1, collection: 1, gender: 1 },
  { unique: true }
);

export default mongoose.model("Category", categorySchema);