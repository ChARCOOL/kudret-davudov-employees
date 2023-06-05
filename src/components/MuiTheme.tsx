import { blue } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: `"Manrope", sans-serif`,
		fontSize: 16
	},
	palette: {
		primary: {
			main: blue[500]
		}
	}
})

export const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
