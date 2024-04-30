import { useAuth } from "@/hooks";
import { Button } from "semantic-ui-react";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <>
      <div>
        <h2>Laboratorios</h2>

        {user ? (
          <div>
            <p>Hola, {user.email}</p>
            <Button onClick={logout}>Cerrar Sesion</Button>
          </div>
        ) : (
          <div>
            <a href="/join/login">Iniciar Sesion</a>
          </div>
        )}
      </div>
    </>
  );
}
