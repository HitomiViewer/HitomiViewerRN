import { ArtistObject, CharacterObject, DisplayValueObject, GroupObject, ParodyObject } from "../types/Info";

export function TypeKor(type: number) {
    switch(type) {
        case 1:
            return "동인지";
        case 2:
            return "망가";
        case 3:
            return "Cg아트";
        case 4:
            return "게임Cg";
    }
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