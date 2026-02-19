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
    updateAppointmentStatus,
    updateAvailability
} from "../controller/professorController.js";
import {
    bookAppointment,
    getAllProfessor,
    getMyAppointemt,
    getProfessorAvailability,
    
} from "../controller/studentController.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/availability").post(verifyJWT, roleAuthorize("professor"), setAvailability)

router.route("/availability/:id").patch(verifyJWT, roleAuthorize("professor"), updateAvailability)

router.route("/availability/:id").delete(verifyJWT, roleAuthorize("professor"), deleteAvailability)

router.route("/appointment/:id").patch(verifyJWT, roleAuthorize("professor"), updateAppointmentStatus)


// student routes
router.route("/student/appointment").post(verifyJWT, roleAuthorize("student"), bookAppointment)

router.route("/student/appointment").get(verifyJWT, roleAuthorize("student"), getMyAppointemt)

router.route("/professor").get(verifyJWT, roleAuthorize("student"), getAllProfessor)

router.route("/availability/:id").get(verifyJWT, roleAuthorize("student"), getProfessorAvailability)

export default router