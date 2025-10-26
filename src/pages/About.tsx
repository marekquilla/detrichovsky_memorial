import { Container, Paper, Typography, List, ListItem, ListItemText } from '@mui/material'

export default function About() {
    return (
        <Container sx={{ py: 3 }}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Běh pro zdraví
                </Typography>
                <Typography variant="h5">
                    O závodě
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Kdy" secondary="Každoročně 8. května" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Trať" secondary="Silniční běh na 8,1 km Dětřichov - Moravská Třebová" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Kategorie" secondary="Junioři, Muži A/B/C/D, Ženy A/B/C" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Pořadatel" secondary="Spolek branných sportů Mor. Třebová" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Spolupořadatel" secondary="Deset jarních kilometrů, z.s. (desetjarnichkm.cz)" />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    )
}
