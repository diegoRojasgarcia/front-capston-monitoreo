import { LabsLayout } from "@/layouts/LabsLayout";
import Layout from "@/components/sidebar";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
export default function Labs() {
  const { user, logout } = useAuth();
  const router = useRouter();

  //si no es un usuario logeado, redireccionamos al login
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Layout>
        <LabsLayout></LabsLayout>
      </Layout>
    </>
  );
}
