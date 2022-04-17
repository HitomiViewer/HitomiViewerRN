import { OriginalImageObject } from "../../../types/Image";
import { OriginalGallery } from "../../../types/Module";

export interface ImageObject extends OriginalImageObject {}

export interface DisplayValue {
    value: string;
    display: string;
}

export interface Gallery extends OriginalGallery {
    artists: Array<DisplayValue>;
    category: number;
    character: Array<DisplayValue>;
    comments: number;
    count: number;
    groups: Array<DisplayValue>;
    iswebp: boolean;
    language: string;
    like: number;
    like_anonymous: number;
    parodys: Array<DisplayValue>;
    tags: Array<DisplayValue>;
    type: number;
    uid: number;
    uploader: number;
    uploadername: string;
}