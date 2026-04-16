"use client";

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [friends, setFriends] = useState([]);

  // Fetch the 10 entries from public/friends.json
  useEffect(() => {
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((err) => console.error("Error loading friends:", err));
  }, []);

  return (
    <main className="min-h-screen bg-base-100">
      {/* 1. HERO / BANNER SECTION */}
      <section className="hero w-full pt-16 pb-12">
        <div className="hero-content text-center w-full">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
              Friends to keep close in your life
            </h1>
            <p className="py-6 text-slate-500 text-lg max-w-2xl mx-auto">
              Your personal shelf of meaningful connections. Browse, tend, and nurture the
              relationships that matter most.
            </p>

            <button className="bg-[#244D3F] hover:bg-[#1a3a2f] text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto transition-all shadow-md active:scale-95 mb-16">
              <Plus size={20} />
              <span className="font-medium">Add a Friend</span>
            </button>

            {/* 2. STATS SECTION */}
            <div className="flex flex-wrap gap-4 justify-center mb-20">
              <div className="flex flex-col items-center justify-center bg-base-200 border-2 border-base-300 rounded-xl w-44 p-6">
                <span className="text-3xl font-bold text-slate-800">10</span>
                <p className="text-sm text-slate-500 font-medium text-center">Total friends</p>
              </div>

              <div className="flex flex-col items-center justify-center bg-base-200 border-2 border-base-300 rounded-xl w-44 p-6">
                <span className="text-3xl font-bold text-slate-800">03</span>
                <p className="text-sm text-slate-500 font-medium text-center">On Track</p>
              </div>

              <div className="flex flex-col items-center justify-center bg-base-200 border-2 border-base-300 rounded-xl w-44 p-6">
                <span className="text-3xl font-bold text-slate-800">06</span>
                <p className="text-sm text-slate-500 font-medium text-center">Need Attention</p>
              </div>

              <div className="flex flex-col items-center justify-center bg-base-200 border-2 border-base-300 rounded-xl w-44 p-6">
                <span className="text-3xl font-bold text-slate-800">12</span>
                <p className="text-sm text-slate-500 font-medium text-center">Interactions</p>
              </div>
            </div>

            {/* 3. FRIENDS LIST SECTION */}
            <div className="w-full text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Your Friends</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {friends.map((friend) => (
                  <Link href={`/friend/${friend.id}`} key={friend.id} className="block group">
                    <div 
                      className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all group-hover:shadow-lg group-hover:-translate-y-1 cursor-pointer h-full"
                    >
                      {/* Profile Picture */}
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50 group-hover:border-[#244D3F]/10 transition-colors">
                        <img 
                          src={friend.picture} 
                          alt={friend.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">{friend.name}</h3>
                      <p className="text-sm text-slate-400 mb-5 font-medium">
                        {friend.days_since_contact} days ago
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 justify-center mb-5">
                        {friend.tags.map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#E9F2EF] text-[#244D3F]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Status Badge */}
                      <div className={`w-full py-2 mt-auto rounded-xl text-[11px] font-black uppercase tracking-tighter ${
                        friend.status === 'Overdue' ? 'bg-red-50 text-red-600' : 
                        friend.status === 'Almost Due' ? 'bg-orange-50 text-orange-400' : 
                        'bg-[#E9F2EF] text-[#244D3F]'
                      }`}>
                        {friend.status}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}