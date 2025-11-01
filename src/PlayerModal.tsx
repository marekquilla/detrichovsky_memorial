import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import type { Result } from "./types";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface PlayerModalProps {
    open: boolean;
    onClose: () => void;
    playerName: string;
    playerResults: Result[];
}

const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = Math.floor(totalSec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
};

const parseTime = (time: string): number => {
    if (!time) return 0;

    const cleaned = time.split(".")[0];

    const parts = cleaned.split(":").map((p: string) => parseFloat(p));

    if (parts.length === 3) {
        // HH:MM:SS
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    if (parts.length === 2) {
        // MM:SS
        return parts[0] * 60 + parts[1];
    }
    return 0;
};

const PlayerModal: React.FC<PlayerModalProps> = ({ open, onClose, playerName, playerResults }) => {
    const sortedResults = [...playerResults].sort((a, b) => a.rocnik - b.rocnik);

    const data: ChartData<"line"> = {
        labels: sortedResults.map((r) => r.rocnik.toString()),
        datasets: [
            {
                label: "Čas v cíli",
                data: sortedResults.map((r) => parseTime(r.cas)),
                borderColor: "rgb(25, 118, 210)",
                backgroundColor: "rgba(25, 118, 210, 0.3)",
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `Čas: ${formatTime(context.parsed.y as number)}`,
                },
            },
        },
        scales: {
            x: { title: { display: true, text: "Ročník" } },
            y: {
                title: { display: true, text: "Čas (min:s)" },
                ticks: { callback: (value) => formatTime(Number(value)) },
            },
        },
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute" as const,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: 600 },
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Historie běžce – {playerName}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {playerResults.length > 0 ? (
                    <Line data={data} options={options} />
                ) : (
                    <Typography color="text.secondary">Žádné výsledky k dispozici.</Typography>
                )}
            </Box>
        </Modal>
    );
};

export default PlayerModal;
