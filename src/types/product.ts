export interface Product {
  id: number;
  nome: string;
  preco: number;
  informacao: string;
  listImage: string[];
  variantes: {
    tamanhos: string[];
    cores: string[];
  };
}
