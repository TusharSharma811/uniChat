import { Router} from "express";
import { deleteUserAccount, getUserProfile } from "../controllers/user.controller.ts";
import { updateUserProfile } from "../controllers/user.controller.ts";
import { verifyJWT } from "../middleware/verifyJWT.ts";
const userRouter = Router();

userRouter.get("/:id", verifyJWT, getUserProfile);
userRouter.put("/:id", verifyJWT, updateUserProfile);
userRouter.delete("/:id", verifyJWT, deleteUserAccount);

export default userRouter;
