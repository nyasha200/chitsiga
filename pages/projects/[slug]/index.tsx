'use client'

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import apolloClient from '@/lib/apolloclient';
import { GET_PROJECT, GET_RELATED_PROJECTS } from '@/lib/queries';
import { GetServerSideProps } from 'next';
import Container from '@/components/ui-components/container';
import Text from '@/components/ui-components/text';
import { Asset, Project } from '@/utils/types';
import ProjectCard from '@/components/cards/project';
import Image from 'next/image';
import RichText from '@/components/ui-components/rich-text';

interface Props {
  project: Project;
  relatedProjects: Project[];
}

const ProjectDetails: React.FC<Props> = ({ project, relatedProjects }) => {
  const galleryItems = project?.galleryCollection?.items;

  const firstAsset: Asset = galleryItems[0];
  const secondAsset: Asset = galleryItems[1];
  const thirdAndFourthAssets: Asset[] = galleryItems.slice(2, 4);
  const fifthAsset: Asset = galleryItems[4];
  const sixthToEighthAssets: Asset[] = galleryItems.slice(5, 8);

  // Generate keywords dynamically
  const keywords = [
    project.title,
    project.location,
    project?.client,
    'construction',
    'architecture',
    'design',
    'projects',
  ].join(', ');

  //carousel logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
      setIsFading(false);
    }, 300);
  };

  const handlePrevious = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
      );
      setIsFading(false);
    }, 300);
  };

  const handleBarClick = (index: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentBanner = galleryItems[currentIndex];

  return (
    <>
      {/* SEO and Meta Tags */}
      <Head>
        <title>{project.title} - {project.location}</title>
        <meta name="description" content={`Explore the details of the ${project?.title} project located in ${project?.location}, completed for ${project?.client}.`} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Studio NT Architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* OpenGraph Tags */}
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={`Explore the ${project.title} project located in ${project.location}.`} />
        <meta property="og:image" content={project.coverImage.url} />
        <meta property="og:url" content={`https://studiont.co.za/projects/${project.slug}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={`Explore the ${project.title} project located in ${project.location}.`} />
        <meta name="twitter:image" content={project.coverImage.url} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://studiont.co.za/projects/${project.slug}`} />
      </Head>

      <Container className="w-full">
        {/* Banner */}
        <div className="relative w-full h-[480px] lg:h-[720px] transition-opacity duration-300">
          <Image
            src={project.coverImage.url}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className=""
          />
          <Container className="absolute top-0 left-0 w-full h-[480px] lg:h-[720px] flex items-center justify-center px-8">
            <div className="transition-opacity duration-300 text-center">
              <Text variant="title1" additional=" !text-white" weight="bold">
                {project.title}
              </Text>
              <Text
                variant="body2"
                additional="mt-2 uppercase !text-white"
              >
                {project?.location}
              </Text>
            </div>
          </Container>
        </div>

        {/* Images and Descriptions */}
        <div className="w-full flex flex-col justify-center items-center">
          <Container className="!p-0 flex flex-col items-center justify-center w-full md:w-[80%]">
            {/* First asset */}
            <div className="relative w-full h-[580px] bg-black overflow-hidden mt-12 lg:mt-24">
              <div
                className={`relative w-full h-full transition-opacity duration-300 ${isFading ? 'opacity-80' : 'opacity-100'}`}
              >
                <Image
                  src={currentBanner?.url}
                  alt={currentBanner?.description}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-70"
                />
              </div>

              <Container className="absolute bottom-4 left-3/4 transform -translate-x-1/2 flex gap-4 md:translate-x-0 md:justify-start">
                <button
                  onClick={handlePrevious}
                  className="transform -translate-y-1/2 bg-white text-black text-[24px] rounded-full w-10 h-10 flex items-center justify-center hover:opacity-80"
                >
                  <img src="/assets/icons/back.svg" alt="" className="h-6 w-6" />
                </button>
                {galleryItems.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleBarClick(index)}
                    className={`w-6 h-[2px] rounded cursor-pointer ${currentIndex === index ? 'bg-brown-1' : 'bg-white'
                      }`}
                  ></div>
                ))}
                <button
                  onClick={handleNext}
                  className="transform -translate-y-1/2 bg-white text-black text-[24px] rounded-full w-10 h-10 flex items-center justify-center hover:opacity-80"
                >
                  <img src="/assets/icons/back.svg" alt="" className="h-6 w-6 rotate-180" />
                </button>
              </Container>
            </div>
            <Container className="">
              <div className={`text-left transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <Text variant="title4" additional=" !max-w-[640px]">
                  {currentBanner.description}
                </Text>
              </div>
            </Container>

            {project?.projectDetails && <div className='mt-12 lg:mt-24'>
              <RichText content={project?.projectDetails} />
            </div>}

            {/* Second asset */}
            {secondAsset && (
              <Container className="my-8 md:my-12 grid grid-cols-1 md:grid-cols-2">
                <div className=" h-full flex flex-col justify-center md:my-0 order-2 md:ml-48">
                  <Text variant="body1" additional="!max-w-[440px] mt-8">
                    {secondAsset?.description}
                  </Text>
                </div>
                <div className="flex justify-center items-center order-1">
                  <Image
                    src={secondAsset?.url}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-[520px] object-cover"
                  />
                </div>
              </Container>
            )}

            {/* Third and fourth assets */}
            {thirdAndFourthAssets && (
              <Container className="my-8 md:my-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 lg:gap-16">
                {thirdAndFourthAssets?.map((asset, index) => (
                  <Image
                    src={asset?.url}
                    key={index}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-[520px] object-cover"
                  />
                ))}
              </Container>
            )}

            {/* Fifth asset */}
            {fifthAsset && (
              <div className="my-12 md:my-32 flex flex-col w-full items-center">
                <Image
                  src={fifthAsset?.url}
                  alt=""
                  width={100}
                  height={100}
                  objectFit="cover"
                  className="h-[380] md:h-[520px] w-full object-cover"
                />
                <Text variant="title5" color="black" weight="normal" additional="mt-12 text-center !font-normal lg:w-[67%]">
                  {fifthAsset?.description}
                </Text>
              </div>
            )}

            {/* Sixth, seventh, and eighth assets */}
            {sixthToEighthAssets && (
              <Container className="my-8 md:my-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12">
                {sixthToEighthAssets?.map((asset, index) => (
                  <Image
                    src={asset?.url}
                    key={index}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-[520px] object-cover"
                  />
                ))}
              </Container>
            )}
          </Container>
        </div>

        {/* Related projects */}
        <Text variant="title4" color="black" additional="my-4">
          Related Projects
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {relatedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ProjectDetails;

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
};






