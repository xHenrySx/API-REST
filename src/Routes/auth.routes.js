import { Router } from "express";
import * as authCtrl from "../Controllers/auth.controller.js";
import { verifySignUp, verifySignIn, verifyDuplicated} from "../Middlewares/verify.js";
const authrouter = Router();

authrouter
.post('/signup',
[verifySignUp, verifyDuplicated],
authCtrl.signup)

.post('/signin',
verifySignIn,
authCtrl.signin)

export default authrouter;