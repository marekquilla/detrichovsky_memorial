/**
 * UI model – používá se v aplikaci.
 * Názvy polí jsou v angličtině (dle doporučení z code review).
 */
export interface Result {
    year: number
    place: number
    bib: number
    firstName: string
    lastName: string
    birthYear: number | null
    club: string
    time: string
    pace: string
    category: string
}