import { ApiError } from "../utils/apiError.js";


export const roleAuthorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            throw new ApiError(403, "Access denied")
        }
        next()
    }
}