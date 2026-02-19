import { Router } from "express";
import {
    loginUser,
    registerUser,
} from "../controller/userController.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { roleAuthorize } from "../middleware/roleAuthorize.js";
import {
    deleteAvailability,
    setAvailability,
    updateAvailability
} from "../controller/professorController.js";
import { bookAppointment } from "../controller/studentController.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/availability").post(verifyJWT, roleAuthorize("professor"), setAvailability)

router.route("/appointment").post(verifyJWT, roleAuthorize("student"), bookAppointment)

router.route("/availability/:id").patch(verifyJWT, roleAuthorize("professor"), updateAvailability)

router.route("/availability/:id").delete(verifyJWT, roleAuthorize("professor"), deleteAvailability)

export default router