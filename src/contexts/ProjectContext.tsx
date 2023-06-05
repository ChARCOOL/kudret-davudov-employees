import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react'
import { Project } from '../types'

type State = {
	projects: Project[]
	setProjects: Dispatch<SetStateAction<Project[]>>
}

const Context = createContext<State>({
	projects: [],
	setProjects: () => void 0
})

type Props = {
	children: ReactNode | ReactNode[]
}

export const ProjectContextProvider = ({ children }: Props) => {
	const [projects, setProjects] = useState<Project[]>([])

	const value = useMemo(
		() => ({
			projects,
			setProjects
		}),
		[projects]
	)

	return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useProjectContext = () => {
	return useContext(Context)
}
