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

                <Box>
                    <Button
                        sx={{
                            color: pathname === '/' ? 'white' : 'rgba(255, 255, 255, 1.0)',
                            '&:hover': {
                                color: '#050503ff',
                                backgroundColor: 'transparent',
                            },
                        }}
                        component={RouterLink}
                        to="/"
                    >
                        Výsledky
                    </Button>
                    <Button
                        sx={{
                            color: pathname === '/about' ? 'white' : 'rgba(255, 255, 255, 1.0)',
                            '&:hover': {
                                color: '#0a0a08ff',
                                backgroundColor: 'transparent',
                            },
                        }}
                        component={RouterLink}
                        to="/about"
                    >
                        O závodě
                    </Button>
                </Box>
            </Toolbar>
        </AppBar >
    )
}
