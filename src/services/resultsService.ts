import type { Result } from '../types'

// Importy JSONů zůstávají – roky se drží na 1 místě.
import results2019 from '../data/results_2019.json'
import results2023 from '../data/results_2023.json'
import results2024 from '../data/results_2024.json'
import results2025 from '../data/results_2025.json'

/**
 Jediné místo, kde se řeší dostupné ročníky.
 Přidání nového ročníku = přidat import + přidat do YEARS.
 */
export const YEARS = [2019, 2023, 2024, 2025] as const

const RESULTS_BY_YEAR: Record<(typeof YEARS)[number], Result[]> = {
  2019: results2019 as Result[],
  2023: results2023 as Result[],
  2024: results2024 as Result[],
  2025: results2025 as Result[],
}

export const getAllResults = (): Result[] =>
  YEARS.flatMap((year) => RESULTS_BY_YEAR[year])
