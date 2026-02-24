'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function InterviewPage() {
    const [jd, setJd] = useState("")


    useEffect(() => {
        const form = document.querySelector("form");
        form?.addEventListener("submit", (e) => {
          e.preventDefault();
          setLoading(true);
          const formData = new FormData(form);
          const jd = formData.get("jd");
          const resume = formData.get("resume");
          fetch("/api/analyze", {
            method: "POST",
            body: JSON.stringify({ jd, resume }),
          }).then(res => res.json()).then(data => {
            let parsed;
    
            try {
              parsed = JSON.parse(data.raw);
            } catch {
              parsed = {
                score: 0,
                missing_skills: [],
                rewrite_suggestions: ["Invalid JSON from model"]
              };
            }
            setResult(parsed);
            setLoading(false);
          }).catch(err => {
            console.error(err);
            setLoading(false);
          });
        });
      }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold">AI Interview Simulator</h1>
                    </div>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="jd">JD</label>
                            <textarea placeholder="Paste job description" name="jd" id="jd" className="w-full border-2 border-gray-300 rounded-md p-2" rows={10} required value={jd} onChange={(e) => setJd(e.target.value)} />
                        </div>
                
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Generate Questions</button>
                
                        <div style={{ marginTop: 20 }}>
                            {/* questions will appear here */}
                        </div>
                    </form>
                   

                </div>
            </main>
        </div>
    );
  }