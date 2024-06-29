import { Body, Delete, Post, Route, Get } from "tsoa"
import { CategoriaModel } from "../models/Categoria"
import { JsonObject } from "swagger-ui-express"

@Route("api/categoria")
export default class CategoriaController {
    @Post("/create")
    public async create(@Body() body: { nome: string }): Promise<JsonObject> {
        const data = new CategoriaModel({
          nome: body.nome,
        })

        try {
          return data.save()
        } catch (error) {
          return { error }
        }
      }

      @Get("/getAll")
      public async all(): Promise<JsonObject> {
        try {
          const data = await CategoriaModel.find()
          return data
        } catch (error: any) {
          return {
            error: error.message,
          }
        }
      }

      @Delete("/delete/:id")
      public async delete(id: string): Promise<JsonObject> {
        try {
          const data = await CategoriaModel.findByIdAndDelete(id)
          return { data: data }
        } catch (error: any) {
          return {
            error: error.message,
          }
        }
      }     



}
