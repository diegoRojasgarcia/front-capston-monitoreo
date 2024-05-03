// @/components/Layout/Sidebar.js
import { useRouter } from "next/router";
import logo from "@/img/logoUcn.png";
import { Button } from "semantic-ui-react";
import { useAuth } from "@/hooks";

export function Sidebar() {
  const { accessToken, user, logout } = useAuth();

  //si no es un usuario logeado, redireccionamos al login
  if (!accessToken) {
    router.push("/");
    logout();
    return null;
  }

  return (
    <>
      <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-Sky-600 ">
        <div class="fixed flex flex-col top-0 left-0 w-80 bg-black h-full ">
          <div class="flex items-center justify-center pt-24">
            <img src={logo.src} alt="Company Logo" width={100} height={200} />
          </div>
          <div class="flex text-xl items-center justify-center h-1/6 border-b-2 text-gray-500">
            <div>Sistema De Monitoreo EIC</div>
          </div>

          <div class="overflow-y-auto overflow-x-hidden flex-grow">
            <ul class="flex flex-col py-4 space-y-3">
              <li class="px-5">
                <div class="flex flex-row items-center h-24">
                  <div class="text-xl font-light tracking-wide text-gray-100">
                    Menu
                  </div>
                </div>
              </li>

              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-12 focus:outline-none hover:bg-gray-600 text-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-300 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-xl tracking-wide truncate">
                    Laboratorio y-103
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-12 focus:outline-none hover:bg-gray-600 text-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-300 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-xl tracking-wide truncate">
                    Laboratorio y-107
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-12 focus:outline-none hover:bg-gray-600 text-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-300 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-xl tracking-wide truncate">
                    Laboratorio x-206
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-12 focus:outline-none hover:bg-gray-600 text-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-300 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-xl tracking-wide truncate">
                    Laboratorio x-207
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  class="relative flex flex-row items-center h-12 focus:outline-none hover:bg-gray-600 text-gray-600 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-300 pr-6"
                >
                  <span class="inline-flex justify-center items-center ml-4">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      ></path>
                    </svg>
                  </span>
                  <span class="ml-2 text-xl tracking-wide truncate">
                    Laboratorio x-208
                  </span>
                </a>
              </li>

              <div
                id="dropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </ul>
          </div>

          <div className="flex justify-center py-10 group">
            <div className="relative flex items-center justify-end w-20 h-20 overflow-hidden bg-gray-900 rounded-full ">
              <div className="absolute w-1/2 h-1 bg-white rounded-full origin-left -rotate-12 group-hover:rotate-[215deg] duration-1000 ease-in-out" />

              <div className="absolute w-1/2 h-1  origin-left rotate-[70] group-hover:rotate-[340deg] duration-1000 ease-in-out">
                <div className="w-2/3 h-full bg-white rounded-full" />
              </div>

              <div className="absolute flex justify-center flex-1 w-full">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
          </div>

          <div>
            {accessToken ? (
              <div class="flex items-center justify-center pb-12">
                <Button onClick={logout}>Cerrar Sesion</Button>
              </div>
            ) : (
              <div>
                <a href="/">Iniciar Sesion</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
