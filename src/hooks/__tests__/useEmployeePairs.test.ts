import { renderHook } from '@testing-library/react-hooks'
import useEmployeePairs from '../useEmployeePairs'

describe('useEmployeePairs', () => {
	it('should return an empty array when no projects are provided', () => {
		const { result } = renderHook(() => useEmployeePairs([]))

		expect(result.current).toEqual([])
	})

	it('should return an empty array when there are no employee pairs', () => {
		const projects = [
			{
				projectID: 1,
				empID: 1,
				dateFrom: new Date('2021-01-01'),
				dateTo: new Date('2021-01-31')
			},
			{
				projectID: 2,
				empID: 2,
				dateFrom: new Date('2021-02-01'),
				dateTo: new Date('2021-02-28')
			}
		]

		const { result } = renderHook(() => useEmployeePairs(projects))

		expect(result.current).toEqual([])
	})

	it('should return an array of employee pairs when there are overlapping projects', () => {
		const projects = [
			{
				projectID: 1,
				empID: 1,
				dateFrom: new Date('2021-01-01'),
				dateTo: new Date('2021-01-31')
			},
			{
				projectID: 1,
				empID: 2,
				dateFrom: new Date('2021-01-15'),
				dateTo: new Date('2021-02-15')
			},
			{
				projectID: 2,
				empID: 1,
				dateFrom: new Date('2021-02-01'),
				dateTo: new Date('2021-02-28')
			},
			{
				projectID: 2,
				empID: 2,
				dateFrom: new Date('2021-02-15'),
				dateTo: new Date('2021-03-15')
			}
		]

		const { result } = renderHook(() => useEmployeePairs(projects))

		expect(result.current).toEqual([
			{
				id: '1-2-1',
				empID1: 1,
				empID2: 2,
				projectID: 1,
				daysWorked: 16
			},
			{
				id: '1-2-2',
				empID1: 1,
				empID2: 2,
				projectID: 2,
				daysWorked: 13
			}
		])
	})
})
