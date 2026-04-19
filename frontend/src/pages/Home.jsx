import React from 'react';
import { Heart, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-slate-900 text-white min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900 z-0 opacity-90"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent-500/20 blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary-400/20 blur-[100px] mix-blend-screen"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
            <Heart size={16} className="text-accent-400" />
            <span className="text-sm font-medium tracking-wide">Empower Change Today</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-slate-300 drop-shadow-sm mb-6 leading-tight">
            Make A Difference In Someone's Life
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mb-10 font-light">
            Secure, transparent, and direct donations to the causes that matter the most to you and the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button onClick={() => navigate('/register')} className="px-8 py-4 bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-xl transition duration-300 shadow-lg shadow-accent-500/30 flex items-center justify-center gap-2">
              Start Donating <ArrowRight size={20} />
            </button>
            <button onClick={() => navigate('/login')} className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl backdrop-blur-md transition duration-300">
              I already have an account
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-24 bg-white px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<ShieldCheck size={40} className="text-primary-600" />}
            title="Secure Platform"
            desc="Built with enterprise-grade security and HTTPS to ensure your data and donations are strictly protected."
          />
          <FeatureCard 
            icon={<Globe size={40} className="text-primary-600" />}
            title="Global Reach"
            desc="Support campaigns and non-profits located across the entire globe with no geographical barriers."
          />
          <FeatureCard 
            icon={<Heart size={40} className="text-primary-600" />}
            title="Transparent Giving"
            desc="Track the direct impact of your donations from the moment it leaves your wallet to the recipient."
          />
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 border-opacity-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-heading font-black text-white tracking-tighter">Charity<span className="text-accent-500">Core</span></div>
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <button className="hover:text-white transition-colors">About Us</button>
            <button className="hover:text-white transition-colors">Contact</button>
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Careers</button>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} CharityCore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-blue-glow transition-all duration-300 hover:-translate-y-1">
    <div className="p-4 bg-primary-50 rounded-2xl mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
