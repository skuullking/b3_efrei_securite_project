
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, Exercise, Set as SetType, Session } from '../context/AppContext';

const AVAILABLE_EXERCISES = [
  { name: 'Développé Couché', muscle: 'Pectoraux', type: 'barbell' },
  { name: 'DC Haltères', muscle: 'Pectoraux', type: 'dumbbell' },
  { name: 'Pompes', muscle: 'Pectoraux', type: 'bodyweight' },
  { name: 'Tractions', muscle: 'Dos', type: 'bodyweight' },
  { name: 'Tirage Vertical', muscle: 'Dos', type: 'machine' },
  { name: 'Rowing Haltère', muscle: 'Dos', type: 'dumbbell' },
  { name: 'Squat', muscle: 'Jambes', type: 'barbell' },
  { name: 'Presse à Cuisses', muscle: 'Jambes', type: 'machine' },
  { name: 'Leg Extension', muscle: 'Jambes', type: 'machine' },
  { name: 'Dips', muscle: 'Triceps', type: 'bodyweight' },
  { name: 'Curl Haltères', muscle: 'Biceps', type: 'dumbbell' },
  { name: 'Développé Militaire', muscle: 'Épaules', type: 'barbell' },
  { name: 'Élévations Latérales', muscle: 'Épaules', type: 'dumbbell' },
  { name: 'Gainage', muscle: 'Abdominaux', type: 'bodyweight' },
  { name: 'Course à pied', muscle: 'Cardio', type: 'cardio' },
];

const MUSCLES = ['Tous', 'Pectoraux', 'Dos', 'Jambes', 'Épaules', 'Bras', 'Abdominaux', 'Cardio'];
const TYPES = ['Tous', 'barbell', 'dumbbell', 'machine', 'bodyweight', 'cardio'];

const NewSession: React.FC = () => {
  const navigate = useNavigate();
  const { saveAsTemplate } = useApp();
  
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isPickingExercise, setIsPickingExercise] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMuscle, setActiveMuscle] = useState('Tous');
  const [activeType, setActiveType] = useState('Tous');

  const filteredAvailableExercises = useMemo(() => {
    return AVAILABLE_EXERCISES.filter(ex => {
      const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchMuscle = activeMuscle === 'Tous' || ex.muscle === activeMuscle || (activeMuscle === 'Bras' && (ex.muscle === 'Biceps' || ex.muscle === 'Triceps'));
      const matchType = activeType === 'Tous' || ex.type === activeType;
      return matchSearch && matchMuscle && matchType;
    });
  }, [searchQuery, activeMuscle, activeType]);

  const handleSave = () => {
    if (!name) return alert("Veuillez donner un nom à la séance");
    if (exercises.length === 0) return alert("Ajoutez au moins un exercice");
    
    // Enregistre en tant que modèle (Library)
    saveAsTemplate({
      id: Date.now().toString(),
      name: name,
      date: new Date().toISOString(),
      durationMinutes: 45,
      status: 'planned',
      exercises: exercises,
    });
    
    navigate('/workouts'); // Redirection vers la bibliothèque
  };

  const addExerciseToSession = (exData: any) => {
    const newEx: Exercise = {
      id: Date.now().toString(),
      name: exData.name,
      muscle: exData.muscle,
      type: exData.type,
      sets: [
        { id: Math.random().toString(36).substr(2, 9), reps: 0, weight: 0, durationSeconds: 0, restSeconds: 60, completed: false }
      ]
    };
    setExercises([...exercises, newEx]);
    setIsPickingExercise(false);
    setSearchQuery('');
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const addSet = (exIndex: number) => {
    const newExercises = [...exercises];
    const lastSet = newExercises[exIndex].sets[newExercises[exIndex].sets.length - 1];
    newExercises[exIndex].sets.push({
      id: Math.random().toString(36).substr(2, 9),
      reps: lastSet?.reps || 0,
      weight: lastSet?.weight || 0,
      durationSeconds: lastSet?.durationSeconds || 0,
      restSeconds: lastSet?.restSeconds || 60,
      completed: false
    });
    setExercises(newExercises);
  };

  const removeSet = (exIdx: number, setIdx: number) => {
    if (exercises[exIdx].sets.length <= 1) return;
    const newExercises = [...exercises];
    newExercises[exIdx].sets.splice(setIdx, 1);
    setExercises(newExercises);
  };

  const updateSet = (exIdx: number, setIdx: number, field: keyof SetType, value: any) => {
    const newExercises = [...exercises];
    newExercises[exIdx].sets[setIdx] = {
      ...newExercises[exIdx].sets[setIdx],
      [field]: value
    };
    setExercises(newExercises);
  };

  if (isPickingExercise) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen animate-in slide-in-from-right duration-300">
        <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/50 p-4">
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <button onClick={() => setIsPickingExercise(false)} className="flex items-center justify-center size-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">search</span>
              <input 
                type="text" 
                placeholder="Chercher un exercice..."
                className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          
          <div className="max-w-md mx-auto mt-4 space-y-3">
             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {MUSCLES.map(m => (
                  <button 
                    key={m} 
                    onClick={() => setActiveMuscle(m)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeMuscle === m ? 'bg-primary text-black' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}
                  >
                    {m}
                  </button>
                ))}
             </div>
             <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {TYPES.map(t => (
                  <button 
                    key={t} 
                    onClick={() => setActiveType(t)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black transition-all ${activeType === t ? 'bg-zinc-900 dark:bg-white text-white dark:text-black' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
          </div>
        </header>

        <main className="max-w-md mx-auto p-4 space-y-3">
          {filteredAvailableExercises.length > 0 ? (
            filteredAvailableExercises.map((ex, i) => (
              <button 
                key={i} 
                onClick={() => addExerciseToSession(ex)}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-primary transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">fitness_center</span>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-base">{ex.name}</h4>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase">{ex.muscle} • {ex.type}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-zinc-300 group-hover:text-primary transition-colors">add_circle</span>
              </button>
            ))
          ) : (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-4xl text-zinc-300 mb-2">search_off</span>
              <p className="text-zinc-500 font-medium">Aucun exercice trouvé</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-40">
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center justify-between p-4 h-16 max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <h1 className="text-base font-bold tracking-tight">Nouveau Modèle</h1>
          <button onClick={handleSave} className="bg-primary text-black hover:bg-primary-dark px-5 py-2 rounded-full text-sm font-bold shadow-glow transition-all active:scale-95">
             Enregistrer
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 flex flex-col gap-6">
        <div className="relative group">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du modèle (ex: Full Body)..." 
            className="block w-full bg-transparent border-0 border-b-2 border-zinc-200 dark:border-zinc-700 px-0 py-4 text-2xl font-black placeholder:text-zinc-300 dark:placeholder:text-zinc-600 focus:border-primary focus:ring-0 transition-colors rounded-none" 
            autoFocus
          />
        </div>

        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">list_alt</span>
            <p className="text-lg font-bold">Modèle vide</p>
            <p className="text-sm">Ajoutez des exercices pour ce modèle</p>
          </div>
        ) : (
          exercises.map((exo, exIdx) => (
            <section key={exo.id} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-soft border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between p-4 border-b border-zinc-50 dark:border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary p-2 rounded-xl flex items-center justify-center size-10 shadow-sm">
                    <span className="material-symbols-outlined text-xl">fitness_center</span>
                  </div>
                  <div>
                    <h3 className="text-base font-black leading-tight">{exo.name}</h3>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">{exo.muscle}</p>
                  </div>
                </div>
                <button onClick={() => removeExercise(exo.id)} className="text-zinc-300 hover:text-red-500 transition-colors p-2">
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>

              <div className="grid grid-cols-12 gap-1 px-4 py-2 bg-zinc-50/50 dark:bg-zinc-800/30 text-[9px] font-black text-zinc-400 uppercase tracking-widest text-center">
                <div className="col-span-1">#</div>
                <div className="col-span-2">Reps</div>
                <div className="col-span-2">Kg</div>
                <div className="col-span-3">Durée</div>
                <div className="col-span-3">Repos</div>
                <div className="col-span-1"></div>
              </div>

              <div className="p-2 space-y-2">
                {exo.sets.map((set, setIdx) => (
                  <div key={set.id} className="grid grid-cols-12 gap-1.5 items-center">
                    <div className="col-span-1 flex justify-center">
                      <span className="text-[10px] font-black text-zinc-300">{setIdx + 1}</span>
                    </div>
                    <div className="col-span-2">
                      <input type="number" value={set.reps || ''} onChange={e => updateSet(exIdx, setIdx, 'reps', parseInt(e.target.value) || 0)} className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl py-2 text-center font-bold text-xs" />
                    </div>
                    <div className="col-span-2">
                      <input type="number" value={set.weight || ''} onChange={e => updateSet(exIdx, setIdx, 'weight', parseFloat(e.target.value) || 0)} className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl py-2 text-center font-bold text-xs" />
                    </div>
                    <div className="col-span-3">
                      <input type="number" value={set.durationSeconds || ''} onChange={e => updateSet(exIdx, setIdx, 'durationSeconds', parseInt(e.target.value) || 0)} className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl py-2 text-center font-bold text-xs" />
                    </div>
                    <div className="col-span-3">
                      <input type="number" value={set.restSeconds || ''} onChange={e => updateSet(exIdx, setIdx, 'restSeconds', parseInt(e.target.value) || 0)} className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl py-2 text-center font-bold text-xs text-primary" />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {setIdx > 0 && (
                        <button onClick={() => removeSet(exIdx, setIdx)} className="text-zinc-300 hover:text-red-400 p-1">
                          <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-zinc-50 dark:border-zinc-800/50">
                <button onClick={() => addSet(exIdx)} className="w-full py-2 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 text-zinc-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Ajouter une série
                </button>
              </div>
            </section>
          ))
        )}
      </main>

      <div className="fixed bottom-10 left-0 right-0 z-40 px-6 flex justify-center">
        <button 
          onClick={() => setIsPickingExercise(true)}
          className="w-full max-w-sm bg-zinc-900 dark:bg-white text-white dark:text-black shadow-xl rounded-3xl h-16 flex items-center justify-center gap-3 font-black text-base uppercase tracking-wider"
        >
          <span className="material-symbols-outlined font-black">add</span>
          Ajouter un exercice
        </button>
      </div>
    </div>
  );
};

export default NewSession;
