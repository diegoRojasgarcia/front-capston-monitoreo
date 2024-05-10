import { ENV } from "@/utils";

export class centosDirectory {
  async getLabs() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.LABS}`;
      const params = {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.folders;
    } catch (error) {
      throw error;
    }
  }

  async createFile(lab) {
    try {
      console.log("creando archivo en el lab: ", lab);
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.LABS}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lab),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result.folders;
    } catch (error) {
      throw error;
    }
  }
}
