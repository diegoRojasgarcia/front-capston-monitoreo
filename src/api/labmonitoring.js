export class LabMonitoring {
  setLabMonitoring(lab) {
    localStorage.setItem("Labmonitoring", lab);
  }

  getLabMonitoring() {
    return localStorage.getItem("Labmonitoring");
  }

  removeLabMonitoring() {
    localStorage.setItem("Labmonitoring", null);
  }

  setIsMonitoring(bool) {
    localStorage.setItem("Ismonitoring", bool);
  }

  getIsMonitoring() {
    return localStorage.getItem("Ismonitoring");
  }

  removeIsMonitoring() {
    localStorage.removeItem("Ismonitoring");
  }
}
