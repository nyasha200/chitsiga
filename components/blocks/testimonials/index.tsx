import React from 'react'
import Text from '@/components/ui-components/text'
import Container from '@/components/ui-components/container'
import TestimonyCard from '@/components/cards/testimonial'
import { CardDetails } from '@/utils/types'


const Testimonials = ({ testimonies }: { testimonies: CardDetails[] }) => {
    return (
        <Container className="my-8 md:my-16">
            <Text variant="title2" color='black'>
                Testimonies
            </Text>
            <Text variant="title5" color='gray' additional="w-full max-w-[440px] mt-4 !text-khakhi">
                Listen to what some of our clients say about our services
            </Text>
            <Container className='!px-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mt-4'>
                {testimonies?.map((testimony, index) => (
                    <TestimonyCard key={index} testimony={testimony} />
                ))}
            </Container>
        </Container>
    )
}

export default Testimonials
