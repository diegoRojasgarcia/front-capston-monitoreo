import { Icon, Image } from "semantic-ui-react";
import Link from "next/link";
import styles from "./AuthLayout.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export function AuthLayout(props) {
  const { children } = props;
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push("/home");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/">
          <Image src="/images/logoUcn.png" alt="UCN" />
        </Link>
      </div>

      <div className={styles.blockLeft}>{children}</div>

      <div className={styles.blockRight} />
    </div>
  );
}
