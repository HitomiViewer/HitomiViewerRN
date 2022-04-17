import React, { Component, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Modal, StyleSheet } from "react-native";
import { ImageObject } from "../types/Image";

const Dimension = Dimensions.get('window');

const styles = StyleSheet.create({
    absoluteview: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: Dimension.width,
        height: Dimension.height
    }
});

const fetchData = (url: string) => {
    let request = new XMLHttpRequest();
    
    request.onreadystatechange = () => {
        console.log(request);
    };

    request.open('GET', url);
    request.send();
};

export function Viewer({ id }: { id: number }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true);
        var link = `https://cdn.hiyobi.me/json/${id}_list.json`;
        console.log(link);
        fetchData(link)
    };

    const renderItem = ({ item }: { item: ImageObject }) => {
        return (
            <Image
                source={{ uri: `https://cdn.hiyobi.me/data/${id}/${item.name}` }}
            />
        );
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <FlatList
            data={data}
            style={[styles.absoluteview, { flex: 1 }]}
            renderItem={renderItem}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={true}
        />
    );
}

export default Viewer;