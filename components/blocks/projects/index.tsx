import Container from '@/components/ui-components/container'
import React from 'react'
import Text from '@/components/ui-components/text'
import { Project } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    title: string;
    description: string;
    projects: Project[];
}

const Projects = ({
    title,
    description,
    projects
}: Props) => {
    return (
        <Container className="my-8 md:my-16">
            <div className='w-full flex justify-between items-center'>
                <Text variant="title3" color='black'>
                    {title}
                </Text>
                <Link href='/projects'>
                    <Text variant="label1" color='black' additional='uppercase !text-sm md:mr-4'>
                        View All
                    </Text>
                </Link>
            </div>
            <Text variant="title5" color='gray' additional="w-full max-w-[440px] mt-4 !text-khakhi">
                {description}
            </Text>
            <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {projects?.map((project, index) => (
                    <Link key={project.slug} href={`/projects/${project?.slug}`}>
                        <div
                            className={`relative overflow-hidden group ${index % 2 === 1 ? 'md:mt-12 lg:mt-20' : ''}`}
                        >
                            <Image
                                src={project.coverImage.url}
                                alt={project.title}
                                width={100}
                                height={100}
                                className="w-full h-[380px] object-cover transform transition-transform duration-500 ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] group-hover:scale-105"
                            />
                            <Text
                                variant="title5"
                                color="black"
                                additional="mt-8 group-hover:underline transition-all duration-300"
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
                ))}
            </div>
        </Container>
    )
}

export default Projects
