import { Router } from "express";
import * as userCtrl from "../Controllers/user.controller.js";
import { verifyToken, isAdmin, isModerator, verifyRoles, verifyDuplicated} from "../Middlewares/verify.js";
const userRouter = Router();

userRouter

.post("/",
[verifyToken, isAdmin, verifyRoles, verifyDuplicated],
userCtrl.createUser)

.get("/", 
[verifyToken, isModerator],
userCtrl.getUsers)

.get("/:userId", 
[verifyToken, isModerator], 
userCtrl.getUserById)

.put("/:userId", 
[verifyToken, isAdmin, verifyRoles, verifyDuplicated], 
userCtrl.updateUserById)

.patch("/:userId", 
[verifyToken, isAdmin, verifyRoles, verifyDuplicated], 
userCtrl.updateUserPartiallyById)

.delete("/:userId", 
[verifyToken, isAdmin], 
userCtrl.deleteUserById);


export default userRouter;