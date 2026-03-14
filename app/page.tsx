'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">AI Career Toolkit</h1>
            <p className="text-lg text-gray-500">
                Prepare for technical interviews using AI tools.
            </p>
            <h3 className="text-2xl font-bold mt-8">
                Tools
            </h3>
            <ul>
                <li className="mb-4">
                    <a className="underline" href="/jd-resume-analyzer">JD Resume Analyzer</a>
                    <div>Analyze resume against job description</div>
                </li>
                <li className="mb-4">
                    <a className="underline" href="/interview-simulator">Interview Simulator</a>
                    <div>Practice technical interviews</div>
                </li>
                <li className="mb-4">
                    <a className="underline" href="/coding-interview">Coding Interview Judge</a>
                    <div>Evaluate coding answers</div>
                </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
