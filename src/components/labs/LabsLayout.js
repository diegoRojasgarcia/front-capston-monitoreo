import { Button } from "semantic-ui-react";
import styles from "./LabsLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

const fruits = [
  { name: "Apple", price: 25 },
  { name: "Banana", price: 40 },
  { name: "Melon", price: 75 },
];

export function LabsLayout({ lab }) {
  const { accessToken } = useAuth();
  const router = useRouter();

  if (!accessToken) {
    router.push("/");
    return null;
  }

  console.log(lab);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className={styles.topBar}>
          <Button>Fecha</Button>
          <Button>Computador</Button>
        </div>

        <div className={styles.block}>{lab}</div>
      </div>
    </>
  );
}
