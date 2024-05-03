import Layout from "@/components/sidebar";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function HomePage({ title }) {
  const { accessToken, logout, user } = useAuth();
  const router = useRouter();

  //si no es un usuario logeado, redireccionamos al login
  if (!accessToken) {
    router.push("/");
    logout();
    return null;
  }

  return (
    <Layout pageTitle={title}>
      <div className="min-h-screen flex flex-col">
        <div className="m-auto">
          <h1 className="text-4xl">{title}</h1>
        </div>
      </div>
    </Layout>
  );
}
