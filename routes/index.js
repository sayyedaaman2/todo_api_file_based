import {Router} from 'express'
import apiRoutes from './api/index.js'
const router = Router();

router.get("/",(req,res)=>{
    res.status(200).send({
        success : true,
        message : "Testing API..."
    })
})
router.use("/api",apiRoutes)
export default router