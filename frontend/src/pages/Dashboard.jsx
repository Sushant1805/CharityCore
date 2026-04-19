import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, Info, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, api } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [amount, setAmount] = useState('');
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  
  // Admin fields
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data } = await api.get('/donations/campaigns');
      setCampaigns(data);
      if (data.length > 0) setSelectedCampaignId(data[0]._id);
    } catch (error) {
      console.error('Failed to fetch campaigns', error);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    
    // Client side secure input
    if (isNaN(amount) || amount <= 0) {
      return setMsg({ type: 'error', text: 'Enter a valid amount deeper than 0' });
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      await api.post('/donations/donate', { campaignId: selectedCampaignId, amount: Number(amount) }, config);
      setMsg({ type: 'success', text: `Donation of $${amount} successful!` });
      setAmount('');
      fetchCampaigns(); // refresh amounts
    } catch (error) {
      setMsg({ type: 'error', text: error.response?.data?.message || 'Donation failed' });
    }
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });
    
    if (!title || !desc || !goal) return setMsg({ type: 'error', text: 'Fill all fields' });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      await api.post('/donations/campaigns', { title, description: desc, goalAmount: Number(goal) }, config);
      setMsg({ type: 'success', text: 'Campaign created!' });
      setTitle(''); setDesc(''); setGoal('');
      fetchCampaigns();
    } catch (error) {
      setMsg({ type: 'error', text: error.response?.data?.message || 'Action failed' });
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Welcome, {user.name}</h1>
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
              {user.role} Account
            </div>
          </div>
        </header>

        {msg.text && (
          <div className={`p-4 rounded-xl border ${msg.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
            {msg.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 px-2">Active Campaigns</h2>
            {campaigns.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 text-slate-500">
                <Info className="mx-auto mb-4 text-slate-300" size={48} />
                <p>No campaigns exist yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaigns.map(c => (
                  <div key={c._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
                    <h3 className="font-bold text-xl text-slate-800 mb-2">{c.title}</h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{c.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-primary-600">${c.raisedAmount}</span>
                        <span className="text-slate-400">of ${c.goalAmount}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: `${Math.min((c.raisedAmount/c.goalAmount)*100, 100)}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* Quick Donate Panel */}
            <div className="bg-gradient-to-br from-primary-900 to-primary-800 p-8 rounded-3xl shadow-lg text-white">
              <div className="flex items-center gap-3 mb-6">
                <Wallet className="text-accent-400" />
                <h3 className="text-xl font-bold">Quick Donate</h3>
              </div>
              <form onSubmit={handleDonate} className="space-y-4">
                <div>
                  <label className="block text-sm text-primary-200 mb-1">Select Campaign</label>
                  <select 
                    className="w-full bg-primary-950/50 border border-primary-700 rounded-xl px-4 py-3 text-white focus:outline-none"
                    value={selectedCampaignId}
                    onChange={(e) => setSelectedCampaignId(e.target.value)}
                  >
                    {campaigns.map(c => (
                      <option key={c._id} value={c._id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-primary-200 mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    className="w-full bg-primary-950/50 border border-primary-700 rounded-xl px-4 py-3 text-white focus:outline-none"
                    placeholder="50"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-accent-500/20 active:scale-[0.98] mt-2">
                  Donate Now
                </button>
              </form>
            </div>

            {/* Admin Panel */}
            {user.role === 'admin' && (
              <div className="bg-white p-8 rounded-3xl border border-rose-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Plus className="text-rose-500" />
                    <h3 className="text-xl font-bold text-slate-800">New Campaign</h3>
                  </div>
                  <form onSubmit={handleCreateCampaign} className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Campaign Title"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose-300 focus:outline-none"
                      value={title} onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea 
                      placeholder="Description"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose-300 focus:outline-none resize-none h-24"
                      value={desc} onChange={(e) => setDesc(e.target.value)}
                    />
                    <input 
                      type="number" 
                      placeholder="Goal Amount"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-rose-300 focus:outline-none"
                      value={goal} onChange={(e) => setGoal(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-rose-500/20 active:scale-[0.98]">
                      Publish Campaign
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
