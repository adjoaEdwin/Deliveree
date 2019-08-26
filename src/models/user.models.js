import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["distributor", "admin"],
      default: "distributor",
      required: true
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;

    next();
  });
});

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      return resolve(same);
    });
  });
};

userSchema.virtual("fullname").get(function() {
  return this.first_name + " " + this.last_name;
});

export const User = mongoose.model("user", userSchema);
