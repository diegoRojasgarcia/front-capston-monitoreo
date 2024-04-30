import { ENV } from "@/utils";

export class User {
  async GetUser(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER.GETUSER}/${data}`;
      const params = {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
