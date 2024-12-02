import { CardDetails } from '@/utils/types'
import React from 'react'
import Image from 'next/image'
import Text from '@/components/ui-components/text'

type Props = {
    testimony: CardDetails;
}

const TestimonyCard = ({ testimony }: Props) => {
    return (
        <div className='w-full flex flex-col items-center justify-center text-center group cursor-pointer'>
            <Image
                src={testimony?.image?.url}
                alt=''
                width={100}
                height={100}
                className='h-[100px] w-[100px] object-cover rounded-full'
            />
            <Text variant='title5' additional='mt-4'>
                {testimony.title}
            </Text>
            <Text
                variant='body1'
                additional='mx-4 mt-4 group-hover:underline transition-all duration-300'
            >
                "{testimony.description}"
            </Text>
        </div>
    )
}

export default TestimonyCard