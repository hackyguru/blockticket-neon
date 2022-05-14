import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  
  return (
    <div className="bg-gray-900">
      <section class="text-white bg-gray-900">
        <div class="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
              Hacker House Bangalore
            </h1>

            <p class="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
              Get started by registering your tickets!
            </p>

            <div class="flex flex-wrap justify-center gap-4 mt-8">
              <a
                class="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring"
                href="/register"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
