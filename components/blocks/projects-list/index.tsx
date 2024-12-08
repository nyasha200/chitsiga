import ProjectCard from '@/components/cards/project'
import { Project } from '@/utils/types'
import React from 'react'

interface Props {
    projects: Project[];
}
const ProjectsList = ({ projects }: Props) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'>
            {projects.map((project, index) => <ProjectCard key={index} project={project} />)}

        </div>
    )
}

export default ProjectsList
