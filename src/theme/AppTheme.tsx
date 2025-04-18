import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { blackThemeLight} from './theme';


export const AppTheme = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={blackThemeLight}>
            <CssBaseline />
            {children}
        </ThemeProvider>

    )
}
