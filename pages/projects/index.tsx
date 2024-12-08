import React, { useState } from 'react';
import Head from 'next/head';
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
        <>
            <Head>
                <title>Projects | Studio NT Architecture</title>
                <meta
                    name="description"
                    content="Explore the projects by Studio NT Architecture. View projects in various stages including design, construction, and completed."
                />
                <meta
                    name="keywords"
                    content="architecture projects, Studio NT, design projects, construction, completed architecture"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Studio NT Architecture | Projects" />
                <meta
                    property="og:description"
                    content="Discover Studio NT Architecture's projects, categorized by design, construction, and completion stages."
                />
                <meta property="og:url" content="https://yourwebsite.com/projects" />
                <meta property="og:image" content="https://yourwebsite.com/images/projects-banner.jpg" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="Studio NT Architecture | Projects" />
                <meta
                    name="twitter:description"
                    content="View Studio NT Architecture's projects across various stages of completion."
                />
                <meta name="twitter:image" content="https://yourwebsite.com/images/projects-banner.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Container>
                <Text variant="title3" color="black" additional="my-4">
                    Projects
                </Text>
                <ProjectsFilter selectedStage={currentStage} onFilterChange={handleFilterChange} />
                <ProjectsBanner projects={bannerProjects} />
                <ProjectsList projects={listProjects} />
            </Container>
        </>
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