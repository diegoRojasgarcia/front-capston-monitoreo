import Layout from "@/components/sidebar";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { LabsLayout } from "@/layouts/LabsLayout";

export default function HomePage({ title }) {
  const { user } = useAuth();
  const router = useRouter();

  //si no es un usuario logeado, redireccionamos al login
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Layout pageTitle={title}>
        <div className="flex flex-col">{title ? <LabsLayout /> : null}</div>
      </Layout>
    </>
  );
}
