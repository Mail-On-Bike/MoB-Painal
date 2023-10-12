import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = import.meta.env.VITE_HERMES;
class AuthService {
  async login(user) {
    try {
      const response = await axios.post(`${API_URL}/login-cliente`, {
        email: user.email,
        password: user.password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("user_mob_painal", JSON.stringify(response.data));

        return response.data;
      }
    } catch (error) {
      console.error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  logout() {
    localStorage.removeItem("user_mob_painal");
  }

  async changePassword(id, data) {
    try {
      const response = await axios.post(
        `${API_URL}/change-password/${id}`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        { headers: authHeader() }
      );

      return response;
    } catch (error) {
      console.error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  async updateProfileUser(id, data) {
    try {
      console.log(id);
      console.log(data);
      const response = await axios.put(
        `${API_URL}/update-user-cliente/${id}`,
        {
          contacto: data.contacto,
          username: data.username,
          email: data.email,
          telefono: data.telefono,
          clienteId: data.clienteId,
        },
        { headers: authHeader() }
      );

      if (response.data.accessToken) {
        localStorage.setItem("user_mob_painal", JSON.stringify(response.data));

        return response.data;
      }
    } catch (error) {
      console.error(`Error al iniciar sesión: ${error.message}`);
    }
  }
}

export default new AuthService();
