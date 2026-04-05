'use client';

import { useMemo, useState } from "react";

type RoleOption = "frontend" | "backend" | "fullstack" | "mobile";
type SeniorityOption = "junior" | "mid" | "senior";
type LineBreakMode = "\\n" | "\\n\\n";

const roleLabels: Record<RoleOption, string> = {
  frontend: "Frontend Developer",
  backend: "Backend Developer",
  fullstack: "Full Stack Developer",
  mobile: "Mobile Developer",
};

const seniorityLabels: Record<SeniorityOption, string> = {
  junior: "Junior",
  mid: "Mid-Level",
  senior: "Senior",
};

const roleSkills: Record<RoleOption, string[]> = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
  backend: ["Node.js", "TypeScript", "PostgreSQL", "REST APIs", "Docker"],
  fullstack: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
  mobile: ["React Native", "TypeScript", "iOS/Android", "REST APIs", "CI/CD"],
};

const seniorityTraits: Record<SeniorityOption, string[]> = {
  junior: ["strong fundamentals", "eagerness to learn", "good communication"],
  mid: ["independent delivery", "cross-team collaboration", "solid product sense"],
  senior: ["system design", "technical leadership", "mentoring experience"],
};

function buildSampleJobDescription(role: RoleOption, seniority: SeniorityOption) {
  const skills = roleSkills[role];
  const traits = seniorityTraits[seniority];

  return `${seniorityLabels[seniority]} ${roleLabels[role]}

Company Overview
We are building internal and customer-facing products that help teams ship reliable software faster. Our engineering team values pragmatic problem solving, clean architecture, and close collaboration with product and design.

Role Summary
We are looking for a ${seniority.toLowerCase()} ${roleLabels[role].toLowerCase()} to help design, build, and maintain product features from idea to production. You will work with engineers, designers, and stakeholders to deliver high-quality solutions that balance speed and maintainability.

Key Responsibilities
- Build and maintain features using ${skills.slice(0, 3).join(", ")}
- Collaborate with product, design, and QA to turn requirements into production-ready work
- Write clean, testable code and participate in code reviews
- Debug issues, improve performance, and support stable releases
- Contribute to team processes, documentation, and continuous improvement

Requirements
- Practical experience with ${skills.join(", ")}
- Familiarity with modern Git workflows and agile delivery
- Evidence of ${traits.join(", ")}
- Ability to communicate technical decisions clearly
- Comfortable working in a fast-moving product environment

Nice to Have
- Experience with cloud deployment and observability tooling
- Experience working with AI-assisted development workflows
- Portfolio, GitHub, or project examples that show relevant product work`;
}

function buildSampleResume(role: RoleOption, seniority: SeniorityOption) {
  const skills = roleSkills[role];
  const years = seniority === "junior" ? "2" : seniority === "mid" ? "5" : "8";
  const scope =
    seniority === "junior"
      ? "supported feature delivery and bug fixing"
      : seniority === "mid"
        ? "owned medium-sized product features end to end"
        : "led complex initiatives across multiple teams";

  return `Alex Morgan
Email: alex.morgan@example.com
Phone: +33 6 12 34 56 78
Location: Paris, France

Professional Summary
${roleLabels[role]} with ${years}+ years of experience building web and product experiences using ${skills.join(", ")}. Known for strong collaboration, thoughtful problem solving, and shipping maintainable solutions in fast-paced teams.

Core Skills
- ${skills.join("\n- ")}
- Git, testing, CI/CD, debugging, stakeholder communication

Experience
Product Engineer | BrightLayer Studio | 2022 - Present
- ${scope} with a focus on quality, performance, and user experience
- Built and improved production features using ${skills.slice(0, 4).join(", ")}
- Partnered with product and design to refine requirements and reduce delivery friction
- Wrote reusable components, improved developer workflows, and helped review pull requests

Software Developer | Northwind Labs | 2019 - 2022
- Delivered customer-facing product improvements and internal tooling
- Contributed to API integrations, application testing, and release readiness
- Helped investigate production issues and document implementation decisions

Projects
- Resume Match Helper: Built a tool that compares resumes against job descriptions and highlights missing skills
- Interview Practice App: Created a prototype workflow for mock interviews and feedback summaries

Education
BSc in Computer Science

Additional Information
- Comfortable working in English-speaking international teams
- Interested in developer productivity, AI-assisted workflows, and product engineering`;
}

function escapeMultilineContent(value: string, lineBreakMode: LineBreakMode) {
  const normalized = value.replace(/\r\n/g, "\n");
  const replacement = lineBreakMode;
  return normalized.replace(/\n/g, replacement);
}

function unescapeToMultilineContent(value: string) {
  return value.replace(/\\n\\n/g, "\n\n").replace(/\\n/g, "\n");
}

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export default function ToolsPage() {
  const [jobRole, setJobRole] = useState<RoleOption>("frontend");
  const [jobSeniority, setJobSeniority] = useState<SeniorityOption>("mid");
  const [resumeRole, setResumeRole] = useState<RoleOption>("frontend");
  const [resumeSeniority, setResumeSeniority] = useState<SeniorityOption>("mid");
  const [jobDescription, setJobDescription] = useState(() =>
    buildSampleJobDescription("frontend", "mid")
  );
  const [resume, setResume] = useState(() => buildSampleResume("frontend", "mid"));
  const [multilineInput, setMultilineInput] = useState("");
  const [singleLineInput, setSingleLineInput] = useState("");
  const [lineBreakMode, setLineBreakMode] = useState<LineBreakMode>("\\n");
  const [copyMessage, setCopyMessage] = useState("");

  const escapedPreview = useMemo(
    () => escapeMultilineContent(multilineInput, lineBreakMode),
    [lineBreakMode, multilineInput]
  );
  const restoredPreview = useMemo(
    () => unescapeToMultilineContent(singleLineInput),
    [singleLineInput]
  );

  const handleCopy = async (value: string, label: string) => {
    try {
      await copyToClipboard(value);
      setCopyMessage(`${label} copied to clipboard.`);
      window.setTimeout(() => setCopyMessage(""), 2000);
    } catch {
      setCopyMessage(`Could not copy ${label.toLowerCase()}.`);
      window.setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f7fb_0%,#edf4ff_45%,#f8fafc_100%)] text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(135deg,#0f172a,#1e3a8a_55%,#1d4ed8)] px-6 py-8 text-white sm:px-8">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium tracking-wide">
              Development Utilities
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Tools
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-blue-50 sm:text-lg">
              Generate realistic sample content for testing, then convert multiline
              text to escaped string format and back again when you need to edit it.
            </p>
          </div>

          <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-2xl font-semibold">Sample Job Description</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Create a realistic job description you can paste into the analyzer
                or use in development and demos.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Role
                  <select
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                    value={jobRole}
                    onChange={(event) => setJobRole(event.target.value as RoleOption)}
                  >
                    {Object.entries(roleLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Seniority
                  <select
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                    value={jobSeniority}
                    onChange={(event) =>
                      setJobSeniority(event.target.value as SeniorityOption)
                    }
                  >
                    {Object.entries(seniorityLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  onClick={() =>
                    setJobDescription(buildSampleJobDescription(jobRole, jobSeniority))
                  }
                >
                  Generate JD
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  onClick={() => handleCopy(jobDescription, "Job description")}
                >
                  Copy
                </button>
              </div>

              <textarea
                className="mt-5 min-h-[24rem] w-full rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-2xl font-semibold">Sample Resume</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Generate an editable sample resume for test data, prompts, or UI
                flows.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">
                  Role
                  <select
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                    value={resumeRole}
                    onChange={(event) => setResumeRole(event.target.value as RoleOption)}
                  >
                    {Object.entries(roleLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Seniority
                  <select
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                    value={resumeSeniority}
                    onChange={(event) =>
                      setResumeSeniority(event.target.value as SeniorityOption)
                    }
                  >
                    {Object.entries(seniorityLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  onClick={() => setResume(buildSampleResume(resumeRole, resumeSeniority))}
                >
                  Generate Resume
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  onClick={() => handleCopy(resume, "Resume")}
                >
                  Copy
                </button>
              </div>

              <textarea
                className="mt-5 min-h-[24rem] w-full rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500"
                value={resume}
                onChange={(event) => setResume(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Multiline String Converter
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Turn multiline text into a single-line escaped string using either
              <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-sm">
                \n
              </code>
              or
              <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-sm">
                \n\n
              </code>
              between lines, then reverse it back into editable multiline content.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-medium text-slate-700">Escape mode</div>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="lineBreakMode"
                value="\\n"
                checked={lineBreakMode === "\\n"}
                onChange={() => setLineBreakMode("\\n")}
              />
              Replace each newline with <code className="rounded bg-white px-1.5 py-0.5">\n</code>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="lineBreakMode"
                value="\\n\\n"
                checked={lineBreakMode === "\\n\\n"}
                onChange={() => setLineBreakMode("\\n\\n")}
              />
              Replace each newline with <code className="rounded bg-white px-1.5 py-0.5">\n\n</code>
            </label>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">Multiline to Single Line</h3>
                <button
                  type="button"
                  className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  onClick={() => {
                    setSingleLineInput(escapedPreview);
                    handleCopy(escapedPreview, "Escaped string");
                  }}
                >
                  Convert and Copy
                </button>
              </div>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Multiline input
                <textarea
                  className="mt-2 min-h-[14rem] w-full rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500"
                  value={multilineInput}
                  onChange={(event) => setMultilineInput(event.target.value)}
                  placeholder={`Line one\nLine two\nLine three`}
                />
              </label>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Escaped single-line output
                <textarea
                  className="mt-2 min-h-[10rem] w-full rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500"
                  value={escapedPreview}
                  readOnly
                />
              </label>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">Single Line to Multiline</h3>
                <button
                  type="button"
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  onClick={() => {
                    setMultilineInput(restoredPreview);
                    handleCopy(restoredPreview, "Multiline content");
                  }}
                >
                  Reverse and Copy
                </button>
              </div>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Escaped string input
                <textarea
                  className="mt-2 min-h-[10rem] w-full rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500"
                  value={singleLineInput}
                  onChange={(event) => setSingleLineInput(event.target.value)}
                  placeholder={`Line one\\nLine two\\n\\nLine four`}
                />
              </label>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                Restored multiline output
                <textarea
                  className="mt-2 min-h-[14rem] w-full rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500"
                  value={restoredPreview}
                  readOnly
                />
              </label>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-500">
            {copyMessage || "Copy buttons will place the latest generated content on your clipboard."}
          </div>
        </section>
      </main>
    </div>
  );
}
