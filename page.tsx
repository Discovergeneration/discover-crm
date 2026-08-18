"use client";

import { useApp } from "@/lib/store";
import { Pipeline } from "@/components/Pipeline";
import { KPITracker } from "@/components/KPITracker";
import { Fulfillment } from "@/components/Fulfillment";
import { Commission } from "@/components/Commission";
import { UserRole, TabId } from "@/lib/types";

const TABS: { id: TabId; label: string }[] = [
  { id: "pipeline", label: "Pipeline (Deals)" },
  { id: "kpi", label: "KPI Tracker" },
  { id: "fulfillment", label: "Fulfillment Queue" },
  { id: "commission", label: "Commission Report" },
];

const ROLES: UserRole[] = ["Tom", "John", "Admin"];

export default function Home() {
  const { currentUser, setCurrentUser, activeTab, setActiveTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
              DG
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-900">
                Discover Generation CRM
              </h1>
              <p className="text-xs text-slate-500">
                Sales · Fulfillment · Operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 sm:inline">
              Viewing as:
            </span>
            <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              {ROLES.map((role) => (
                <button
                  key={role}
                  onClick={() => setCurrentUser(role)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    currentUser === role
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="-mb-px flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {activeTab === "pipeline" && <Pipeline />}
        {activeTab === "kpi" && <KPITracker />}
        {activeTab === "fulfillment" && <Fulfillment />}
        {activeTab === "commission" && <Commission />}
      </main>

      <footer className="border-t border-slate-200 bg-white py-3 text-center text-xs text-slate-400">
        Discover Generation · Demo CRM · Data stored in localStorage · Role:{" "}
        {currentUser}
      </footer>
    </div>
  );
}
