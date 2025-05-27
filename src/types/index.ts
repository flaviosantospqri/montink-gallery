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

export interface ProdutoState extends Produto {
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
