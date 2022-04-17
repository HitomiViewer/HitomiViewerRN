import { ArtistObject, CharacterObject, DisplayValueObject, GroupObject, ParodyObject, TagObject } from "../types/Info";

export async function GetList(index: number) {
    return await fetch(`https://apiomi.nahee.kim/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `SELECT * FROM galleries ORDER BY id DESC LIMIT ${(index - 1) * 25},25`
        })
    }).then((res) => res.json())
        .then((res) => Refine(res))
        .catch((err) => {
            console.log(err);
            return [];
        });
}

export async function GetData(id: number) {
    return (await fetch(`https://apiomi.nahee.kim/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `SELECT * FROM galleries WHERE id=${id}`
        })
    }).then((res) => res.json())
        .then((res) => Refine(res))
        .catch((err) => {
            console.log(err);
            return [undefined];
        }))[0];
}

export async function GetFiles(ids: number[]) {
    return await fetch(`https://apiomi.nahee.kim/files`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `SELECT * FROM files WHERE oid in (${ids.filter(x => x).join(',')})`
        })
    }).then((res) => res.json())
        .catch((err) => {
            console.log(err);
            return [];
        });
}

export async function LoadTags(ids: any[] = []) {
    let data = await fetch('https://apiomi.nahee.kim/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: ids ? `SELECT * FROM tags WHERE oid in (${ids.filter(x => x).join(',')})` : 'SELECT *, oid FROM tags'
        })
    }).then((res) => res.json())
        .catch((err) => console.log(err));
    return new Map(data.map((x: any) => [x.rowid, x]))
}

export async function Refine(data: Array<any>) {
    let tags = await LoadTags(data.flatMap(x => x.tag_ids));
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