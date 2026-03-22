const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    collectionRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
    gender: {
      type: String,
      enum: ["boys", "girls", null],
      default: null,
    },
  },
  { timestamps: true },
);

/* ✅ COMPOUND UNIQUE INDEX */
categorySchema.index(
  { name: 1, collectionRef: 1, gender: 1 },
  { unique: true },
);
