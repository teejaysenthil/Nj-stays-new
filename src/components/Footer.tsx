import { Building2, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 text-white">
            <Building2 size={14} />
          </span>
          <span className="font-semibold">NJ Stays</span>
          <span className="hidden text-slate-400 sm:inline">
            &mdash; premium furnished stays in Bengaluru
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} /> BTM 1st Stage, Bengaluru - 560029
          </span>
          <a href="tel:+919483926622" className="flex items-center gap-1.5 hover:text-orange-600">
            <Phone size={14} /> +91 94839 26622
          </a>
        </div>
      </div>
    </footer>
  );
}
