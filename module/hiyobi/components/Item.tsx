/// <reference path="Tag.tsx" />
import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import { View, Text, Image, TouchableNativeFeedback, ImageSourcePropType } from "react-native";
import { Tag } from ".";
import { Gallery } from "..";
import { ItemTemplate } from "../../../components/Item";
import { DisplayValue } from "../types";

interface Props {
    item: Gallery;
    navigation: DrawerNavigationProp<RootParamList, 'Main-Hiyobi'>;
}

export class HiyobiItem extends ItemTemplate<Props> {

    protected onPress(props: Props) {
        const { item, navigation } = this.props;
        navigation.navigate('Viewer-Hiyobi', { id: item.id });
    }

    protected onLongPress() {

    }

    get data(): Gallery {
        return this.props.item;
    }

    get imageSource(): ImageSourcePropType {
        return { uri: `https://tn.hiyobi.me/tn/${this.props.item.id}.jpg` };
    }

    protected artistToString(artists: DisplayValue[]) {
        return artists.map(x => x.display).join(',');
    }
    protected groupToString(groups: DisplayValue[]) {
        return groups.map(x => x.display).join(',');
    }
    get artistsComponent() {
        const { artists, groups } = this.data;
        if (!Array.isArray(artists)) return null;
        if (artists.length) return null;
        return (
            <Text style={this.styles.info}>
                작가 : {this.artistToString(artists) + `(${this.groupToString(groups)})`}
            </Text>
        );
    }

    get tagsComponent() {
        const { tags } = this.data;
        return (
            <Text style={this.styles.info}>
                <Text>태그 : </Text>
                <View style={this.styles.tags}>
                    {tags.map(x => <Tag tag={x} key={this.tagKeyExtractor(x)} />)}
                </View>
            </Text>
        );
    }

    protected characterToString(characters: DisplayValue[]): string {
        return characters.map(x => x.display).join(',');
    }
    protected parodyToString(parodys: DisplayValue[]): string {
        return parodys.map(x => x.display).join(',');
    }
    protected typeToString(type: number): string {
        return ['', '동인지', '망가', 'Cg아트', '게임Cg'][type];
    }
    protected tagKeyExtractor(tag: DisplayValue): string {
        return tag.value;
    }
}