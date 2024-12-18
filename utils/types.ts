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
}

export interface Project {
    __typename: string;
    title: string;
    stage: string;
    slug: string;
    location?: string;
    coverImage: Asset;
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