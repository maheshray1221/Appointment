import Appointment from "../model/appointment.js";
import Availability from "../model/availability.js";
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

const getProfessorAvailability = asyncHandler(async (req, res) => {

})

const getMyAppointemts = asyncHandler(async (req, res) => {

})

export {
    bookAppointment,
    getProfessorAvailability,
    getMyAppointemts
}