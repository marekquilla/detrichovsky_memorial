import { Modal, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { ChartOptions, ChartData } from 'chart.js'
import { useTranslation } from 'react-i18next'

import type { Result } from './types'
import { parseTimeToSeconds, formatSeconds } from './utils/time'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

interface PlayerModalProps {
    open: boolean
    onClose: () => void
    playerName: string
    playerResults: Result[]
}

export default function PlayerModal({ open, onClose, playerName, playerResults }: PlayerModalProps) {
    const { t } = useTranslation()

    const sortedResults = [...playerResults].sort((a, b) => a.year - b.year)

    /**
     Pokud je čas neparsovatelný (špatný formát v JSON), vracíme null.
     Chart.js potom daný bod prostě nevykreslí (lepší než to falšovat nulou).
     */
    const series: (number | null)[] = sortedResults.map((r) => parseTimeToSeconds(r.time))

    const data: ChartData<'line', (number | null)[]> = {
        labels: sortedResults.map((r) => r.year.toString()),
        datasets: [
            {
                label: t('columns.time'),
                data: series,
                borderColor: 'rgb(25,118,210)',
                backgroundColor: 'rgba(25,118,210,0.3)',
                tension: 0.3,
                fill: true,
                spanGaps: false, // nepřemosťovat chybějící hodnoty
            },
        ],
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        // ctx.parsed.y je podle typů number | null -> ošetříme korektně
                        const value = ctx.parsed.y
                        if (value == null) return `${t('modal.timeLabel')}: ${t('results.noTime')}`
                        return `${t('modal.timeLabel')}: ${formatSeconds(value)}`
                    },
                },
            },
        },
        scales: {
            x: { title: { display: true, text: t('modal.yearLabel') } },
            y: {
                title: { display: true, text: `${t('columns.time')} (mm:ss)` },
                ticks: {
                    callback: (value) => formatSeconds(Number(value)),
                },
            },
        },
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute' as const,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 600 },
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {t('modal.title')} – {playerName}
                    </Typography>
                    <IconButton onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {playerResults.length > 0 ? (
                    <Line data={data} options={options} />
                ) : (
                    <Typography color="text.secondary">{t('modal.noResults')}</Typography>
                )}
            </Box>
        </Modal>
    )
}
