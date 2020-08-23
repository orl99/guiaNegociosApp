export interface Media {
        id: number;
        date: string;
        date_gmt: string;
        guid: {rendered: string};
        modified: string;
        modified_gmt: string;
        slug: string;
        status: string;
        type: string;
        link: string;
        title: {
            rendered: string;
        };
        author: number;
        comment_status: string;
        ping_status: string;
        template: string;
        meta: any[];
        description: {rendered: string};
        caption: {rendered: string};
        alt_text: string;
        media_type: string;
        mime_type: string;
        media_details: {
            width: number;
            height: number;
            sizes: {
                medium: ImageBaseI;
                thumbnail: ImageBaseI;
                medium_large: ImageBaseI;
                full: ImageBaseI;
            };
        };
}

interface ImageBaseI {
    file: string;
    width: number;
    height: number;
    mime_type: string;
    source_url: string;
}