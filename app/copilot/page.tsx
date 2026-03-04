'use client';

import { useEffect, useState } from "react";

type Analysis = {
    score: number;
    missing_skills: string[];
    rewrite_suggestions: string[];
};

type Interview = {
    questions: string[];
};

export default function CopilotPage() {

    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [interview, setInterview] = useState<Interview | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const form = document.querySelector("form");
        form?.addEventListener("submit", async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const formData = new FormData(form);
                const jd = formData.get("jd");
                const resume = formData.get("resume");
                const res1 = await fetch("/api/analyze", {
                    method: "POST",
                    body: JSON.stringify({ jd, resume }),
                })
                let nextAnalysis: Analysis = { score: 0, missing_skills: [], rewrite_suggestions: [] };
                try {
                    const analysisResult = await res1.json()
                    nextAnalysis = JSON.parse(analysisResult.raw) as Analysis;
                    setAnalysis(nextAnalysis);
                } catch {
                    nextAnalysis = {
                        score: 0,
                        missing_skills: [],
                        rewrite_suggestions: ["Invalid JSON from model"]
                    };
                    setAnalysis(nextAnalysis);
                }
                const res2 = await fetch("/api/interview-contextual", {
                    method: "POST",
                    body: JSON.stringify({ jd, resume, missing_skills: nextAnalysis.missing_skills }),
                })
                try {
                    const interviewResult = await res2.json()
                    setInterview(JSON.parse(interviewResult.raw) as Interview);
                } catch {
                    setInterview({
                        questions: [],
                    })
                }
            } finally {
                setLoading(false);
            }
        });
    }, []);

    return (

        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
            
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold">AI Job Application Copilot</h1>
                    </div>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="jd">JD</label>
                            <textarea
                                name="jd" id="jd" 
                                placeholder="Paste job description" className="w-full border-2 border-gray-300 rounded-md p-2" rows={10} 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="resume">Resume</label>
                            <textarea
                                name="resume" id="resume"
                                placeholder="Paste your resume" className="w-full border-2 border-gray-300 rounded-md p-2" rows={10} 
                            />
                        </div>
                        <div className="grid w-full">
                            <button type="submit" disabled={loading} className={`bg-blue-500 text-white px-4 py-2 rounded-md`}>{loading ? "Analyzing..." : "Analyze Application"}</button>
                        </div>
                    </form>
                    {analysis && interview && (
                        <div className="flex flex-col gap-2 mt-4">
                            <h2 className="text-2xl font-bold">Result</h2> 
                            {analysis && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Match Score</h3>
                                    <p>{analysis.score}</p>
                                    {analysis.missing_skills?.length > 0 && (
                                        <>
                                            <h3 className="mt-4 underline">Missing Skills</h3>
                                            <ul>
                                                {analysis.missing_skills?.map((s, i) => (
                                                    <li className="list-disc list-inside" key={i}>{s}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            )}

                            {interview && (
                                <div className="mt-4">    
                                    {interview.questions?.length > 0 && (
                                        <>
                                            <h3 className="text-lg font-semibold">Interview Questions</h3>
                                            <ul>
                                                {interview.questions?.map((q, i) => (
                                                    <li className="list-disc list-inside" key={i}>{q}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
  }