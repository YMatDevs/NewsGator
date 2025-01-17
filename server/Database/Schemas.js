import mongoose from "mongoose";
import bcrypt from 'bcrypt';

//*******************Article******************** */

const articleSchema = mongoose.Schema({

  img: { type: String },
  caption: { type: String, require: true},
  url: { type: String, require: true},
});
//********************************************** */



//*******************User******************** */

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    preferences: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password for login
userSchema.methods.isPasswordValid = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model("User", userSchema);
const Article = mongoose.model('Article', articleSchema);

export { Article, User };