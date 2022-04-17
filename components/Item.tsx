import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableNativeFeedback, ImageSourcePropType } from "react-native";
import { OriginalGallery } from "../types/Module";
import Tag from "./Tag";

export interface PropsTemplate {
    item: OriginalGallery;
    navigation: DrawerNavigationProp<RootParamList>;
}

export interface State {
}

export class ItemTemplate<Props extends PropsTemplate, State = void> extends React.Component<Props, State> {
    protected styles = StyleSheet.create({
        border: {
            width: '100%',
            maxWidth: 540,
            alignSelf: 'center',
            marginBottom: 24,
            padding: 5,
            borderColor: 'rgba(0, 0, 0, 0.16)',
            borderWidth: 1,
            borderRadius: 3
        },
        image: {
            width: '100%',
            height: 300,
            resizeMode: 'contain',
            backgroundColor: 'rgb(238, 238, 238)'
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        info: {
            fontSize: 16
        },
        tags: {
            flexWrap: 'wrap',
            flexDirection: 'row'
        }
    });

    constructor(props: Props) {
        super(props);
    }

    protected onPress(props: Props) {
        const { item, navigation } = this.props;
        //navigation.navigate('Viewer', { id: item.id });
    }

    protected onLongPress() {

    }

    get data(): OriginalGallery {
        return {} as any;
    }

    get imageSource(): ImageSourcePropType {
        return {};
    }

    get imageComponent() {
        return (
            <Image
                style={[this.styles.image, { alignSelf: 'center' }]}
                source={this.imageSource}
            />
        )
    }

    protected artistToString(artists: unknown): string { return ''; }
    protected groupToString(group: unknown): string { return ''; }

    get artistsComponent() {
        const { artists, group } = this.data;
        if (!Array.isArray(artists)) return null;
        if (artists.length) return null;
        return (
            <Text style={this.styles.info}>
                작가 : {this.artistToString(artists) + `(${this.groupToString(group)})`}
            </Text>
        );
    }

    protected characterToString(characters: unknown): string { return ''; }

    get charactersComponent() {
        const { characters } = this.data;
        if (!Array.isArray(characters)) return null;
        if (characters.length) return null;
        return (
            <Text style={this.styles.info}>
                캐릭 : {this.characterToString(characters)}
            </Text>
        );
    }

    protected parodyToString(parodys: unknown): string { return ''; }

    get parodysComponent() {
        const { parodys } = this.data;
        if (!Array.isArray(parodys)) return null;
        if (parodys.length) return null;
        return (
            <Text style={this.styles.info}>
                원작 : {this.parodyToString(parodys)}
            </Text>
        );
    }

    protected typeToString(type: unknown): string { return ''; }

    get typeComponent() {
        const { type } = this.data;
        return (
            <Text style={this.styles.info}>
                종류 : {this.typeToString(type)}
            </Text>
        );
    }

    protected tagKeyExtractor(tag: unknown): string { return ''; }

    get tagsComponent() {
        const { tags } = this.data;
        if (!Array.isArray(tags)) return null;
        if (tags.length) return null;
        return (
            <Text style={this.styles.info}>
                <Text>태그 : </Text>
                <View style={this.styles.tags}>
                    {tags.map(x => <Tag tag={x} key={this.tagKeyExtractor(x)} />)}
                </View>
            </Text>
        );
    }

    render() {
        const item = this.data;
        return (
            <View style={this.styles.border}>
                <TouchableNativeFeedback
                    onPress={(event) => this.onPress(this.props)}
                    onLongPress={this.onLongPress}>
                    {this.imageComponent}
                </TouchableNativeFeedback>
                <Text style={this.styles.title} onPress={(event) => this.onPress(this.props)}>
                    {item.title}
                </Text>
                <View style={{ marginTop: 10 }}>
                    {this.artistsComponent}
                    {this.charactersComponent}
                    {this.parodysComponent}

                    {this.tagsComponent}
                </View>
            </View>
        );
    }
};
