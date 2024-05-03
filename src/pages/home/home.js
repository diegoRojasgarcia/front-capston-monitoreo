import Layout from "@/components/sidebar";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function HomePage() {
  const { accessToken, logout, user } = useAuth();
  const router = useRouter();

  //si no es un usuario logeado, redireccionamos al login
  if (!accessToken) {
    router.push("/");
    logout();
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <div className="m-auto"></div>
      </div>
    </Layout>
  );
}
