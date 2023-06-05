import { parse as csvParse } from 'csv-parse/browser/esm/sync'
import { DropzoneArea } from 'mui-file-dropzone'
import { useCallback } from 'react'
import { Project } from '../types'
import { useProjectContext } from '../contexts/ProjectContext'
import dayjs from 'dayjs'

const ProjectDropzone = () => {
	const { projects, setProjects } = useProjectContext()

	const handleFileChange = useCallback(async (loadedFiles: File[]) => {
		const [csvFile] = loadedFiles || []

		// Handle removing file
		if (!csvFile && projects) {
			setProjects([])
			return
		}

		if (!csvFile) {
			return
		}

		try {
			const csvText = await csvFile.text()
			const [columns, ...rows]: string[][] = csvParse(csvText, { bom: true })

			// Handle different order of columns
			const projectList: Project[] = rows.map((row) => {
				const empIDIdx = columns.indexOf('EmpID')
				const projectIDIdx = columns.indexOf('ProjectID')
				const dateFromIdx = columns.indexOf('DateFrom')
				const dateToIdx = columns.indexOf('DateTo')

				return {
					empID: parseInt(row[empIDIdx]),
					projectID: parseInt(row[projectIDIdx]),
					dateFrom: dayjs(row[dateFromIdx]),
					dateTo: row[dateToIdx] !== 'NULL' ? dayjs(row[dateToIdx]) : dayjs()
				}
			})

			setProjects(projectList)
		} catch (error) {
			console.error(error)
		}
	}, [])

	return (
		<DropzoneArea fileObjects={undefined} filesLimit={1} acceptedFiles={['text/csv']} onChange={handleFileChange} />
	)
}

export default ProjectDropzone
