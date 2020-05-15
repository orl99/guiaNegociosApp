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
    // There is more data to map in this interface, but it may not be need it in the app
}
