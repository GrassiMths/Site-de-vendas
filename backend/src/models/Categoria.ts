import mongoose from "mongoose"

const categoriaSchema = new mongoose.Schema({
  nome: {
    required: true,
    type: String,
  },
  categoriaId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Categoria"
  }
})

export const CategoriaModel = mongoose.model("Categoria", categoriaSchema)
