
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, Session } from '../context/AppContext';

const WorkoutLibrary: React.FC = () => {
  const { templates, deleteTemplate, addSession } = useApp();
  const navigate = useNavigate();

  const handlePlanQuickly = (template: Session) => {
    // Navigue vers le planning avec ce modèle présélectionné (via state ou juste naviguer)
    navigate('/planning', { state: { selectedTemplateId: template.id } });
  };

  return (
    <div className="space-y-6 pb-20">
      <header className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-black tracking-tight">Mes Séances</h1>
          <button 
            onClick={() => navigate('/new-session')}
            className="size-10 bg-primary text-black rounded-full flex items-center justify-center shadow-glow"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <p className="text-sm font-medium text-gray-500">Gérez vos modèles d'entraînement</p>
      </header>

      <main className="px-4 space-y-4">
        {templates.length === 0 ? (
          <div className="text-center py-20 opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">fitness_center</span>
            <p className="font-bold">Aucune séance enregistrée</p>
            <p className="text-xs">Créez votre première séance type !</p>
          </div>
        ) : (
          templates.map((template) => (
            <div 
              key={template.id} 
              className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-100 dark:border-zinc-800 shadow-soft group hover:border-primary transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">exercise</span>
                  </div>
                  <div>
                    <h3 className="font-black text-lg leading-tight">{template.name}</h3>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      {template.exercises.length} exercices • ~{template.durationMinutes} min
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTemplate(template.id)}
                  className="text-zinc-300 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>

              <div className="flex gap-2 mb-6 flex-wrap">
                {[...new Set(template.exercises.map(e => e.muscle))].map(m => (
                  <span key={m} className="text-[10px] font-bold bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-500">{m}</span>
                ))}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handlePlanQuickly(template)}
                  className="flex-1 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Planifier
                </button>
                <button 
                  onClick={() => navigate(`/active-session/${template.id}`)}
                  className="flex-1 py-3 bg-primary text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-glow hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Lancer
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default WorkoutLibrary;
