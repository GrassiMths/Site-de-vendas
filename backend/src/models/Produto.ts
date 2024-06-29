import mongoose from "mongoose"

const produtoSchema = new mongoose.Schema({
  nome: {
    required: true,
    type: String,
  },
  valor: {
    required: true,
    type: Number,
  },
  descricao: {
    required: true,
    type: String,
  },
  categoriaId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Categoria"
  }
})

export const ProdutoModel = mongoose.model("Produto", produtoSchema)
