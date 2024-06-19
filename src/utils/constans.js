export const ENV = {
  SERVER_HOST: "",
  API_URL: "http://localhost:4000",
  API_LV: "http://localhost:8000",
  ENDPOINTS: {
    AUTH: {
      REGISTER: "auth/register",
      LOGIN: "auth/login",
    },
    USER: {
      GETUSER: "auth/user",
    },
    LABS: {
      LABS: "labs/",
      LABORATORIOS: "labs/laboratorios",
      LABSMONITORING: "labs/labsmonitoring",
      WRITEFILES: "labs/writeTofiles",
      DATES: "labs/dates",
      ACTIVIDADES: "labs/actividades",
      PCS: "labs/pcs",
      VALIDATE: "labs/existFile",
      PROG: "labs/prog",
    },
  },
  TOKEN: "token",
};
