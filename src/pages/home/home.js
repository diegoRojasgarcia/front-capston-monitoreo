import { useAuth } from "@/hooks";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function HomePage() {
  const { accessToken, logout } = useAuth();
  const router = useRouter();

  if (!accessToken) {
    router.push("/");
    return null;
  }

  return (
    <>
      <div>
        {accessToken ? (
          <div>
            <p>Bienvenido</p>
            <Button onClick={logout}>Cerrar Sesion</Button>
          </div>
        ) : (
          <div>
            <a href="/">Iniciar Sesion</a>
          </div>
        )}
      </div>
    </>
  );
}
