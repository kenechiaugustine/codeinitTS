import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema


interface UserAttrs {
    name: string;
    email: string;
    password: string;
}


interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}


export interface UserDoc extends mongoose.Document {
    name: string;
    email: string;
    password: string
}


const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        default: null
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user',
        enum : ['user', 'admin'],
    },
    password: {
        type: String,
        default: null,
        required: true,
        minlength: 4,
        select: false
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true,
    collection: 'Users'
});



userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    next();
  });


  
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
})




userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}


const User = mongoose.model<UserDoc, UserModel>("Users", userSchema);

export { User };