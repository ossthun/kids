export const translations = {
  en: {
    weekdays: "Weekdays",
    months: "Months",
    clock: "Read the Clock",
    multiplication: "Multiplication",
    backHome: "← Back home",
    check: "Check",
    skip: "Skip",
    tryAgain: "😊 Try again!",
    correct: "🎉 Correct!",
    score: "Score",
    answer: "Answer",
    weekdaysTitle: "📅 Weekdays",
    weekdaysSubtitle: "Put the weekdays in the correct order!",
    monthsTitle: "🗓️ Months",
    monthsSubtitle: "Put the months in the correct order!",
    multiplicationTitle: "✖️ Multiplication",
    multiplicationSubtitle: "Practise multiplication from 1 to 10.",
    clockTitle: "🕒 Read the Clock",
    clockSubtitle: "What time is shown?",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  de: {
    weekdays: "Wochentage",
    months: "Monate",
    clock: "Uhr lesen",
    multiplication: "Einmaleins",
    backHome: "← Zurück zur Startseite",
    check: "Prüfen",
    skip: "Überspringen",
    tryAgain: "😊 Versuch es nochmals!",
    correct: "🎉 Richtig!",
    score: "Punkte",
    answer: "Antwort",
    weekdaysTitle: "📅 Wochentage",
    weekdaysSubtitle: "Bringe die Wochentage in die richtige Reihenfolge!",
    monthsTitle: "🗓️ Monate",
    monthsSubtitle: "Bringe die Monate in die richtige Reihenfolge!",
    multiplicationTitle: "✖️ Einmaleins",
    multiplicationSubtitle: "Übe das Einmaleins von 1 bis 10.",
    clockTitle: "🕒 Uhr lesen",
    clockSubtitle: "Welche Zeit wird angezeigt?",
    days: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
  },
  fr: {
    weekdays: "Jours de la semaine",
    months: "Mois",
    clock: "Lire l’heure",
    multiplication: "Multiplications",
    backHome: "← Retour à l’accueil",
    check: "Vérifier",
    skip: "Passer",
    tryAgain: "😊 Essaie encore !",
    correct: "🎉 Correct !",
    score: "Score",
    answer: "Réponse",
    weekdaysTitle: "📅 Jours de la semaine",
    weekdaysSubtitle: "Mets les jours dans le bon ordre !",
    monthsTitle: "🗓️ Mois",
    monthsSubtitle: "Mets les mois dans le bon ordre !",
    multiplicationTitle: "✖️ Multiplications",
    multiplicationSubtitle: "Entraîne-toi avec les multiplications de 1 à 10.",
    clockTitle: "🕒 Lire l’heure",
    clockSubtitle: "Quelle heure est affichée ?",
    days: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  }
};

export function getLanguage() {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("language");
  if (saved && translations[saved]) return saved;
  const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
  return translations[browserLanguage] ? browserLanguage : "en";
}
