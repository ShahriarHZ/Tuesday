"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function StatsPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setMounted(true);
    const savedTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    
    // 1. Count interactions
    const counts = savedTimeline.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {});

    const total = savedTimeline.length;

    // 2. Calculate ratios/percentages
    const chartData = [
      { 
        name: "Text", 
        value: counts["Text"] || 0, 
        color: "#8B5CF6",
        ratio: total > 0 ? Math.round(((counts["Text"] || 0) / total) * 100) : 0 
      },
      { 
        name: "Call", 
        value: counts["Call"] || 0, 
        color: "#1E293B",
        ratio: total > 0 ? Math.round(((counts["Call"] || 0) / total) * 100) : 0 
      },
      { 
        name: "Video", 
        value: counts["Video"] || 0, 
        color: "#10B981",
        ratio: total > 0 ? Math.round(((counts["Video"] || 0) / total) * 100) : 0 
      },
    ];

    setData(chartData);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 pt-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Friendship Analytics</h1>

        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
            By Interaction Type
          </h2>

          <div className="h-87.5 w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [`${props.payload.ratio}%`, name]}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value, entry) => {
                    const { ratio } = entry.payload;
                    return (
                      <span className="text-xs font-bold text-slate-500 uppercase ml-2">
                        {value} <span className="text-slate-300 ml-1">{ratio}%</span>
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}