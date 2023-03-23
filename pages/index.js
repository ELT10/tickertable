import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import TickerTable from "../components/TickerTable";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ticker Table</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full lg:w-1/3 p-4 text-center mx-auto">
        <section className="container mx-auto p-2 sm:p-6 font-mono">
          <TickerTable />
        </section>
      </div>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className="font-bold">TagProtocol Team</span>
        </a>
      </footer>
    </div>
  );
}
