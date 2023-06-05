export interface EmployeePair {
	id: string
	empID1: number
	empID2: number
	projectID: number
	daysWorked: number
}

export interface Project {
	empID: number
	projectID: number
	dateFrom: Date
	dateTo: Date
}
