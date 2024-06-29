import { Body, Delete, Post, Route, Get, Query, Path, Patch } from "tsoa"
import { ProdutoModel } from "../models/Produto"
import { JsonObject } from "swagger-ui-express"
import mongoose from "mongoose"

@Route("api/produto")
export default class ProdutoController {
    @Post("/create")
    public async create(@Body() body: { nome: string, valor: number, descricao: string, categoriaId: string }): Promise<JsonObject> {
        const data = new ProdutoModel({
          nome: body.nome, 
          valor: body.valor, 
          descricao: body.descricao, 
          categoriaId: body.categoriaId
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
          const data = await ProdutoModel.find().populate({
            path: 'categoriaId', select: 'nome -_id'
          })
          return data
        } catch (error: any) {
          return {
            error: error.message,
          }
        }
      }

      @Get("/buscaValor")
      public async getByValor(
        @Query() minValor?: number, 
        @Query() maxValor?: number
      ): Promise<JsonObject> {
        try {
          const query: any = {};
    
          if (minValor !== undefined) {
            query.valor = { $gte: minValor };
          }
    
          if (maxValor !== undefined) {
            if (!query.valor) {
              query.valor = {};
            }
            query.valor.$lte = maxValor;
          }
    
          const data = await ProdutoModel.find(query).select("nome valor -_id");
          return data;
        } catch (error: any) {
          return {
            error: error.message,
          };
        }
      }

      @Get("/getByCategoria/:categoriaId")
      public async getByCategoria(@Path() categoriaId: string): Promise<JsonObject> {
        try {
          const data = await ProdutoModel.find({ categoriaId }).select("nome valor descricao -_id");
          return data;
        } catch (error: any) {
          return {
            error: error.message,
          };
        }
      }

      @Get("/getByCategoriaAndValor")
      public async getByCategoriaAndValor(
        @Query() categoriaId: string,
        @Query() minValor?: number, 
        @Query() maxValor?: number
      ): Promise<JsonObject> {
        try {
          const query: any = { categoriaId };
    
          if (minValor !== undefined) {
            query.valor = { $gte: minValor };
          }
    
          if (maxValor !== undefined) {
            if (!query.valor) {
              query.valor = {};
            }
            query.valor.$lte = maxValor;
          }
    
          const data = await ProdutoModel.find(query).populate({
            path: 'categoriaId',
            select: 'nome -_id'
          }).select("nome valor descricao categoriaId -_id");
          return data;
        } catch (error: any) {
          return {
            error: error.message,
          };
        }
      }


      @Patch("/update/:id")
      public async update(@Path() id: string, @Body() body: { nome?: string, valor?: number, descricao?: string, categoriaId?: string }): Promise<JsonObject> {
        try {
          const updatedData = await ProdutoModel.findByIdAndUpdate(id, body, { new: true }).populate({
            path: 'categoriaId',
            select: 'nome -_id'
          }).select("nome valor descricao categoriaId -_id");
    
          if (!updatedData) {
            return {}; // Retorna um objeto vazio se não encontrar o produto
          }
    
          return updatedData;
        } catch (error: any) {
          return { error: error.message };
        }
      }


      @Delete("/deleteAll")
      public async deleteAll(): Promise<JsonObject> {
        try {
          await ProdutoModel.deleteMany({});
          return { message: "Todos os produtos foram deletados com sucesso." };
        } catch (error: any) {
          return { error: error.message };
        }
      }

}