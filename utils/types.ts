export interface CardDetails {
    image: {
        url: string;
        title: string;
    };
    title: string;
    description: string;
    type: string;
    x?: number;
    y?: number;

}

export interface BannerItem {
    title: string;
    project: {
        slug: string;
        coverImage: {
            url: string;
        }
    }
}

export interface Asset {
    __typename: string;
    url: string;
    description: string;
    width: number;
    height: number;
}

export interface Project {
    __typename: string;
    title: string;
    stage: string;
    slug: string;
    client: string;
    location?: string;
    coverImage: Asset;
    galleryCollection: {
        items: Asset[];
    };
    projectDetails: JSON;
}

export interface HomepageCard {
    __typename: "HomepageCard";
    title: string;
    description: string;
    buttonText: string;
    link: string;
    image: Asset;
}

export interface ContactLink {
    logo: Asset;
    link: string;
    text: string;
}

export interface Video {
    link: string;
    title: string;
    thumbnail: Asset;
}