import  express  from "express";
import prefController from "../controllers/prefController.js"

//router object
const router = express.Router();


router.post("/",prefController)

export default router
