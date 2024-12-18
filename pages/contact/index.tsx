import React from 'react'
import Container from '@/components/ui-components/container'
import Text from '@/components/ui-components/text'
import apolloClient from '@/lib/apolloclient'
import { GET_CONTACT_LINKS } from '@/lib/queries'
import { ContactLink } from '@/utils/types'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
    contactLinks: ContactLink[];
}

const Contact = ({ contactLinks }: Props) => {
    return (
        <>
            <Head>
                <title>Contact Us - Studio NT Architecture</title>
                <meta name="description" content="Get in touch with Studio NT Architecture for all your architectural service needs. We're here to help you design your dream space." />
                <meta name="keywords" content="contact, architecture, architectural services, Studio NT, design, consultation" />
                <meta name="author" content="Studio NT Architecture" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Contact Us - Studio NT Architecture" />
                <meta property="og:description" content="Get in touch with Studio NT Architecture for all your architectural service needs." />
                <meta property="og:image" content="https://images.ctfassets.net/00mxw1n99c7a/1KfHPuhjSXzirDSRI7Cuzi/9886a1bd5edcf9f48980883325c9370f/logo4n.png" />
                <meta property="og:url" content="YOUR_PAGE_URL" />
                <meta property="og:type" content="website" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us - Studio NT Architecture" />
                <meta name="twitter:description" content="Get in touch with Studio NT Architecture for all your architectural service needs." />
                <meta name="twitter:image" content="https://images.ctfassets.net/00mxw1n99c7a/1KfHPuhjSXzirDSRI7Cuzi/9886a1bd5edcf9f48980883325c9370f/logo4n.png" />
            </Head>
            <Container className='min-h-[70vh] w-full flex flex-col items-center'>
                <img
                    src='/assets/logo.png'
                    alt="Studio NT"
                    className="h-[132px]"
                />
                <div className='mt-4 flex flex-col items-center gap-4 w-full'>
                    {contactLinks.map((item, index) => (
                        <Link
                            href={item.link}
                            target='_blank'
                            key={index}
                            className='border border-2 border-gray-2 hover:border-brown-2 hover:bg-gray-3 rounded-full px-4 py-2 w-full sm:w-[80%] md:w-[60%] xl:w-[30%] transition-all duration-700 ease-out'
                        >
                            <div className='flex justify-start items-center gap-6'>
                                <img
                                    src={item.logo.url}
                                    alt=''
                                    className='w-10 h-10'
                                />
                                <Text>
                                    {item.text}
                                </Text>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </>
    )
}

export default Contact

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const { data } = await apolloClient.query({
            query: GET_CONTACT_LINKS,
        });

        return {
            props: {
                contactLinks: data?.contactLinkCollection?.items || [],
            },
        };
    } catch (error) {
        console.error('Error fetching projects:', error);
        return {
            props: {
                contactLinks: [],
            },
        };
    }
};