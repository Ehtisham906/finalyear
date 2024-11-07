import express from "express";

import { registerBlood } from "../controllers/register.controller.js";


const router = express.Router();

router.post('/send-register-email', registerBlood);

export default router;