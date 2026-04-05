'use client';

import { BarChart3, Shield, AlertCircle, Zap, FileText, Settings, CheckSquare } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'compliance', label: 'SOC 2 Compliance', icon: CheckSquare },
  { id: 'risks', label: 'Risk Assessments', icon: AlertCircle },
  { id: 'auditor', label: 'AI Auditor', icon: Zap },
  { id: 'policies', label: 'Policy Enforcement', icon: Shield },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, currentPage, onNavigate }: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-950 border-r border-blue-500/20 transition-all duration-300 z-50 ${
        open ? 'w-64' : 'w-0'
      } overflow-hidden`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-blue-500/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                SECURAZ
              </h1>
              <p className="text-xs text-slate-400">AI Security Audit</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/20">
          <p className="text-xs text-slate-400 text-center">
            Powered by Microsoft Azure
          </p>
        </div>
      </div>
    </aside>
  );
}
