import React, { useState } from 'react';
import ProjectsBanner from '@/components/blocks/projects-banner';
import ProjectsFilter from '@/components/blocks/projects-filter';
import ProjectsList from '@/components/blocks/projects-list';
import Container from '@/components/ui-components/container';
import Text from '@/components/ui-components/text';
import apolloClient from '@/lib/apolloclient';
import { GET_PROJECTS } from '@/lib/queries';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface Props {
    projects: any[];
    selectedStage: string | null;
}

const ProjectsComponent = ({ projects, selectedStage }: Props) => {
    const [currentStage, setCurrentStage] = useState(selectedStage || 'ALL');
    const router = useRouter();

    const bannerProjects = projects.slice(0, 2);
    const listProjects = projects.slice(2);

    const handleFilterChange = (stage: string) => {
        setCurrentStage(stage);
        router.push(`/projects?stage=${stage}`);
    };

    return (
        <Container>
            <Text variant="title3" color="black" additional="my-4">
                Projects
            </Text>
            <ProjectsFilter selectedStage={currentStage} onFilterChange={handleFilterChange} />
            <ProjectsBanner projects={bannerProjects} />
            <ProjectsList projects={listProjects} />
        </Container>
    );
};

export default ProjectsComponent;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { stage } = context.query;

    try {
        const { data } = await apolloClient.query({
            query: GET_PROJECTS,
            variables: { stage: stage === 'ALL' ? null : stage },
        });

        return {
            props: {
                projects: data?.projectCollection?.items || [],
                selectedStage: stage || 'ALL',
            },
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return {
            props: {
                projects: [],
                selectedStage: stage || 'ALL',
            },
        };
    }
};