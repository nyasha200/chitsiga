import { Project } from '@/utils/types'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Text from '@/components/ui-components/text'


const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <Link href={`/projects/${project.slug}`} className={``}
            key={project.slug}>
            <div className="w-full relative overflow-hidden">
                <Image
                    src={project.coverImage.url}
                    alt={project.title}
                    width={100}
                    height={100}
                    className="w-full h-[280px] object-cover transform transition-transform duration-500 ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] hover:scale-105"
                />
            </div>
            <div className="w-full text-left">
                <Text
                    variant="title5"
                    color="black"
                    additional="mt-8 group-hover:underline transition-all duration-300 !h-[54px]"
                >
                    {project?.title}
                </Text>
                <Text
                    variant="body2"
                    additional="mt-2 uppercase !text-[14px] !text-brown-2"
                >
                    {project?.location}
                </Text>
            </div>
        </Link>
    )
}

export default ProjectCard
