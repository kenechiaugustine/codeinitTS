import mongoose from "mongoose";

const Schema = mongoose.Schema


interface UserAttrs {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}


interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}


export interface UserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string
}


const userSchema = new Schema({

    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});




//




userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}


const User = mongoose.model<UserDoc, UserModel>("User", userSchema);


export { User }
