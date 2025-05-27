/* This JavaScript code snippet defines an object named `Api` that contains two methods: */
const API_BASE_URL = "https://viacep.com.br/ws";
const Api = {
  getAddress: async (cep: string) => {
    try {
      let response;
      try {
        response = await fetch(`${API_BASE_URL}/${cep}/json/`);
      } catch (networkError) {
        console.error("Network error occurred:", networkError);
        return {
          error: true,
          message:
            "Network error: Unable to fetch address. Please check your connection.",
        };
      }
      if (!response.ok) {
        return {
          error: true,
          message: `Error ${response.status}: ${response.statusText}`,
        };
      }
      return await response.json();
    } catch (error: unknown) {
      console.error("Failed to fetch address:", error);
      return {
        error: true,
        message:
          (error instanceof Error && error.message) ||
          "An error occurred while fetching the address.",
      };
    }
  },

  getProductMock: () => {
    return {
      id: 1,
      nome: "Tênis Air Honda",
      preco: 100.0,
      informacao: "Tênis confortável, ideal para corridas e caminhadas.",
      listImage: [
        "https://i.imgur.com/4R5bHuf.jpeg",
        "https://i.imgur.com/D55o9Tw.jpeg",
        "https://i.imgur.com/XroFvXF.jpeg",
      ],
      variantes: {
        tamanhos: [
          { tamanho: "38", quantidade: 3 },
          { tamanho: "39", quantidade: 0 },
          { tamanho: "40", quantidade: 7 },
          { tamanho: "41", quantidade: 5 },
          { tamanho: "42", quantidade: 10 },
        ],
        cores: ["Preto", "Branco", "Vermelho"],
      },
      estoque: 25,
      categoria: "Calçados",
    };
  },
};

export default Api;
