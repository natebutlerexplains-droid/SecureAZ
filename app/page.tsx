'use client';

import { useState } from 'react';
import { Search, Menu, User, LogOut } from 'lucide-react';
import ScoreCard from '@/components/ScoreCard';
import FindingsSection from '@/components/FindingsSection';
import ComplianceMatrix from '@/components/ComplianceMatrix';
import RecentScans from '@/components/RecentScans';
import ResourceMap from '@/components/ResourceMap';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-slate-900/50 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden md:flex items-center gap-3 bg-slate-800/50 rounded-lg px-4 py-2 flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <User className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold">Azure Environment Audit - SOC 2 Readiness</h1>
            <p className="text-slate-400 mt-2">AI-powered security analysis and compliance insights</p>
          </div>

          {/* Top Section - Score and Findings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SOC 2 Score Card */}
            <ScoreCard />

            {/* AI Findings */}
            <div className="lg:col-span-2">
              <FindingsSection />
            </div>
          </div>

          {/* Middle Section - Recent Scans */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentScans />

            {/* Azure Resource Map */}
            <div className="lg:col-span-2">
              <ResourceMap />
            </div>
          </div>

          {/* Compliance Control Matrix */}
          <ComplianceMatrix />
        </main>
      </div>
    </div>
  );
}
