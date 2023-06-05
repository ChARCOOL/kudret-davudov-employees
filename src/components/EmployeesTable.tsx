import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useProjectContext } from '../contexts/ProjectContext'
import useEmployeePairs from '../hooks/useEmployeePairs'
import { EmployeePair } from '../types'
import styled from '@emotion/styled'
import { blue } from '@mui/material/colors'

const columns: GridColDef<EmployeePair>[] = [
	{ field: 'empID1', headerName: 'Employee ID #1', minWidth: 100, flex: 1 },
	{ field: 'empID2', headerName: 'Employee ID #2', minWidth: 100, flex: 1 },
	{ field: 'projectID', headerName: 'Project ID', minWidth: 100, flex: 1 },
	{ field: 'daysWorked', headerName: 'Days Worked', minWidth: 100, flex: 1 }
]

const EmployeesTable = () => {
	const { projects } = useProjectContext()

	const rows = useEmployeePairs(projects)

	return (
		<Wrapper>
			{rows.length === 0 && <NoDataText>No data</NoDataText>}
			{rows.length > 0 && <StyledDataGrid rowSelection={false} rows={rows} columns={columns} />}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 2rem;
`

const NoDataText = styled.div`
	font-family: 'Manrope', sans-serif;
	font-size: 24px;
	font-weight: bold;
	text-align: center;
`

const StyledDataGrid = styled(DataGrid)`
	& .MuiDataGrid-columnHeader {
		background-color: ${blue[500]};
		color: #fff;
		font-weight: bold;
	}

	& .MuiDataGrid-row {
		&:nth-of-type(even) {
			background-color: #f5f5f5;
		}
	}
` as typeof DataGrid

export default EmployeesTable
