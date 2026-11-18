import React from 'react';
import { 
  Users, 
  MapPin, 
  AlertTriangle, 
  Flame, 
  Car, 
  PlusCircle, 
  ThumbsUp, 
  CheckCircle2, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { HotspotReport, Language } from '../types';

interface CommunityShieldProps {
  language: Language;
}

export const CommunityShield: React.FC<CommunityShieldProps> = ({ language }) => {
  const [reports, setReports] = React.useState<HotspotReport[]>([
    {
      id: 'rep-1',
      type: 'Garbage Burning',
      location: 'Block C Alley, near Community Park',
      reportedAt: '25 mins ago',
      upvotes: 14,
      status: 'Verified',
      actionTaken: 'Resident welfare association dispatched security to extinguish fire.'
    },
    {
      id: 'rep-2',
      type: 'Dry Sweeping / Dust',
      location: 'Main Commercial Market Rd',
      reportedAt: '1 hour ago',
      upvotes: 8,
      status: 'Investigating',
      actionTaken: 'Notice sent to municipal sweeping contractor to use water mist spray.'
    },
    {
      id: 'rep-3',
      type: 'Vehicle Idling',
      location: 'Primary School Gate 2 Drop Zone',
      reportedAt: '2 hours ago',
      upvotes: 19,
      status: 'Resolved',
      actionTaken: 'Parent volunteer marshals requested drivers turn off engines during wait.'
    }
  ]);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newType, setNewType] = React.useState<HotspotReport['type']>('Garbage Burning');
  const [newLocation, setNewLocation] = React.useState('');

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.trim()) return;

    const newRep: HotspotReport = {
      id: `rep-${Date.now()}`,
      type: newType,
      location: newLocation.trim(),
      reportedAt: 'Just now',
      upvotes: 1,
      status: 'Investigating'
    };

    setReports([newRep, ...reports]);
    setNewLocation('');
    setShowAddForm(false);
  };

  const handleUpvote = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r));
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Users className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-white">
            Community Smog Shield & Neighborhood Action Board
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Clean air is a collective neighborhood right. Report local pollution violations (open garbage burning, dry road dust, vehicle idling), synchronize school carpools, and coordinate community clean-air defense.
        </p>
      </div>

      {/* Community Stats Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-white font-mono">1,480 Families</div>
            <div className="text-slate-400">Active in Neighborhood Shield</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-400 font-mono">24 Hotspots Mitigated</div>
            <div className="text-slate-400">Waste fires doused this week</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-amber-300 font-mono">38 Carpool Pods</div>
            <div className="text-slate-400">Active school-run clusters</div>
          </div>
        </div>
      </div>

      {/* Hotspot Report Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Live Neighborhood Smoke & Dust Incident Feed
          </h3>
          <p className="text-xs text-slate-400">
            Reports verified by neighborhood peers trigger immediate RWA & local municipal action.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Report Open Burning / Hotspot
        </button>
      </div>

      {/* Add Report Form */}
      {showAddForm && (
        <form onSubmit={handleAddReport} className="bg-slate-900 border border-rose-900/60 rounded-2xl p-5 space-y-4 text-xs animate-in fade-in">
          <h4 className="font-bold text-white text-sm">Report a Smoke or Pollution Violation</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Violation Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
              >
                <option value="Garbage Burning">Open Garbage / Plastic Burning</option>
                <option value="Dry Sweeping / Dust">Dry Sweeping Dust Violation</option>
                <option value="Biomass Heating">Biomass / Leaf Fire</option>
                <option value="Vehicle Idling">Chronic Diesel Vehicle Idling</option>
                <option value="Industrial Smoke">Unfiltered Commercial Smoke Plume</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Exact Location / Landmark</label>
              <input
                type="text"
                placeholder="e.g. Near Community Park Gate 3, Sector 15"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-4 py-1.5 rounded-lg shadow"
            >
              Submit Urgent Report
            </button>
          </div>
        </form>
      )}

      {/* Reports Feed */}
      <div className="space-y-3 text-xs">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{rep.type}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  rep.status === 'Resolved'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : rep.status === 'Verified'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {rep.status}
                </span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {rep.reportedAt}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{rep.location}</span>
              </div>
              {rep.actionTaken && (
                <div className="text-emerald-300 font-medium bg-emerald-950/30 px-2 py-1 rounded-md border border-emerald-800/30 text-[11px]">
                  ✓ {rep.actionTaken}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleUpvote(rep.id)}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-xl text-slate-300 flex items-center gap-1.5 transition-colors"
                title="Verify this pollution incident"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold font-mono">{rep.upvotes}</span>
                <span className="text-[11px] text-slate-400">Verifications</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
