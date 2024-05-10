import { Button } from "semantic-ui-react";
import styles from "./LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { centosDirectory } from "@/api";

export function LabsLayout({ lab }) {
  const { accessToken } = useAuth();
  const router = useRouter();

  const cDirectory = new centosDirectory();

  console.log(lab);

  //open dialog
  const handleClickMonitor = () => {
    cDirectory.createFile({ lab: lab }).then((response) => {
      console.log("archivo enviado");
    });
  };

  if (!accessToken) {
    router.push("/");
    return null;
  }
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className={styles.topBar}>
          <Button>Fecha</Button>
          <Button>Computador</Button>
          <Button onClick={handleClickMonitor}>Monitorear</Button>
        </div>

        <div className={styles.block}>{lab}</div>
      </div>
    </>
  );
}
