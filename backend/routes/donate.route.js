import express from "express";

import { donateBlood } from "../controllers/donate.controller.js";


const router = express.Router();

router.post('/send-donation-email', donateBlood);

export default router;