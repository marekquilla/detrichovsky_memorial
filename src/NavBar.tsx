import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

export default function NavBar() {
    const { pathname } = useLocation()

    return (
        <AppBar position="sticky" elevation={1}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Dětřichovský memoriál
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        color={pathname === '/' ? 'inherit' : 'secondary'}
                        component={RouterLink}
                        to="/"
                    >
                        Výsledky
                    </Button>
                    <Button
                        color={pathname === '/about' ? 'inherit' : 'secondary'}
                        component={RouterLink}
                        to="/about"
                    >
                        O závodě
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
