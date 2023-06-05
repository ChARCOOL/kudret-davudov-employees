import styled from '@emotion/styled'
import EmployeesTable from './components/EmployeesTable'
import GlobalStyle from './components/GlobalStyle'
import { MuiThemeProvider } from './components/MuiTheme'
import ProjectDropzone from './components/ProjectDropzone'
import { ProjectContextProvider } from './contexts/ProjectContext'

const App = () => {
	return (
		<MuiThemeProvider>
			<GlobalStyle />
			<ProjectContextProvider>
				<Wrappper>
					<BlueHeading>Sirma Solutions Task</BlueHeading>
					<ProjectDropzone />
					<EmployeesTable />
				</Wrappper>
			</ProjectContextProvider>
		</MuiThemeProvider>
	)
}

const Wrappper = styled.div`
	width: 100%;
	height: 100%;

	padding: 2rem;
`

const BlueHeading = styled.h1`
	font-family: 'Manrope', sans-serif;
	font-size: 3rem;
	font-weight: bold;
	color: #2196f3;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 0.2em;
	margin-bottom: 2rem;
	text-shadow: 2px 2px #0d47a1;
`

export default App
