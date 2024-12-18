import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        bloodType: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_640.png"
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema)

export default User;