import mongoose, { Schema } from "mongoose";

const appointmentSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
   
    availability: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Availability",
        required: true,
     },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }
    
}, { timestamps: true })

const Appointment = mongoose.model("Appointment", appointmentSchema)


export default Appointment