import express, { Request, Response } from "express"
import CategoriaController from "../controllers/CategoriaController"

const router = express.Router()
const controller = new CategoriaController()

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body)

  return res.status(200).send(response)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const response = await controller.delete(req.params.id)
  
    return res.status(response.error ? 400 : 200).send(response)
  })

  router.get("/getAll", async (req: Request, res: Response) => {
    const response = await controller.all()
  
    return res.status(response.error ? 400 : 200).send(response)
  })

export default router
