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
