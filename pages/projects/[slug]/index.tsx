import React from 'react'
import apolloClient from '@/lib/apolloclient'
import { GET_PROJECT, GET_RELATED_PROJECTS } from '@/lib/queries'
import { GetServerSideProps } from 'next'
import Container from '@/components/ui-components/container';

interface Props {
    project: any;
    relatedProjects: any
}

const ProjectDetails: React.FC<Props> = ({ project, relatedProjects }) => {
    return (
        <Container className='min-h-[80vh] '>
            Project details page
        </Container>
    )
}

export default ProjectDetails


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.query;



    try {
        const { data: projectData } = await apolloClient.query({
            query: GET_PROJECT,
            variables: { slug },
        });

        const project = projectData?.projectCollection?.items[0] || null;

        if (!project) {
            return { notFound: true };
        }

        const stage = project.stage;

        const { data: relatedProjectsData } = await apolloClient.query({
            query: GET_RELATED_PROJECTS,
            variables: { stage, slug },
        });

        const relatedProjects = relatedProjectsData?.projectCollection?.items || [];

        return {
            props: {
                project,
                relatedProjects,
            },
        };
    } catch (error) {
        console.error('Error fetching project or related projects:', error);
        return {
            props: {
                project: null,
                relatedProjects: [],
            },
        };
    }
}