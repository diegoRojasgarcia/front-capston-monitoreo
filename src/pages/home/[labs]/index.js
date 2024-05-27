import { LabsLayout } from "@/layouts/LabsLayout";
import Layout from "@/components/sidebar";
import React, { useEffect } from "react";
import { centosDirectory } from "@/api";

export default function Labs() {
  const [lab, setLab] = React.useState("");
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

  return (
    <>
      <Layout>
        <LabsLayout lab={lab}></LabsLayout>
      </Layout>
    </>
  );
}
