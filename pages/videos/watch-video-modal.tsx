import React from 'react';
import dynamic from 'next/dynamic';
import { Video } from '@/utils/types';
import Text from '@/components/ui-components/text';
import Container from '@/components/ui-components/container';

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false });

type Props = {
    video: Video;
    onClose: () => void;
};

const WatchVideoModal = ({ video, onClose }: Props) => {
    return (
        <div className="fixed inset-0 z-[1000] bg-black bg-opacity-90 flex items-center justify-center">
            {/* Modal Content */}
            <div className="relative bg-[#fefde9] w-[90%] max-w-[1040px] p-6 shadow-lg">
                {/* Back Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 !p-0  bg-brown-1 hover:bg-brown-2"
                >
                    <div className='flex gap-4 m-2 items-center'>
                        <img
                            src='/assets/icons/back_white.svg'
                            alt=''
                            className='w-[24px] h-[24px]'
                        />
                        <Text additional='!text-white  hidden:block' variant='title5'>
                            Back
                        </Text>
                    </div>
                </button>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-700 hover:text-gray-900"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.47 4.47a.75.75 0 011.06 0L12 10.94l6.47-6.47a.75.75 0 011.06 1.06L13.06 12l6.47 6.47a.75.75 0 01-1.06 1.06L12 13.06l-6.47 6.47a.75.75 0 01-1.06-1.06L10.94 12 4.47 5.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                <Container className='pt-12 lg:pt-24'>
                    <ReactPlayer
                        url={video?.link}
                        controls
                        width="100%"
                        height="60vh"
                        className="overflow-hidden"
                    />

                    <Text
                        variant="title5"
                        additional="mt-4 text-center !text-gray-800 !font-normal"
                    >
                        {video?.title}
                    </Text>
                </Container>
            </div>
        </div>
    );
};

export default WatchVideoModal;
