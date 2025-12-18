import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useApp();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [tempStats, setTempStats] = useState(user.stats);

  const handleSave = () => {
      updateUser({ stats: tempStats });
      setIsEditing(false);
  };

  return (
    <>
      <header className="flex items-center px-6 pt-12 pb-4 justify-between bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-tight">Mon Profil</h1>
        <button className="flex items-center justify-center rounded-full size-10 bg-white dark:bg-[#343217] shadow-sm hover:bg-gray-50 dark:hover:bg-[#45421f] transition-colors relative">
          <span className="material-symbols-outlined text-[#1c1c0d] dark:text-[#fcfcf8]" style={{ fontSize: '24px' }}>settings</span>
        </button>
      </header>
      
      <main className="px-4 space-y-6">
        {/* Avatar Section */}
        <section className="flex flex-col items-center justify-center py-6">
          <div className="relative mb-4">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-28 border-4 border-primary shadow-md" 
              style={{ backgroundImage: `url("${user.avatar}")` }}
            ></div>
            <button className="absolute bottom-0 right-1 bg-white dark:bg-[#23220f] p-2 rounded-full border border-gray-200 dark:border-[#343217] shadow-sm hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>edit</span>
            </button>
          </div>
          <h2 className="text-2xl font-bold text-[#1c1c0d] dark:text-[#fcfcf8]">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{user.email}</p>
          <div className="flex gap-2 mt-4">
            <span className="bg-[#f4f4e6] dark:bg-[#343217] px-3 py-1 rounded-full text-xs font-bold text-[#1c1c0d] dark:text-primary border border-primary/20">Pro</span>
            <span className="bg-[#f4f4e6] dark:bg-[#343217] px-3 py-1 rounded-full text-xs font-bold text-gray-500 dark:text-gray-300">Niveau 12</span>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-[#343217] p-4 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center group relative">
             {isEditing ? (
                 <input 
                    type="number" 
                    value={tempStats.age} 
                    onChange={e => setTempStats({...tempStats, age: parseInt(e.target.value)})} 
                    className="w-16 text-center bg-gray-100 dark:bg-black/20 rounded p-1 font-bold"
                 />
             ) : (
                <>
                    <span className="text-sm text-gray-400 font-medium">Age</span>
                    <span className="text-xl font-bold mt-1">{user.stats.age}</span>
                </>
             )}
          </div>
          <div className="bg-white dark:bg-[#343217] p-4 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center">
             {isEditing ? (
                 <input 
                    type="number" 
                    value={tempStats.weight} 
                    onChange={e => setTempStats({...tempStats, weight: parseInt(e.target.value)})} 
                    className="w-16 text-center bg-gray-100 dark:bg-black/20 rounded p-1 font-bold"
                 />
             ) : (
                <>
                    <span className="text-sm text-gray-400 font-medium">Poids</span>
                    <span className="text-xl font-bold mt-1">{user.stats.weight} <span className="text-sm text-gray-400 font-normal">kg</span></span>
                </>
             )}
          </div>
          <div className="bg-white dark:bg-[#343217] p-4 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center">
             {isEditing ? (
                 <input 
                    type="number" 
                    value={tempStats.height} 
                    onChange={e => setTempStats({...tempStats, height: parseInt(e.target.value)})} 
                    className="w-16 text-center bg-gray-100 dark:bg-black/20 rounded p-1 font-bold"
                 />
             ) : (
                <>
                    <span className="text-sm text-gray-400 font-medium">Taille</span>
                    <span className="text-xl font-bold mt-1">{user.stats.height} <span className="text-sm text-gray-400 font-normal">cm</span></span>
                </>
             )}
          </div>
        </section>

        <div className="flex justify-center">
             <button 
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors ${isEditing ? 'bg-primary text-black' : 'text-primary bg-primary/10'}`}
             >
                 {isEditing ? 'Sauvegarder les mesures' : 'Modifier mes mesures'}
             </button>
        </div>

        {/* Goals */}
        <section>
          <div className="flex items-center justify-between px-1 pb-3 pt-2">
            <h3 className="text-lg font-bold tracking-tight">Mes Objectifs</h3>
            <Link to="/goals" className="text-sm font-bold text-primary hover:text-[#dcd805] transition-colors">Modifier</Link>
          </div>
          <div className="bg-white dark:bg-[#343217] rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-[#45421f] flex items-center gap-4">
              <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-full">
                <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-sm">Calories / jour</span>
                  <span className="text-sm font-medium text-gray-500">{user.goals.dailyCalories} kcal</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-[#23220f] rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full">
                <span className="material-symbols-outlined text-blue-500">monitor_weight</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-sm">Poids cible</span>
                  <span className="text-sm font-medium text-gray-500">{user.goals.targetWeight} kg</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-[#23220f] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(user.goals.targetWeight / user.stats.weight) * 85}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Settings Links */}
        <section>
          <h3 className="text-lg font-bold tracking-tight px-1 pb-3 pt-2">Compte & Préférences</h3>
          <div className="bg-white dark:bg-[#343217] rounded-xl shadow-sm overflow-hidden flex flex-col">
            <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#45421f] transition-colors border-b border-gray-100 dark:border-[#45421f]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">fitness_center</span>
                <span className="font-medium">Préférences d'entraînement</span>
              </div>
              <span className="material-symbols-outlined text-gray-400 text-sm">arrow_forward_ios</span>
            </a>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#45421f] transition-colors border-b border-gray-100 dark:border-[#45421f]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">notifications</span>
                <span className="font-medium">Notifications</span>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
              </div>
            </div>
            <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#45421f] transition-colors border-b border-gray-100 dark:border-[#45421f]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">lock</span>
                <span className="font-medium">Confidentialité</span>
              </div>
              <span className="material-symbols-outlined text-gray-400 text-sm">arrow_forward_ios</span>
            </a>
            <a href="#" className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#45421f] transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-gray-400">credit_card</span>
                <span className="font-medium">Abonnement</span>
              </div>
              <span className="text-xs bg-primary/20 text-primary-dark px-2 py-1 rounded font-bold uppercase tracking-wide">Premium</span>
            </a>
          </div>
        </section>
        
        <section className="pt-4">
            <Link to="/login" className="w-full py-4 text-red-500 font-bold bg-red-50 dark:bg-red-900/10 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">logout</span>
                Déconnexion
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4">Version 2.4.0</p>
        </section>
      </main>
    </>
  );
};

export default Profile;