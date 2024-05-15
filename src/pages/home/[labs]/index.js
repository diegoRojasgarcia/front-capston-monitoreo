import { LabsLayout } from "@/layouts/LabsLayout";
import Layout from "@/components/sidebar";
import React, { useEffect } from "react";

export default function Labs() {
  const [lab, setLab] = React.useState("");

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
