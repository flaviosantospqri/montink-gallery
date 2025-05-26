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
      name: "Tênis Air Honda",
      price: 100.0,
      description: "This is a mock product for testing purposes.",
      listImage: [
        "https://i.imgur.com/4R5bHuf.jpeg",
        "https://i.imgur.com/D55o9Tw.jpeg",
        "https://i.imgur.com/XroFvXF.jpeg",
      ],
    };
  },
};

export default Api;
