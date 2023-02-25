import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const Schema = mongoose.Schema;

interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  correctPassword: any;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Your First-Name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Your Last-Name is required'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'Invalid email'],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: null,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    password: {
      type: String,
      default: null,
      required: [true, 'Password is required'],
      minlength: 4,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    collection: 'Users',
  }
);

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = `${Date.now() - 1000}`;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('Users', userSchema);

export { User };
