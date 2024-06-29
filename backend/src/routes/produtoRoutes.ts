import express, { Request, Response } from "express"
import ProdutoController from "../controllers/ProdutoController"

const router = express.Router()
const controller = new ProdutoController()

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body)

  return res.status(200).send(response)
})

router.get("/getAll", async (req: Request, res: Response) => {
    const response = await controller.all()
  
    return res.status(response.error ? 400 : 200).send(response)
  })

  router.get("/buscaValor", async (req: Request, res: Response) => {
    const minValor = req.query.minValor ? Number(req.query.minValor) : undefined;
    const maxValor = req.query.maxValor ? Number(req.query.maxValor) : undefined;
  
    const response = await controller.getByValor(minValor, maxValor);
    return res.status(response.error ? 400 : 200).send(response);
  });

  router.get("/getByCategoria/:categoriaId", async (req: Request, res: Response) => {
    const { categoriaId } = req.params;
  
    const response = await controller.getByCategoria(categoriaId);
    return res.status(response.error ? 400 : 200).send(response);
  });

  router.delete("/deleteAll", async (req: Request, res: Response) => {
    const response = await controller.deleteAll()
  
    return res.status(response.error ? 400 : 200).send(response)
  })

  router.get("/getByCategoriaAndValor", async (req: Request, res: Response) => {
    const { categoriaId } = req.query;
    const minValor = req.query.minValor ? Number(req.query.minValor) : undefined;
    const maxValor = req.query.maxValor ? Number(req.query.maxValor) : undefined;
  
    const response = await controller.getByCategoriaAndValor(categoriaId as string, minValor, maxValor);
    return res.status(response.error ? 400 : 200).send(response);
  });

  router.patch("/update/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await controller.update(id, req.body);
    return res.status(response.error ? 400 : 200).send(response);
  });


export default router
