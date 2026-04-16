"use client";
import { useEffect, useState } from 'react';
import { Users, Edit } from 'lucide-react';

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);
  const [mounted, setMounted] = useState(false);
  // New state for filtering
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const savedData = localStorage.getItem('timeline');
    let initialTimeline = [];
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        initialTimeline = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error("Error parsing timeline", e);
      }
    }

    setTimeline(initialTimeline);
    setMounted(true);
  }, []);

  // Filtering Logic
  const filteredTimeline = timeline.filter(item => {
    if (filterType === 'All') return true;
    return item.type === filterType;
  });

  const getVisuals = (type) => {
    switch (type) {
      case 'Call': return { emoji: "📞", label: "Call", bgColor: "bg-blue-50" };
      case 'Text': return { emoji: "💬", label: "Text", bgColor: "bg-emerald-50" };
      case 'Video': return { emoji: "📽️", label: "Video", bgColor: "bg-purple-50" };
      default: return { emoji: "🤝", label: "Meetup", bgColor: "bg-orange-50" };
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 pt-10 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Timeline</h1>
          
          <div className="relative max-w-xs">
            {/* Added onChange to update filter state */}
            <select 
              className="select select-bordered w-full bg-white border-slate-200 font-medium text-slate-600 focus:outline-none focus:border-[#244D3F]"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Activities</option>
              <option value="Call">Calls</option>
              <option value="Text">Texts</option>
              <option value="Video">Videos</option>
            </select>
          </div>
        </header>

        <div className="space-y-4">
          {filteredTimeline.length === 0 ? (
            <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Users className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching history</p>
            </div>
          ) : (
            filteredTimeline.map((item) => {
              const { emoji, label, bgColor } = getVisuals(item.type);
              return (
                <div 
                  key={item.id} 
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl border border-slate-100 ${bgColor} shadow-inner`}>
                      {emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {label} <span className="font-normal text-slate-400 mx-1">with</span> {item.friendName}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-1">
                        {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-slate-300 hover:text-slate-600 p-2">
                       <Edit size={18} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}