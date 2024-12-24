import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Container from '@/components/ui-components/container';
import { GetServerSideProps } from 'next';
import apolloClient from '@/lib/apolloclient';
import { GET_VIDEOS } from '@/lib/queries';
import { Video } from '@/utils/types';
import Text from '@/components/ui-components/text';
import Image from 'next/image';
import WatchVideoModal from './watch-video-modal';


type Props = {
    videos: Video[];
}
const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false });


const Videos = ({ videos }: Props) => {
    const [width, setWidth] = useState(0);
    const height = 640;
    const aspectRatio = 16 / 9;
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

    useEffect(() => {
        const updateWidth = () => {
            const maxWidth = window.innerWidth * 0.9;
            const calculatedWidth = Math.min(maxWidth, height * aspectRatio);
            setWidth(calculatedWidth);
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const firstVideo = videos[0]

    return (
        <>
            {selectedVideo && <WatchVideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
            <Container className="min-h-[75vh]">
                <div className=" flex flex-col items-center justify-center overflow-none">
                    <ReactPlayer
                        url={firstVideo?.link}
                        controls={true}
                        width={width}
                        height={height}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                    <Text variant='title4' additional='mt-4 md:mt-8'>
                        {firstVideo?.title}
                    </Text>
                </div>

                <div className='my-12 lg:my-24 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'>
                    {videos.map((video, index) => (
                        <div className={`cursor-pointer group w-full`} key={index} onClick={() => setSelectedVideo(video)}>
                            <div className="w-full relative overflow-hidden">
                                <Image
                                    src={video?.thumbnail?.url}
                                    alt={video?.title}
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
                                    {video?.title}
                                </Text>
                            </div>
                        </div>
                    ))}

                </div>
            </Container>
        </>
    );
};

export default Videos;

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { data } = await apolloClient.query({
            query: GET_VIDEOS,
        });

        return {
            props: {
                videos: data?.videoCollection?.items || [],
            },
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return {
            props: {
                videos: [],
            },
        };
    }
};
