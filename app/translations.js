export const translations = {
  en: {
    homeTitle: "Learning Website for Kids",
    homeSubtitle: "Learn weekdays, months, clocks and multiplication.",
    weekdays: "Weekdays",
    months: "Months",
    clock: "Read the Clock",
    multiplication: "Multiplication",
    backHome: "← Back home",
  },
  de: {
    homeTitle: "Lernwebsite für Kinder",
    homeSubtitle: "Lerne Wochentage, Monate, Uhrzeiten und das Einmaleins.",
    weekdays: "Wochentage",
    months: "Monate",
    clock: "Uhr lesen",
    multiplication: "Einmaleins",
    backHome: "← Zurück zur Startseite",
  },
  fr: {
    homeTitle: "Site d’apprentissage pour enfants",
    homeSubtitle: "Apprends les jours, les mois, l’heure et les multiplications.",
    weekdays: "Jours de la semaine",
    months: "Mois",
    clock: "Lire l’heure",
    multiplication: "Multiplications",
    backHome: "← Retour à l’accueil",
  },
  it: {
    homeTitle: "Sito di apprendimento per bambini",
    homeSubtitle: "Impara i giorni, i mesi, l’orologio e le moltiplicazioni.",
    weekdays: "Giorni della settimana",
    months: "Mesi",
    clock: "Leggere l’orologio",
    multiplication: "Moltiplicazioni",
    backHome: "← Torna alla home",
  },
  es: {
    homeTitle: "Sitio de aprendizaje para niños",
    homeSubtitle: "Aprende los días, los meses, el reloj y las multiplicaciones.",
    weekdays: "Días de la semana",
    months: "Meses",
    clock: "Leer el reloj",
    multiplication: "Multiplicaciones",
    backHome: "← Volver al inicio",
  },
  pt: {
    homeTitle: "Site de aprendizagem para crianças",
    homeSubtitle: "Aprende os dias, os meses, as horas e as multiplicações.",
    weekdays: "Dias da semana",
    months: "Meses",
    clock: "Ler o relógio",
    multiplication: "Multiplicações",
    backHome: "← Voltar ao início",
  },
};

export function getLanguage() {
  if (typeof window === "undefined") return "en";

  const browserLanguage = navigator.language.slice(0, 2).toLowerCase();

  if (translations[browserLanguage]) {
    return browserLanguage;
  }

  return "en";
}
