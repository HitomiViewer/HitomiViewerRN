import { ArtistObject, CharacterObject, DisplayValueObject, GroupObject, ParodyObject, TagObject } from "../types/Info";

export async function LoadTags() {
    let data = await fetch('https://apiomi.nahee.kim/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `SELECT *, oid FROM tags`
        })
    }).then((res) => res.json())
        .catch((err) => console.log(err));
    return new Map(data.map((x: any) => [x.rowid, x]))
}

export async function Refine(data: Array<any>) {
    let tags = await LoadTags();
    return data.map(x => ({
        artists: [x.artist],
        category: null,
        characters: [],
        comments: 0,
        count: 0,
        groups: [],
        id: x.id,
        iswebp: false,
        language: x.language,
        like: 0,
        like_anonymous: 0,
        parodys: [],
        tags: x.tag_ids.split(',').map((x: string) => tags.get(+x)),
        files: x.file_ids.split(',').map(parseInt),
        title: x.title,
        type: x.type,
        uid: 0,
        uploader: 0,
        uploadername: "",
    }));
}

export function TypeKor(type: string) {
    return type;
}

export function Tags(tag: Array<any>): Array<TagObject> {
    return tag.filter(x => x).map(x => ({ display: x.full, value: x.full }))
}

export function Artists(artists: Array<ArtistObject>, groups: Array<GroupObject>) {
    var str = JoinDisplayValue(artists);
    if (groups.length > 0)
        str += " (" + JoinDisplayValue(groups) + ")";
    return str;
}

export function Characters(characters: Array<CharacterObject>) {
    return JoinDisplayValue(characters);
}

export function Parodys(parodys: Array<ParodyObject>) {
    return JoinDisplayValue(parodys);
}

export function JoinDisplayValue(displayvalue: Array<DisplayValueObject>) {
    return displayvalue.map(x => x.display).join(', ');
}