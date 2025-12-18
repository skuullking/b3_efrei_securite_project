import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl">
      {/* Top Bar */}
      <div className="flex items-center p-4 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">GymTracker</h2>
      </div>

      <div className="flex-1 flex flex-col px-6 pb-8">
        {/* Hero */}
        <div className="w-full mt-2 mb-6 gap-1 overflow-hidden rounded-2xl flex shadow-soft aspect-[2/1] relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <div 
            className="w-full bg-center bg-no-repeat bg-cover flex-1 transform group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: 'url("https://picsum.photos/seed/gym/800/400")' }}
          >
          </div>
          <div className="absolute bottom-3 left-4 z-20">
            <p className="text-white text-xs font-medium bg-primary px-2 py-0.5 rounded-md inline-block mb-1">Motivation</p>
            <p className="text-white font-bold text-sm">Prêt à transpirer ?</p>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-slate-900 dark:text-slate-50 tracking-tight text-3xl font-bold leading-tight">Start your journey</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Connectez-vous pour suivre vos progrès</p>
        </div>

        {/* Toggle */}
        <div className="flex mb-8">
          <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 p-1 relative">
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 z-10 bg-white dark:bg-surface-dark shadow-sm transition-all duration-200">
              <span className="truncate text-primary font-bold text-sm">Se connecter</span>
              <input type="radio" name="auth-toggle" value="login" className="invisible w-0 absolute" defaultChecked />
            </label>
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 z-10 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm transition-all duration-200">
              <span className="truncate">S'inscrire</span>
              <input type="radio" name="auth-toggle" value="signup" className="invisible w-0 absolute" />
            </label>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); navigate('/'); }}>
          <label className="flex flex-col flex-1 group">
            <span className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 ml-1">Email ou Nom d'utilisateur</span>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 material-symbols-outlined text-[20px]">mail</span>
              <input type="email" placeholder="exemple@email.com" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary border-transparent bg-input-light dark:bg-input-dark h-14 placeholder:text-slate-400 pl-11 pr-4 text-base font-normal leading-normal transition-all" />
            </div>
          </label>
          <label className="flex flex-col flex-1 group">
            <span className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-2 ml-1">Mot de passe</span>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 material-symbols-outlined text-[20px]">lock</span>
              <input type="password" placeholder="••••••••" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary border-transparent bg-input-light dark:bg-input-dark h-14 placeholder:text-slate-400 pl-11 pr-12 text-base font-normal leading-normal transition-all" />
              <button type="button" className="absolute right-4 text-slate-400 hover:text-primary transition-colors flex items-center">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </label>
          
          <div className="flex justify-end -mt-1">
            <a href="#" className="text-primary hover:text-primary-dark text-sm font-medium transition-colors">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary hover:bg-primary-dark active:scale-[0.98] text-white h-14 text-base font-bold shadow-glow transition-all duration-200">
            Se connecter
          </button>
        </form>

        <div className="relative flex py-8 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-medium uppercase tracking-wider">Ou continuer avec</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {/* Social Buttons Mockups */}
          {['Apple', 'Google', 'Facebook'].map((social) => (
             <button key={social} className="size-14 rounded-full bg-white dark:bg-input-dark border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-xl">{social === 'Apple' ? 'star' : social === 'Google' ? 'language' : 'thumb_up'}</span>
             </button>
          ))}
        </div>

        <div className="mt-auto text-center px-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            En continuant, vous acceptez nos 
            <a href="#" className="underline decoration-slate-400 hover:text-slate-600 dark:hover:text-slate-300 mx-1">Conditions d'utilisation</a> 
            et notre 
            <a href="#" className="underline decoration-slate-400 hover:text-slate-600 dark:hover:text-slate-300 mx-1">Politique de confidentialité</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;