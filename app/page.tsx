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
              AI-powered tools to help developers prepare for technical interviews.<br/>
              Practice interviews, analyze resumes, and evaluate coding answers using LLMs.
            </p>

            <h3 className="text-2xl font-bold mt-4">
                Tools
            </h3>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <a href="/jd-resume-analyzer" className="card">
                <h4 className="text-xl font-bold">JD Resume Analyzer</h4>
                <div className="mt-4">Analyze how well your resume matches a job description.<br/>Identify missing skills and generate interview questions.</div>
              </a>
              <a href="/interview-simulator" className="card">
                <h4 className="text-xl font-bold">Interview Simulator</h4>
                <div className="mt-4">
                  Practice technical interviews with an AI interviewer.<br/>
                  Receive feedback, follow-up questions, and a final evaluation.
                </div>
              </a>
              <a className="card">
              <h4 className="text-xl font-bold">Coding Interview Judge</h4>
                <div className="mt-4">Evaluate coding interview answers using AI reasoning.<br /><br />
                🚧 Coming soon</div>
              </a>
            </div>

            <h3 className="text-2xl font-bold mt-4">
              About this project
            </h3>
            <p className="text-lg text-gray-500 mt-2">
              AI Career Toolkit is a collection of AI-powered developer tools built with Next.js and LLM APIs.<br/>The goal is to explore how AI can assist developers in preparing for technical intervi
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
