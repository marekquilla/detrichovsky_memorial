import { AppBar, Box, Toolbar, Typography, Button, ButtonGroup } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NavBar() {
    const { pathname } = useLocation()
    const { t, i18n } = useTranslation()

    const linkButtonSx = (active: boolean) => ({
        color: active ? 'white' : 'rgba(255,255,255,0.85)',
        '&:hover': { color: '#000', backgroundColor: 'transparent' },
    })

    return (
        <AppBar position="sticky" elevation={1}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {t('appTitle')}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box>
                        <Button component={RouterLink} to="/" sx={linkButtonSx(pathname === '/')}>
                            {t('nav.results')}
                        </Button>
                        <Button component={RouterLink} to="/about" sx={linkButtonSx(pathname === '/about')}>
                            {t('nav.about')}
                        </Button>
                    </Box>
                    <ButtonGroup variant="outlined" size="small" aria-label={t('nav.language')}>
                        <Button
                            onClick={() => i18n.changeLanguage('cs')}
                            sx={{
                                bgcolor: i18n.language === 'cs' ? 'rgba(255,255,255,0.15)' : 'transparent',
                                color: 'white',
                            }}
                        >
                            CS
                        </Button>
                        <Button
                            onClick={() => i18n.changeLanguage('en')}
                            sx={{
                                bgcolor: i18n.language === 'en' ? 'rgba(255,255,255,0.15)' : 'transparent',
                                color: 'white',
                            }}
                        >
                            EN
                        </Button>
                    </ButtonGroup>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
