import { OriginalImageObject } from "../../../types/Image";
import { OriginalGallery } from "../../../types/Module";

export interface ImageObject extends OriginalImageObject {}

export interface TagObject {
    full: string,
    name: string,
    type: string
}

export interface Gallery extends OriginalGallery {
    artist: string,
    date: string,
    japanese_title: string,
    language_localname: string,
    file_ids: string,
    tag_ids: string,
    tags?: Array<TagObject>,
    files?: Array<ImageObject>,
    type: string,    
}