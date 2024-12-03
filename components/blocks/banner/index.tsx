'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BannerItem } from '@/utils/types';
import Container from '@/components/ui-components/container';
import Text from '@/components/ui-components/text';

interface Props {
    bannerItems: BannerItem[];
}

const Banner = ({ bannerItems }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const router = useRouter();

    const handleNext = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
            setIsFading(false);
        }, 300);
    };

    const handlePrevious = () => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? bannerItems.length - 1 : prevIndex - 1
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

    const currentBanner = bannerItems[currentIndex];

    return (
        <div className="relative w-full h-[720px] bg-black overflow-hidden">
            <div
                className={`relative w-full h-full transition-opacity duration-300 ${isFading ? 'opacity-80' : 'opacity-100'}`}
            >
                <Image
                    src={currentBanner.project.coverImage.url}
                    alt={currentBanner.title}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-70"
                />
            </div>

            <Container className="absolute top-0 left-0 w-full h-full flex items-center px-8">
                <div className={`text-left transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                    <Text variant="title1" additional="!text-white !max-w-[640px]">
                        {currentBanner.title}
                    </Text>
                    <button
                        onClick={() => router.push(`/projects/${currentBanner.project.slug}`)}
                        className="flex items-center mt-4 text-white font-medium hover:opacity-80"
                    >
                        Learn More
                        <span className="m-2 bg-brown-1 text-white rounded-full p-2 px-3 hover:bg-brown-2 transition duration-200 ease-in-out">
                            ➔
                        </span>
                    </button>
                </div>
            </Container>

            <Container className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 md:translate-x-0 md:justify-start">
                <button
                    onClick={handlePrevious}
                    className="transform -translate-y-1/2 bg-white text-black text-[24px] rounded-full w-10 h-10 flex items-center justify-center hover:opacity-80"
                >
                    <img src="/assets/icons/back.svg" alt="" className="h-6 w-6" />
                </button>
                {bannerItems.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => handleBarClick(index)}
                        className={`w-6 h-[2px] rounded cursor-pointer ${
                            currentIndex === index ? 'bg-brown-1' : 'bg-white'
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
    );
};

export default Banner;