import mongoose, { Schema } from "mongoose";

const availabilitySchema = new mongoose.Schema({
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true,

    },
    starting_time: {
        type: String,
        required: true,
    },
    ending_time: {
        type: String,
        required: true,
    },
    isbooked: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Availability = mongoose.model("Availability", availabilitySchema)


export default Availability