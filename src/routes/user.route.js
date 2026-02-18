import { Router } from "express";
import {
    loginUser,
    registerUser,
} from "../controller/userController.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { roleAuthorize } from "../middleware/roleAuthorize.js";
import { setAvailability } from "../controller/professorController.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/professor/availability").post(verifyJWT,roleAuthorize("professor"),setAvailability)

export default router