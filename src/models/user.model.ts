import mongoose from "mongoose";

const Schema = mongoose.Schema


interface UserAttrs {
    fullname: string;
    email: string;
    phone: string;
    password: string;
}


interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}


export interface UserDoc extends mongoose.Document {
    fullname: string;
    email: string;
    phone: string;
    password: string
}


const userSchema = new Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'user',
        enum : ['user', 'admin']
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
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

export { User };