import Appointment from "../model/appointment.js";
import Availability from "../model/availability.js";
import User from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const bookAppointment = asyncHandler(async (req, res) => {
    const { availabiltyID } = req.body

    console.log("id is:", availabiltyID)

    if (!availabiltyID) {
        throw new ApiError(400, "ID fields required")
    }

    const sloat = await Availability.findById(availabiltyID)

    if (!sloat) {
        throw new ApiError(400, "Sloat Not Found !")
    }
    // if booked sloat
    if (sloat.isbooked) {
        throw new ApiError(400, "Sloat Already Booked !")
    }

    const newAppointment = await Appointment.create({
        student: req.user._id,
        professor: sloat.professor,
        availability: sloat._id,
    })

    // 4️⃣ Mark slot as booked
    sloat.isbooked = true;
    await sloat.save();

    if (!newAppointment) {
        throw new ApiError(500, "newAppoint not created")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Appointment created successfully"))
})

const getAllProfessor = asyncHandler(async (req, res) => {
    const allProfessor = await User.find({role:"professor"})

    if (!allProfessor) {
        throw new ApiError(500, "All Professor are not Show !")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "All Professor show successfully", allProfessor))

})
const getProfessorAvailability = asyncHandler(async (req, res) => {
    const {id} = req.params

    if (!id) {
        throw new ApiError(400, "ID fields required")
    }

    const professorAvailability = await Availability.find({professor:id})

    if(!professorAvailability){
        throw new ApiError(500, "Professor Availability are not Show !")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Professor Availability show successfully", professorAvailability))
})

const getMyAppointemt = asyncHandler(async (req, res) => {
    const allAppointment = await Appointment.find({ student: req.user._id })

    if (!allAppointment) {
        throw new ApiError(500, "All Appointment are not found !")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "All Appointment show successfully", allAppointment))
})

export {
    bookAppointment,
    getProfessorAvailability,
    getAllProfessor,
    getMyAppointemt
}