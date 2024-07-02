import { LabsLayout } from "@/layouts/LabsLayout";
import Layout from "@/components/sidebar";
import React, { useEffect } from "react";
export default function Labs() {
  return (
    <>
      <Layout>
        <LabsLayout></LabsLayout>
      </Layout>
    </>
  );
}
