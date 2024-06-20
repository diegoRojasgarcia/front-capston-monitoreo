import React, { useState } from "react";
import Layout from "@/components/sidebar";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { LabsLayout } from "@/layouts/LabsLayout";
import { centosDirectory } from "@/api";
import Link from "next/link";
import { VideoCameraIcon } from "@heroicons/react/24/solid";

export default function HomePage({ title }) {
  const { user } = useAuth();
  const router = useRouter();
  const [showButtonLiveView, setShowButtonLiveView] = React.useState(false);
  const [labsmonitoring, setLabsMonitoring] = React.useState([]);
  const cDirectory = new centosDirectory();

  React.useEffect(() => {
    (async () => {
      var labs = [];
      labs = await cDirectory.getLabsMonitoring();
      if (labs) {
        setShowButtonLiveView(true);
        setLabsMonitoring(labs);
      }
    })();
  }, []);

  //si no es un usuario logeado, redireccionamos al login
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Layout pageTitle={title}>
        <div className="flex flex-col">{title ? <LabsLayout /> : null}</div>

        {/* {labsmonitoring.length > 0 ? (
         <>
         
         <div className="fixed top-44 flex flex-col items-start space-y-10">
           <div className="w-96 bg-gray-600 text-white  text-2xl p-4 shadow-lg">
             <p>SIMO Sistema de Monitoreo EIC</p>
           </div>
           <div className="flex flex-col items-center py-4 space-y-4">
           <div className="w-64 bg-gray-600 text-white   text-xl p-4 shadow-lg">
             <p>Información 4</p>
           </div>
           <div className="w-64 bg-gray-600 text-white  text-xl p-4 shadow-lg">
             <p>Información 4</p>
           </div>
           </div>
           
         </div>
       </>
          
        ) : (
          <div
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )} */}

        {showButtonLiveView ? (
          <button className="fixed bottom-4 right-4 bg-orange-300 text-white p-4 m-6 rounded-full shadow-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {" "}
            <Link href="/home/liveview">
              {React.createElement(VideoCameraIcon, {
                strokeWidth: 2,
                className: " text-gray-900 w-7",
              })}
            </Link>
          </button>
        ) : null}
      </Layout>
    </>
  );
}
