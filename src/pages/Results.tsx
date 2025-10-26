import { useEffect, useState } from "react";
import { Container, Paper, Typography, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import results2019 from "../data/results_2019.json";
import results2023 from "../data/results_2023.json";
// import results2024 from "../data/results_2024.json";
// import results2025 from "../data/results_2025.json";

import type { Result } from "../types";
import PlayerModal from "../PlayerModal";

export default function Results() {
    const [rows, setRows] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlayer, setSelectedPlayer] = useState<Result | null>(null);
    const [playerHistory, setPlayerHistory] = useState<Result[]>([]);
    const [openModal, setOpenModal] = useState(false);

    // ✅ Načtení všech výsledků (zatím jen 2019, můžeš rozšířit o další)
    useEffect(() => {
        setTimeout(() => {
            const allResults = [
                ...results2019,
                ...results2023,
                // ...results2024,
                // ...results2025,
            ];
            setRows(allResults);
            setLoading(false);
        }, 500);
    }, []);

    // ✅ Kliknutí na jméno → otevře modální okno s grafem
    const handlePlayerClick = (player: Result) => {
        const allResults = [
            ...results2019,
            // ...results2023,
            // ...results2024,
            // ...results2025,
        ];

        const history = allResults.filter(
            (r) => r.jmeno === player.jmeno && r.prijmeni === player.prijmeni
        );

        setSelectedPlayer(player);
        setPlayerHistory(history);
        setOpenModal(true);
    };

    const columns: GridColDef<Result>[] = [
        { field: "rocnik", headerName: "Ročník", width: 90 },
        { field: "poradi", headerName: "Pořadí", width: 90 },
        { field: "cislo", headerName: "Číslo", width: 90 },
        {
            field: "fullname",
            headerName: "Jméno",
            flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams<Result>) => (
                <span
                    style={{
                        color: "#1976d2",
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                    onClick={() => handlePlayerClick(params.row)}
                >
                    {`${params.row.jmeno ?? ""} ${params.row.prijmeni ?? ""}`}
                </span>
            ),
        },
        { field: "narozeni", headerName: "Narození", width: 100 },
        { field: "klub", headerName: "Klub", flex: 2 },
        { field: "cas", headerName: "Čas", width: 150 },
        { field: "tempo", headerName: "Tempo", width: 90 },
        { field: "kategorie", headerName: "Kategorie", width: 120 },
    ];

    return (
        <Container sx={{ py: 3 }}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Výsledková tabulka
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <div style={{ height: 750, width: "100%" }}>
                        <DataGrid
                            rows={rows.map((row, index) => ({ id: index, ...row }))}
                            columns={columns}
                            disableRowSelectionOnClick
                            pageSizeOptions={[50]}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 50, page: 0 } },
                            }}
                        />
                    </div>
                )}

                {/* ✅ Modální okno pro historii závodníka */}
                {selectedPlayer && (
                    <PlayerModal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        playerName={`${selectedPlayer.jmeno} ${selectedPlayer.prijmeni}`}
                        playerResults={playerHistory}
                    />
                )}
            </Paper>
        </Container>
    );
}
