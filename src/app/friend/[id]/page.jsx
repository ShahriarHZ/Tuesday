"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  ArrowLeft, Phone, MessageSquare, Video, 
  Clock, Archive, Trash2 
} from "lucide-react";
import { toast } from 'react-toastify';

export default function FriendDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id === parseInt(id));
        setFriend(found);
      })
      .catch(err => console.error("Error fetching friend data:", err));
  }, [id]);

  const logInteraction = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now(),
      type: type,
      friendName: friend.name,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    };

    const existingTimeline = JSON.parse(localStorage.getItem('timeline') || '[]');
    localStorage.setItem('timeline', JSON.stringify([newEntry, ...existingTimeline]));

    toast.success(`${type} with ${friend.name} logged!`, {
      position: "bottom-right",
      autoClose: 3000,
      style: { backgroundColor: '#244D3F', color: 'white' }
    });
  };

  if (!friend) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <span className="loading loading-spinner loading-lg text-[#244D3F]"></span>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20 pt-10 px-4">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#244D3F] mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-slate-50 shadow-sm">
                <img src={friend.picture} alt={friend.name} className="w-full h-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{friend.name}</h1>
              
              <div className="flex flex-wrap justify-center gap-2 my-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${friend.status === 'Overdue' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {friend.status}
                </span>
                {friend.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#E9F2EF] text-[#244D3F] rounded-full text-[10px] font-bold uppercase">{tag}</span>
                ))}
              </div>

              {friend.bio ? (
                <p className="text-slate-500 italic text-sm mb-4 leading-relaxed px-4">
                  &ldquo;{friend.bio}&rdquo;
                </p>
              ) : (
                <p className="text-slate-400 text-xs mb-4">No bio added yet.</p>
              )}

              <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Preferred: <span className="text-slate-600">email</span></p>

              <div className="w-full mt-8 flex flex-col gap-3">
                <button className="w-full py-3 rounded-xl border border-slate-200 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-slate-50 transition-colors"><Clock size={16} /> Snooze 2 Weeks</button>
                <button className="w-full py-3 rounded-xl border border-slate-200 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-slate-50 transition-colors"><Archive size={16} /> Archive</button>
                <button className="w-full py-3 rounded-xl border border-red-50 flex items-center justify-center gap-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={16} /> Delete</button>
              </div>
            </div>
          </div>

          {/* Stats & Interactions */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span className="text-4xl font-black text-slate-800">{friend.days_since_contact}</span>
                <p className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">Days Since Contact</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span className="text-4xl font-black text-slate-800">{friend.goal}</span>
                <p className="text-[10px] text-slate-400 mt-2 uppercase font-black tracking-widest">Goal (Days)</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
                <span className="text-xl font-black text-slate-800 block mt-2">{friend.next_due_date}</span>
                <p className="text-[10px] text-slate-400 mt-3 uppercase font-black tracking-widest">Next Due</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 text-lg mb-8">Quick Check-In</h4>
              <div className="grid grid-cols-3 gap-6">
                <button onClick={() => logInteraction('Call')} className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-slate-50/40 border border-slate-50 hover:bg-slate-100 transition-all group">
                  <Phone className="text-slate-400 group-hover:text-[#244D3F]" size={28} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Call</span>
                </button>
                <button onClick={() => logInteraction('Text')} className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-slate-50/40 border border-slate-50 hover:bg-slate-100 transition-all group">
                  <MessageSquare className="text-slate-400 group-hover:text-[#244D3F]" size={28} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Text</span>
                </button>
                <button onClick={() => logInteraction('Video')} className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-slate-50/40 border border-slate-50 hover:bg-slate-100 transition-all group">
                  <Video className="text-slate-400 group-hover:text-[#244D3F]" size={28} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}