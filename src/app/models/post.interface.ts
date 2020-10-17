import { Tag } from './tags.interface';

export interface OldPost {
    id: string;
    date: string;
    date_gmt: string;
    guid: {rendered: string};
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {rendered: string};
    content: {rendered: string};
    excerpt: {rendered: string, protected: boolean};
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[];
    categories: number[];
    tags: number[];
    featured_image_urls: {
        medium: string;
        thumbnail: string;
        medium_large: string;
        logo: string;
    };
    appp_media: any;
    _links: any[];
    // There is more data to map in this interface, but it may not be need it in the app
}

interface ImageBaseI {
    file: string;
    width: number;
    height: number;
    mime_type: string;
    source_url: string;
}

export interface BasePostEmbeb {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    featured_media: number;
    template: string;
    "resource-categories": any[];
    // post_image?: ImageBaseI;
    _embedded: {
        "wp:featuredmedia": [{
            id: number;
            date: string;
            slug: string;
            type: string;
            link: string;
            title: {rendered: string};
            alt_text: string;
            source_url: string;
            media_details: {
                sizes: {
                    medium: ImageBaseI;
                    thumbnail: ImageBaseI;
                    medium_large: ImageBaseI;
                    full: ImageBaseI;
                }
            }
        }]
    }
}



export interface Post {
    id: number;
    title: string;
    content: string;
    slug: string;
    featured_image: {
        thumbnail: string;
        medium: string;
        large: string;
    };
    tags: Tag[];
    favorito?: boolean;
    // There is more data to map in this interface, but it may not be need it in the app
}


export interface PostFavorito {
    id: number;
    title: string;
}

