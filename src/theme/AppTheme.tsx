import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { purpleThemeLight } from './purpleTheme';


export const AppTheme = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={purpleThemeLight}>
            <CssBaseline />
            {children}
        </ThemeProvider>

    )
}
