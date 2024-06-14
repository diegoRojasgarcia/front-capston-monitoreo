import Layout from "@/components/sidebar";
import React, { useEffect } from "react";
import { centosDirectory } from "@/api";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { LiveViewLayout } from "@/layouts/LiveviewLayout";

export default function liveview() {
  const [lab, setLab] = React.useState("");
  const [actividadmonitoring, setActividadmonitoring] = React.useState("");
  const { user } = useAuth();
  const router = useRouter();
  const [ismonitoring, setIsmonitoring] = React.useState(false);

  const cDirectory = new centosDirectory();

  //aqui pasemos si el lab esta monitoreando o no
  const getLabs = () => {
    const lab = localStorage.getItem("selectedLabs");
    setLab(lab);
  };
  useEffect(() => {
    getLabs();
  });

  const getActividad = () => {
    const actividad = localStorage.getItem("actividadmonitoring");
    setActividadmonitoring(actividad);
  };
  useEffect(() => {
    getActividad();
  });

  return (
    <>
      <LiveViewLayout
        lab={lab}
        actividad={actividadmonitoring}
      ></LiveViewLayout>
    </>
  );
}
