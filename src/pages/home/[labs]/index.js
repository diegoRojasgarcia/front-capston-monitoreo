import { LabsLayout } from "@/layouts/LabsLayout";
import Layout from "@/components/sidebar";
import React, { useEffect } from "react";
import { centosDirectory } from "@/api";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function Labs() {
  const [lab, setLab] = React.useState("");
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

  return (
    <>
      <Layout>
        <LabsLayout lab={lab}></LabsLayout>
      </Layout>
    </>
  );
}
