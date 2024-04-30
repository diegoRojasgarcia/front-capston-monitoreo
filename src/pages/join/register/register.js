import Link from "next/link";
import { AuthLayout } from "@/layouts";
import styles from "./register.module.scss";
import { RegisterForm } from "@/components/Auth";

export default function RegisterPage() {
  return (
    <>
      <AuthLayout>
        <div className={styles.signIn}>
          <h3>Crear cuenta</h3>
          <RegisterForm />
          <div className={styles.actions}>
            <Link href="/join/login">Atras</Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
