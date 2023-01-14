import { Router } from "express";
import * as authCtrl from "../Controllers/auth.controller.js";
const authrouter = Router();

authrouter
.post('/signup', authCtrl.signup)
.post('/signin', authCtrl.signin)

export default authrouter;