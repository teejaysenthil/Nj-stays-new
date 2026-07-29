"use client";

import { useApp } from "@/lib/store";

export default function PropertyFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const { properties } = useApp();

  return (
    <div className="mb-5 flex w-full max-w-md items-center gap-1 overflow-x-auto rounded-full bg-slate-100 p-1 dark:bg-slate-800/70">
      <button
        onClick={() => onChange("all")}
        className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
          value === "all"
            ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
            : "text-slate-500 dark:text-slate-400"
        }`}
      >
        All Properties
      </button>
      {properties.map((p) => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
            value === p.id
              ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}
