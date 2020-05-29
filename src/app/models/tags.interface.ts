export interface Tag {
    term_id: number;
    name: string;
    slug: string;
    term_group: number;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
}
export interface LiteTag {
    id: number;
    name: string;
    slug: string;
}
