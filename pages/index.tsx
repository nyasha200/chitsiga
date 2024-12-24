import Head from "next/head";
import Banner from "@/components/blocks/banner";
import DetailsBlock from "@/components/blocks/details-block";
import Projects from "@/components/blocks/projects";
import Testimonials from "@/components/blocks/testimonials";
import apolloClient from "@/lib/apolloclient";
import { GET_HOMEPAGE_DATA } from "@/lib/queries";
import { BannerItem, CardDetails, Project } from "@/utils/types";

interface Props {
  testimonies: CardDetails[];
  bannerItems: BannerItem[];
  completedProjects: Project[];
  underConstructionProjects: Project[];
  detailsCards: any[]
}

export default function Home({
  testimonies,
  bannerItems,
  completedProjects,
  underConstructionProjects,
  detailsCards
}: Props) {
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
        <meta property="og:url" content="https://www.studiont.co.za" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://images.ctfassets.net/00mxw1n99c7a/1KfHPuhjSXzirDSRI7Cuzi/9886a1bd5edcf9f48980883325c9370f/logo4n.png"
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
          content="https://images.ctfassets.net/00mxw1n99c7a/1KfHPuhjSXzirDSRI7Cuzi/9886a1bd5edcf9f48980883325c9370f/logo4n.png"
        />
        <meta name="twitter:image:alt" content="Studio NT Architecture - Building a Better Future" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`min-h-[80vh] w-full`}>
        <Banner bannerItems={bannerItems} />
        <DetailsBlock details={detailsCards[0]} textFirst />
        <Projects
          title="Current Projects"
          description=""
          projects={underConstructionProjects}
        />
        <DetailsBlock details={detailsCards[1]} textFirst={false} />
        <Projects
          title="Completed Projects"
          description=""
          projects={completedProjects}
        />
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
        underConstructionProjects: data?.underConstructionProjects?.items,
        detailsCards: data?.detailCards?.items
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

