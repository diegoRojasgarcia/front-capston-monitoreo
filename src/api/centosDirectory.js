import { ENV } from "@/utils";

export class centosDirectory {
  async getLabs() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.LABORATORIOSDB}`;
      const params = {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.laboratorios;
    } catch (error) {
      throw error;
    }
  }

  async getProgramaciones() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.PROGRAMACIONES}`;
      const params = {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.programaciones;
    } catch (error) {
      throw error;
    }
  }

  async getLaboratorios() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.LABORATORIOS}`;
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

  async updateLaboratorio(item) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.UPTDATELAB}`;
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id, displayName: item.displayName }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.laboratorio;
    } catch (error) {
      throw error;
    }
  }

  async updateProgramacion(item) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.UPDATEPROGRAMACION}`;
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          actividad: item.actividad,
          fecha: item.fecha,
          horainicio: item.horainicio,
          horafin: item.horafin,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.programacion;
    } catch (error) {
      throw error;
    }
  }

  async getLabsMonitoring() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.LABSMONITORING}`;
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

  async getDates(lab) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.DATES}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lab: lab }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result.folders;
    } catch (error) {
      throw error;
    }
  }

  async getActividades(lab, fecha) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.ACTIVIDADES}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lab: lab, fecha: fecha }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result.folders;
    } catch (error) {
      throw error;
    }
  }

  async getLastActividad(lab, fecha) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.LASTACTIVIDAD}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lab: lab, fecha: fecha }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result.folders;
    } catch (error) {
      throw error;
    }
  }

  async getPcs(lab, fecha, actividad) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.PCS}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lab: lab, fecha: fecha, actividad: actividad }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result.folders;
    } catch (error) {
      throw error;
    }
  }

  async createFile(payload) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.LABS}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createFiles(payload) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.WRITEFILES}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createFileProg(payload) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.PROG}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 201) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(lab) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.LABS}`;
      const params = {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lab),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.folders;
    } catch (error) {
      throw error;
    }
  }

  async deleteProgramacion(item) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.DELETEPROGRAMACION}`;
      const params = {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id }),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result.programacion;
    } catch (error) {
      throw error;
    }
  }

  async existFile(lab) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.VALIDATE}`;
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

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createProgramacion(item) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.CREATEPROGRAMACION}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createA(item) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.CREATEA}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createW(item) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LABS.CREATEW}`;
      const params = {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
