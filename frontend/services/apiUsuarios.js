import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API || "http://localhost:8080/usuarios",
  withCredentials: true,
  timeout: 10000,
});

export const userService = {
  cadastrar: async (userData) => {
    try {
      const response = await api.post("/cadastrarvendedor", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Erro ao cadastrar usuário");
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post(
        "/login",
        {
          usuario: credentials.usuario,
          senha: credentials.senha,
          rememberMe: credentials.rememberMe || false,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error("Erro ao fazer login");
    }
  },

  async getUsuarioLogado() {
    try {
      const response = await api.get("/usuarioLogado");
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar usuário: ",
        error.response?.data || error.message
      );

      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }

      throw error;
    }
  },

  logout: async () => {
    try {
      await api.get("/logout");
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    }
  },

  updateUsuario: async (userData) => {
    try {
      const response = await api.put("/updateUser", userData);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao atualizar usuário: ",
        error.response?.data || error
      );
      throw error.response?.data || new Error("Erro ao atualizar usuário");
    }
  },

  getAllUsers: async () => {
    try {
      const response = await api.get("/listauser");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário: ", error);
      throw error.response?.data || new Error("Erro ao buscar usuário");
    }
  },

  updateUserCargo: async (userData) => {
    try {
      const response = await api.put("/usuarioporcargo/:cargo", userData);

      return response.data;
    } catch (error) {
      console.error("Full error in updateUserCargo: ", {
        error: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      throw (
        error.response?.data || new Error("Erro ao atualizar cargo do usuário")
      );
    }
  },

  deleteUser: async () => {
    try {
      const response = await api.delete("/deletarusuario/:iduser");
      return response;
    } catch (error) {
      console.error("Erro ao excluir conta: ", error);
      throw error;
    }
  },
};
