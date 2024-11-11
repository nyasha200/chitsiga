import React from 'react'
import Container from '../ui-components/container'
import Link from 'next/link';
import Text from '../ui-components/text';

type FooterLink = {
    title: string;
    link: string;
}
const footerLinks: FooterLink[] = [
    {
        title: 'Projects',
        link: '/projects'
    },
    {
        title: 'Contact Us',
        link: '/contact'
    },
    {
        title: 'Privacy',
        link: '/privacy'
    },
    {
        title: 'Terms & Conditions',
        link: '/terms'
    },
]

const Footer = () => {
    return (
        <Container>
            <div className='flex flex-col lg:flex-row lg:justify-center gap-8'>
                {footerLinks.map((footerLink, index) => (
                    <FooterLinkComponent key={index} footerLink={footerLink} />
                ))}
            </div>
            <Text variant='link' additional='w-full text-center mt-4'>
                &copy; {new Date().getFullYear()} SiDesigned. All rights reserved.
            </Text>
        </Container>
    )
}

export default Footer

const FooterLinkComponent = ({ footerLink }: { footerLink: FooterLink }) => (
    <Link href={footerLink.link} >
        <Text variant='link' color='gray' additional='!hover:text-black'>
            {footerLink.title}
        </Text>
    </Link>
)


