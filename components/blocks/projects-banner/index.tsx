import { Project } from '@/utils/types';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@/components/ui-components/text';

type Props = {
    projects: Project[];
};

const ProjectsBanner = ({ projects }: Props) => {
    return (
        <div>
            {projects.map((project, index) => (
                <Link href={`/projects/${project.slug}`} className={`py-4 lg:py-16 lg:pt-8 flex flex-col lg:flex-row items-center gap-0 lg:gap-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                    key={project.slug}>
                    <div className="w-full relative overflow-hidden">
                        <Image
                            src={project.coverImage.url}
                            alt={project.title}
                            width={100}
                            height={100}
                            className="w-full h-[380px] object-cover transform transition-transform duration-500 ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] hover:scale-105"
                        />
                    </div>
                    <div className="w-full lg:w-[33%] text-left lg:ml-12">
                        <Text
                            variant="title4"
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
    );
};

export default ProjectsBanner;