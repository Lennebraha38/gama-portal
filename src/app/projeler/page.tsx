import type { Metadata } from "next";
import { projectList } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projeler",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        Projeler
      </h1>
      <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Gama çatısı altında yürütülen ve planlanan projeler.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projectList.map((project) => (
          <article
            key={project.ad}
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{project.ad}</h2>
              <span className="rounded-full bg-gama-50 px-3 py-1 text-xs font-semibold text-gama-700 dark:bg-gama-950 dark:text-gama-300">
                {project.durum}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-gama-600 dark:text-gama-400">
              {project.alan}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {project.aciklama}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
