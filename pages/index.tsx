import Head from "next/head";
import Banner from "@/components/blocks/banner";
import DetailsBlock from "@/components/blocks/details-block";
import Projects from "@/components/blocks/projects";
import Testimonials from "@/components/blocks/testimonials";
import apolloClient from "@/lib/apolloclient";
import { GET_HOMEPAGE_DATA } from "@/lib/queries";
import { BannerItem, CardDetails } from "@/utils/types";

interface Props {
  testimonies: CardDetails[];
  bannerItems: BannerItem[];
  completedProjects: any[];
  underConstructionProjects: any[];
}

export default function Home({ testimonies, bannerItems }: Props) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Studio NT Architecture | Innovative Architecture in South Africa</title>
        <meta
          name="description"
          content="Studio NT Architecture is a leading architecture agency based in South Africa, delivering innovative and sustainable architectural designs tailored to your vision."
        />
        <meta
          name="keywords"
          content="architecture, South Africa, Studio NT, architectural designs, sustainable architecture, modern architecture, architecture agency"
        />
        <meta name="author" content="Studio NT Architecture" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="Studio NT Architecture | Innovative Architecture in South Africa" />
        <meta
          property="og:description"
          content="Explore Studio NT Architecture, where innovation meets sustainability. We specialize in creating modern, functional, and sustainable architectural designs in South Africa."
        />
        <meta property="og:url" content="https://www.studiontarchitecture.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.studiontarchitecture.com/images/og-image.jpg" // Replace with your actual OG image URL
        />
        <meta property="og:image:alt" content="Studio NT Architecture - Innovative Designs" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Studio NT Architecture | Innovative Architecture in South Africa" />
        <meta
          name="twitter:description"
          content="Discover cutting-edge architectural designs by Studio NT Architecture. Based in South Africa, we specialize in delivering exceptional and sustainable projects."
        />
        <meta
          name="twitter:image"
          content="https://www.studiontarchitecture.com/images/twitter-image.jpg" // Replace with your actual Twitter image URL
        />
        <meta name="twitter:image:alt" content="Studio NT Architecture - Building a Better Future" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`min-h-[80vh] w-full`}>
        <Banner bannerItems={bannerItems} />
        <DetailsBlock />
        <Projects />
        <Testimonials testimonies={testimonies} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await apolloClient.query({
      query: GET_HOMEPAGE_DATA
    });

    return {
      props: {
        bannerItems: data?.bannerItemCollection?.items,
        testimonies: data?.cardCollection?.items,
        completedProjects: data?.completedProjects?.items,
        underConstructionProjects: data?.cardCollection?.items
      },
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return {
      props: {
        item: null,
      },
    };
  }
}

