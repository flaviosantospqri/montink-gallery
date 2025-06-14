export interface ApiError {
  error: true;
  message: string;
}

export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
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
