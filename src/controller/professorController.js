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


export {
    setAvailability,
}