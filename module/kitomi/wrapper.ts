import { ImageObject, TagObject } from "./types";

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
        .catch((err) => {
            console.log(err);
            return [undefined];
        }))[0];
}

export async function GetFile(id: number): Promise<ImageObject> {
    return await fetch(`https://apiomi.nahee.kim/files`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `SELECT * FROM files WHERE oid=${id}`
        })
    }).then((res) => res.json())
        .catch((err) => {
            console.log(err);
            return [];
        });
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

export async function LoadTags(ids: number[] = []): Promise<Array<TagObject>> {
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
    return data;
}

export async function LoadTagsWithKey(ids: number[] = []): Promise<Map<number, TagObject>> {
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