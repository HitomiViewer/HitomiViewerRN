export interface OriginalGallery {
    id: number | string;
    title: string;
    language?: string;

    group?: string | unknown;
    series?: string | unknown;

    tags?: Array<unknown> | unknown;
    artists?: Array<unknown> | unknown;
    parodys?: Array<unknown> | unknown;
    characters?: Array<unknown> | unknown;
    
    type?: unknown;
}
