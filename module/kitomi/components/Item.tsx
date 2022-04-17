/// <reference path="Tag.tsx" />
import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import { ItemTemplate } from "../../../components/Item";
import { Gallery, TagObject } from "../types";
import { GetFile, LoadTags } from "../wrapper";
import { Tag } from "./Tag";

interface Props {
    item: Gallery;
    navigation: DrawerNavigationProp<RootParamList, 'Main-Kitomi'>;
}

interface State {
    imageUri?: string;
    tags: Array<TagObject>;
}

export class Item extends ItemTemplate<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            imageUri: undefined,
            tags: [],
        }
    }

    protected onPress(props: Props) {
        const { item, navigation } = this.props;
        navigation.navigate('Viewer-Kitomi', { id: item.id });
    }

    protected onLongPress() {

    }

    async loadImageURL() {
        let file_ids = this.props.item.file_ids.split(',').map(parseInt).filter(x => x);
        let image = await GetFile(file_ids[0])
        let blob = await fetch('https://apiomi.nahee.kim/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(image)
        }).then(res => res.blob())
            .catch(err => console.log(err));
        if (!blob) return;
        try{
            let link = URL.createObjectURL(blob);
            this.setState({ imageUri: link })
        }
        catch{}
    }

    async loadTags() {
        let tag_ids = this.props.item.tag_ids.split(',').map(parseInt).filter(x => x);
        let data = await LoadTags(tag_ids);
        
        this.setState({ tags: data });
    }

    async componentDidMount() {
        Promise.all([this.loadImageURL(), this.loadTags()])
    }

    get data(): Gallery {
        return this.props.item;
    }

    get imageSource() {
        if (!this.state.imageUri) return {};
        return { uri: this.state.imageUri };
    }

    get artistsComponent() {
        const { artist } = this.data;
        return (
            <Text style={this.styles.info}>
                작가 : {artist}
            </Text>
        );
    }

    get tagsComponent() {
        const { tags } = this.state;
        return (
            <Text style={this.styles.info}>
                <Text>태그 : </Text>
                <View style={this.styles.tags}>
                    {tags.map(x => <Tag tag={x} key={this.tagKeyExtractor(x)} />)}
                </View>
            </Text>
        );
    }

    get charactersComponent() { return null; }
    get parodysComponent() { return null; }

    protected tagKeyExtractor(tag: TagObject): string {
        return tag.full;
    }
}