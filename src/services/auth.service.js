import axios from "axios";

const API_URL = process.env.VUE_APP_HERMES;
class AuthService {
  async login(user) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username: user.email,
        password: user.password,
      });

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));

        return response.data;
      }
    } catch (error) {
      console.error(`Error al iniciar sesión: ${error.message}`);
    }
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
