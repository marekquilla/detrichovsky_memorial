import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    lng: 'cs',
    fallbackLng: 'cs',
    interpolation: { escapeValue: false },
    resources: {
        cs: {
            translation: {
                appTitle: 'Dětřichovský memoriál',
                nav: {
                    results: 'Výsledky',
                    about: 'O závodě',
                    language: 'Jazyk',
                },
                results: {
                    title: 'Výsledková tabulka',
                    noTime: '—',
                },
                columns: {
                    year: 'Ročník',
                    place: 'Pořadí',
                    bib: 'Číslo',
                    name: 'Jméno',
                    birthYear: 'Narození',
                    club: 'Klub',
                    time: 'Čas',
                    pace: 'Tempo',
                    category: 'Kategorie',
                },
                modal: {
                    title: 'Historie běžce',
                    noResults: 'Žádné výsledky k dispozici.',
                    timeLabel: 'Čas',
                    yearLabel: 'Ročník',
                },
            },
        },
        en: {
            translation: {
                appTitle: 'Detrichovsky Memorial',
                nav: {
                    results: 'Results',
                    about: 'About',
                    language: 'Language',
                },
                results: {
                    title: 'Results table',
                    noTime: '—',
                },
                columns: {
                    year: 'Year',
                    place: 'Place',
                    bib: 'Bib',
                    name: 'Name',
                    birthYear: 'Birth year',
                    club: 'Club',
                    time: 'Time',
                    pace: 'Pace',
                    category: 'Category',
                },
                modal: {
                    title: 'Runner history',
                    noResults: 'No results available.',
                    timeLabel: 'Time',
                    yearLabel: 'Year',
                },
            },
        },
    },
})

export default i18n
