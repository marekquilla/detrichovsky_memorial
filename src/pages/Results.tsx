import { useMemo, useState, useCallback } from 'react'
import { Container, Paper, Typography, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'

import type { Result } from '../types'
import PlayerModal from '../PlayerModal'
import { getAllResults } from '../services/resultsService'
import { parseTimeToSeconds, formatSeconds } from '../utils/time'

export default function Results() {
    const { t } = useTranslation()

    const [selectedPlayer, setSelectedPlayer] = useState<Result | null>(null)
    const [playerHistory, setPlayerHistory] = useState<Result[]>([])
    const [openModal, setOpenModal] = useState(false)

    /*
     Výsledky jsou statické -> useMemo.
     Díky tomu se pole nevytváří znovu při každém renderu
     */
    const allResults = useMemo(() => getAllResults(), [])

    /*
     Klik na běžce: najdeme jeho historii v předpočítaném allResults.
     */
    const handlePlayerClick = useCallback(
        (player: Result) => {
            const history = allResults.filter(
                (r) =>
                    r.firstName === player.firstName &&
                    r.lastName === player.lastName &&
                    r.birthYear === player.birthYear
            )

            setSelectedPlayer(player)
            setPlayerHistory(history)
            setOpenModal(true)
        },
        [allResults]
    )

    const columns: GridColDef<Result>[] = [
        { field: 'year', headerName: t('columns.year'), width: 90 },
        { field: 'place', headerName: t('columns.place'), width: 90 },
        { field: 'bib', headerName: t('columns.bib'), width: 90 },
        {
            field: 'fullName',
            headerName: t('columns.name'),
            flex: 1,
            sortable: true,
            /*
             valueGetter je klíčové pro filtrování/řazení:
             renderCell může být libovolné UI, ale DataGrid filtruje podle hodnoty sloupce
             */
            valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
            renderCell: (params) => (
                <Box
                    component="span"
                    sx={{
                        color: 'primary.main',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                    onClick={() => handlePlayerClick(params.row)}
                >
                    {params.value}
                </Box>
            ),
        },
        { field: 'birthYear', headerName: t('columns.birthYear'), width: 110 },
        { field: 'club', headerName: t('columns.club'), flex: 2 },
        {
            field: 'time',
            headerName: t('columns.time'),
            width: 140,
            /*
             Řazení času: místo stringu převádíme na sekundy (number | null).
             Zobrazení pro člověka řeší valueFormatter.
             */
            valueGetter: (_, row) => parseTimeToSeconds(row.time),
            valueFormatter: (value) => {
                if (value == null) return t('results.noTime')
                return formatSeconds(Number(value))
            },
            sortComparator: (a, b) => {
                // null - řadit až na konec
                if (a == null && b == null) return 0
                if (a == null) return 1
                if (b == null) return -1
                return a - b
            },
        },
        { field: 'pace', headerName: t('columns.pace'), width: 90 },
        { field: 'category', headerName: t('columns.category'), width: 140 },
    ]

    return (
        <Container sx={{ py: 3 }}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    {t('results.title')}
                </Typography>

                <Box sx={{ height: 750 }}>
                    <DataGrid
                        rows={allResults}
                        columns={columns}
                        //Stabilní ID bez přepisování rows:
                        getRowId={(r) =>
                            `${r.year}-${r.category}-${r.place}-${r.bib}-${r.birthYear}-${r.lastName}-${r.firstName}`
                        }
                        disableRowSelectionOnClick
                        pageSizeOptions={[50]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 50, page: 0 } },
                        }}
                    />
                </Box>

                {selectedPlayer && (
                    <PlayerModal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        playerName={`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
                        playerResults={playerHistory}
                    />
                )}
            </Paper>
        </Container>
    )
}
