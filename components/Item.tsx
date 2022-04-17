import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableNativeFeedback } from "react-native";
import { Artists, Characters, Parodys, Tags, TypeKor } from "../module/kitomi";
import { CharacterObject, TagObject } from "../types/Info";
import Tag from "./Tag";

interface Props {
    item: any;
}

interface State {
}

const ScreenHeight = Dimensions.get('window').height * 0.8;

export class Item extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    onPress() {
        console.log("clicked@");
    }

    onLongPress() {

    }

    render() {
        const { item } = this.props;
        return (
            <View style={styles.border}>
                <TouchableNativeFeedback
                    onPress={this.onPress}
                    onLongPress={this.onLongPress}>
                    <Image
                        style={[styles.image, { alignSelf: 'center' }]}
                        source={{ uri: `https://tn.hiyobi.me/tn/${item.id}.jpg` }}
                    />
                </TouchableNativeFeedback>
                <Text style={styles.title} onPress={this.onPress}>
                    {item.title}
                </Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.info}>
                        작가 : {Artists(item.artists, item.groups)}
                    </Text>
                    {item.characters.length > 0 ? <Text style={styles.info}>캐릭 : {Characters(item.characters)}</Text> : null}
                    {item.parodys.length > 0 ? <Text style={styles.info}>원작 : {Parodys(item.parodys)}</Text> : null}
                    <Text style={styles.info}>
                        종류 : {TypeKor(item.type)}
                    </Text>
                    <Text style={styles.info}>
                        <Text>태그 : </Text>
                        {item.tags.length > 0 ?
                            <View style={styles.tags}>
                                {Tags(item.tags).map((x: TagObject) => <Tag tag={x} key={x.value} />)}
                            </View> : null}
                    </Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
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
