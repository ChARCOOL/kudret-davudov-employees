import { useMemo } from 'react'
import { Project, EmployeePair } from '../types'

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24

const useEmployeePairs = (projects: Project[]) => {
	return useMemo(() => {
		const projectMap: Record<number, Project[]> = {}

		// Group projects by project ID
		projects.forEach((project) => {
			if (!projectMap[project.projectID]) {
				projectMap[project.projectID] = []
			}

			projectMap[project.projectID].push(project)
		})

		const employeePairs: EmployeePair[] = []

		// Loop through each project ID
		for (const projectID in projectMap) {
			const projectList = projectMap[projectID]

			const employeeMap: Record<number, Project> = {}

			// Group projects by employee ID
			projectList.forEach((project) => {
				const { empID } = project

				if (empID in employeeMap) {
					const sameEmployee = employeeMap[empID]

					// Merge overlapping date ranges
					sameEmployee.dateFrom = project.dateFrom < sameEmployee.dateFrom ? project.dateFrom : sameEmployee.dateFrom
					sameEmployee.dateTo = project.dateTo > sameEmployee.dateTo ? project.dateTo : sameEmployee.dateTo
				} else {
					employeeMap[empID] = project
				}
			})

			// Filter out projects where an employee worked on another project during the same time period
			const employeeList = Object.values(employeeMap)

			const filteredProjects = employeeList.filter((employee) => {
				const otherEmpIdProjects = employeeList.filter((other) => other !== employee)
				const smallestDateFrom = Math.min(...otherEmpIdProjects.map((other) => other.dateFrom.getTime()))

				return employee.dateTo.getTime() > smallestDateFrom
			})

			// Remove project if there are less than 2 filtered projects
			if (filteredProjects.length <= 1) {
				delete projectMap[projectID]
			} else {
				projectMap[projectID] = filteredProjects
			}
		}

		// Create employee pairs for each project ID
		for (const projectID in projectMap) {
			const projectList = projectMap[projectID]

			projectList.forEach((project1, idx) => {
				projectList.slice(idx + 1).forEach((project2) => {
					const start1 = project1.dateFrom.getTime()
					const end1 = project1.dateTo.getTime()
					const start2 = project2.dateFrom.getTime()
					const end2 = project2.dateTo.getTime()

					if (end1 < start2 || end2 < start1) {
						return
					}

					const overlapStart = Math.max(start1, start2)
					const overlapEnd = Math.min(end1, end2)

					employeePairs.push({
						id: `${project1.empID}-${project2.empID}-${project1.projectID}`,
						empID1: project1.empID,
						empID2: project2.empID,
						projectID: project1.projectID,
						daysWorked: Math.ceil((overlapEnd - overlapStart) / MILLISECONDS_IN_DAY)
					})
				})
			})
		}

		return employeePairs
	}, [projects])
}

export default useEmployeePairs
