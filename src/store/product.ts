import { create } from "zustand";
import type { ProdutoState, Tamanho } from "../types";
const getDefaultSize = (tamanhos: Tamanho[]): Tamanho | null => {
  return tamanhos.find((size) => size.quantidade > 0) ?? null;
};

const useProductStore = create<ProdutoState>((set) => ({
  id: 0,
  nome: "",
  preco: 0,
  informacao: "",
  listImage: [],
  variantes: {
    tamanhos: [],
    cores: [],
  },
  selectedSize: null,
  selectedColor: "",
  mainImage: "",
  setProduto: (produto) => {
    set({
      ...produto,
      selectedSize: getDefaultSize(produto.variantes.tamanhos),
      selectedColor: produto.variantes.cores[0] ?? "",
      mainImage: produto.listImage[0] ?? "",
    });
  },
  setSelectedSize: (size) => set({ selectedSize: size }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  setMainImage: (image) => set({ mainImage: image }),
  reset: () =>
    set({
      id: 0,
      nome: "",
      preco: 0,
      informacao: "",
      listImage: [],
      variantes: {
        tamanhos: [],
        cores: [],
      },
      selectedSize: null,
      selectedColor: "",
      mainImage: "",
    }),
}));

export default useProductStore;
