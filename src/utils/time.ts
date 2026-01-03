/*
 Časy v JSONech se vyskytují v různých formátech napříč ročníky, např.:
 - "27:51,79" (čárka)
 - "00:28:49,56" (HH:MM:SS + čárka)
 - "00:25:59.700000" (tečka + mikrosekundy)
 - "" (prázdné)
 
 Proto:
 - normalizace čárky na tečku
 - zahodím desetinnou část
 - podpora MM:SS i HH:MM:SS
 - na chybná data řešení přes try/catch
 */
export const parseTimeToSeconds = (time: string): number | null => {
    try {
        if (!time) return null

        const normalized = time.replace(',', '.')
        const withoutFractions = normalized.split('.')[0]
        const parts = withoutFractions.split(':').map((p) => Number(p))

        if (parts.length < 2 || parts.length > 3) return null
        if (parts.some((n) => Number.isNaN(n) || n < 0)) return null

        if (parts.length === 3) {
            const [h, m, s] = parts
            return h * 3600 + m * 60 + s
        }

        const [m, s] = parts
        return m * 60 + s
    } catch {
        return null
    }
}

/*
 Formátování sekund do čitelného tvaru.
 Pro tabulku a tooltipy stačí mm:ss. (U dlouhých závodů by šlo rozšířit na hh:mm:ss.)
 */
export const formatSeconds = (seconds: number): string => {
    const safe = Number.isFinite(seconds) && seconds >= 0 ? seconds : 0
    const m = Math.floor(safe / 60)
    const s = Math.floor(safe % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}
