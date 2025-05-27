import { create } from "zustand";

export interface Tamanho {
  tamanho: string;
  quantidade: number;
}

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  informacao: string;
  listImage: string[];
  variantes: {
    tamanhos: Tamanho[];
    cores: string[];
  };
}

interface ProdutoState extends Produto {
  selectedSize: Tamanho | null;
  selectedColor: string;
  listImage: string[];
  variantes: {
    tamanhos: Tamanho[];
    cores: string[];
  };
  mainImage: string;
  setProduto: (produto: Produto) => void;
  setSelectedSize: (size: Tamanho) => void;
  setSelectedColor: (color: string) => void;
  setMainImage: (image: string) => void;
  reset: () => void;
}

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
