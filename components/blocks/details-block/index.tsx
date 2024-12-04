import Container from '@/components/ui-components/container';
import { HomepageCard } from '@/utils/types';
import React from 'react';
import Text from '@/components/ui-components/text';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Props = {
    textFirst: boolean;
    details: HomepageCard;
};

const DetailsBlock = ({ textFirst = true, details }: Props) => {
    const router = useRouter();
    return (
        <Container className="my-8 md:my-20 md:mx-24 grid grid-cols-1 md:grid-cols-3">
            <div
                className={`md:col-span-2 h-full flex flex-col justify-center md:my-0 ${textFirst ? 'order-1 ' : 'order-2 md:ml-48'}`}
            >
                <Text variant="title4" additional='mt-8'>{details?.title}</Text>
                <Text variant="body1" additional="!max-w-[440px] mt-8">
                    {details?.description}
                </Text>
                <div className="group mt-4 mb-8 cursor-pointer">
                    <Text
                        variant="body1"
                        additional="!text-brown-1 transition duration-200 ease-in-out"
                        onClick={() => router.push('/contact')}
                    >
                        {details.buttonText}
                        <span className="ml-2 text-[16px] bg-brown-1 text-white rounded-full p-1 px-[6px] group-hover:bg-gray-1 transition duration-200 ease-in-out">
                            ➔
                        </span>
                    </Text>
                </div>
            </div>
            <div className={`flex justify-center items-center ${textFirst ? 'order-2' : 'order-1'}`}>
                <Image
                    src={details?.image?.url}
                    alt={details?.title}
                    width={100}
                    height={100}
                    className="w-full h-[480px] object-cover"
                />
            </div>
        </Container>
    );
};

export default DetailsBlock;