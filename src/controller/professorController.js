import Availability from "../model/availability.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// set availability for professor

const setAvailability = asyncHandler(async (req, res) => {
    const { date, starting_time, ending_time } = req.body

    if (!date) {
        throw new ApiError(400, "date field are required");
    }
    if ([starting_time, ending_time].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "all fields are required");
    }

    const newSloat = await Availability.create({
        professor: req.user._id,
        date,
        starting_time,
        ending_time
    })

    if (!newSloat) {
        throw new ApiError(500, "setSlot not created")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "new sloat created successfully ", newSloat))
})

// update available sloat
const updateAvailability = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { date, starting_time, ending_time } = req.body

    if (!id) {
        throw new ApiError(400, "Sloat Id field are required");
    }

    if (!date) {
        throw new ApiError(400, "date field are required");
    }
    if ([starting_time, ending_time].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "all fields are required");
    }

    // check sloat id and ownership
    const updateSloat = await Availability.findByIdAndUpdate({ _id: id, professorId: req.user._id }, {
        professor: req.user._id,
        date,
        starting_time,
        ending_time
    }, {
        new: true,           // updated document return karega
        runValidators: true  // schema validation run karega
    })

    if (!updateSloat) {
        throw new ApiError(500, "setSlot not created")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "sloat Updated successfully ", updateSloat))
})

const deleteAvailability = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Sloat Id field are required");
    }

    const destroyAvailabilitySlot = await Availability.findByIdAndDelete({ _id: id, professorId: req.user._id })

    if (!destroyAvailabilitySlot) {
        throw new ApiError(500, "destroy operation not successfull")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "destroy operation successfull", destroyAvailabilitySlot))

})
const getMyAppointments = asyncHandler(async (req, res) => {

})

const updateAppointmentStatus = asyncHandler(async (req, res) => {

})

export {
    setAvailability,
    updateAvailability,
    deleteAvailability,
    getMyAppointments,
    updateAppointmentStatus
}