// @/components/Layout/Sidebar.js
import { useRouter } from "next/router";
import logo from "@/img/logoUcn.png";
import { Button } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import Link from "next/link";

export function Sidebar() {
  const { accessToken, user, logout } = useAuth();

  return (
    <>
      <div className="fixed flex flex-col top-0 left-0 w-1/6 bg-black h-full min-w-64">
        <div className="flex items-center justify-center pt-24">
          <Link href="/home">
            <img src={logo.src} alt="Company Logo" width={100} height={200} />
          </Link>
        </div>
        <div className="relative flex flex-row text-xl items-center justify-center h-1/6 border-b-2 text-gray-500">
          <div>Sistema De Monitoreo EIC</div>
        </div>

        <div className="overflow-y-auto overflow-x-auto flex-grow">
          <ul className="flex flex-col items-center py-4 space-y-4 pt-6">
            <li className="h-6">MENU</li>
            <li>
              <Link
                href="/Labs/y-103"
                className="relative flex flex-row  items-center h-10  focus:outline-none hover:bg-gray-600 text-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-300 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-xl tracking-wide truncate ">
                  Laboratorio y-103
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/Labs/y-107"
                className="relative flex flex-row  items-center h-10  focus:outline-none hover:bg-gray-600 text-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-300 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-xl tracking-wide truncate ">
                  Laboratorio y-107
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/Labs/x-206"
                className="relative flex flex-row  items-center h-10 focus:outline-none hover:bg-gray-600 text-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-300 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-xl tracking-wide truncate ">
                  Laboratorio x-206
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          {accessToken ? (
            <div className="flex items-center justify-center pb-12 ">
              <Button onClick={logout}>Cerrar Sesion</Button>
            </div>
          ) : (
            <div>
              <a href="/">Iniciar Sesion</a>
            </div>
          )}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#155e75"
            fillOpacity="1"
            d="M0,256L48,224C96,192,192,128,288,122.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
}
