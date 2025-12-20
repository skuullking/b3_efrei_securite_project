// Script d'initialisation MongoDB - Import du dataset d'exercices
// Ce script est exécuté automatiquement au démarrage du container MongoDB

const fs = require("fs");
const path = require("path");

// Connexion à la base de données
db = db.getSiblingDB("gymfit");

print("🏋️ Importation du dataset megaGymDataset.csv...");

// Lire le fichier CSV
const csvPath = "/docker-entrypoint-initdb.d/megaGymDataset.csv";
const csvContent = cat(csvPath);
const lines = csvContent.split("\n");

// Parser l'en-tête
const headers = lines[0].split(",");

// Convertir chaque ligne en document
const exercises = [];
for (let i = 1; i < lines.length; i++) {
  if (!lines[i].trim()) continue; // Skip empty lines

  // Parse CSV line (handling quoted fields)
  const values = [];
  let currentValue = "";
  let inQuotes = false;

  for (let j = 0; j < lines[i].length; j++) {
    const char = lines[i][j];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(currentValue.trim());
      currentValue = "";
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim()); // Add last value

  // Créer le document exercise
  const exercise = {
    title: values[1] || "",
    description: values[2] || "",
    type: values[3] || "",
    bodyPart: values[4] || "",
    equipment: values[5] || "",
    level: values[6] || "Beginner",
    rating: values[7] ? parseFloat(values[7]) : 0.0,
    ratingDesc: values[8] || "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // N'ajouter que si le titre existe
  if (exercise.title) {
    exercises.push(exercise);
  }
}

// Insérer les exercices dans la collection
if (exercises.length > 0) {
  try {
    db.exercises.insertMany(exercises, { ordered: false });
    print(`✅ ${exercises.length} exercices importés avec succès dans MongoDB`);
  } catch (e) {
    if (e.code === 11000) {
      print("⚠️ Certains exercices existent déjà (clés dupliquées)");
    } else {
      print("❌ Erreur lors de l'importation:", e.message);
    }
  }
} else {
  print("⚠️ Aucun exercice à importer");
}

// Créer les index
db.exercises.createIndex({ title: 1 });
db.exercises.createIndex({ bodyPart: 1 });
db.exercises.createIndex({ equipment: 1 });
db.exercises.createIndex({ level: 1 });

print("📊 Collection exercises initialisée avec les index");
