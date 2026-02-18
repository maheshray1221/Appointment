import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: [3, "Name must be minimum 6 character"],
            maxlength: [25, "Name must be with in 25 character"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [5, "Email must be minimum 6 character"],
            maxlength: [40, "Email must be with in 25 character"],
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: [6, "Password must be minimum 6 character"],
            maxlength: [25, "Password must be with in 25 character"],
        },
        role: {
            type: String,
            enum: ["student", "professor"],
            required: true
        },
        refreshToken: {
            type: String,
        }

    }, { timestamps: true })

// convert password in hash form
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)

})

// coustom method for check password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            //payload
            _id: this.id,
            name: this.name,
            email: this.email
        },
        // secret
        process.env.ACCESS_TOKEN_SECRET,
        {
            // expire
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        }
    )
}

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            //payload
            _id: this.id,

        },
        // secret
        process.env.REFRESH_TOKEN_SECRET,
        {
            // expire
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
        }
    )
}

const User = mongoose.model("User", userSchema)

export default User