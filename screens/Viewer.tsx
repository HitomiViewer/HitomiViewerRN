import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { Component, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Modal, StyleSheet, View, Text } from "react-native";
import { GetFiles } from "../module/hiyobi";
import { } from "../module/kitomi";
import { ImageObject } from "../types/Image";

const Dimension = Dimensions.get('window');

const styles = StyleSheet.create({
    absoluteview: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: Dimension.width,
        height: Dimension.height
    },
    image: {
        width: Dimension.width,
        height: Dimension.height,
        resizeMode: 'contain'
    }
});

type Props = DrawerScreenProps<RootParamList, 'Viewer'>;

interface State {
    data: Array<any>;
    loading: boolean;
}

export function ViewerScreen(props: Props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const flatListRef = React.createRef<FlatList<any>>();

    useEffect(() => {
        flatListRef.current?.scrollToOffset({ offset: 0 });
        fetchData(props.route.params.id);
    }, [props.route.params.id]);

    function renderItem({ item }: { item: ImageObject }, id: number) {
        return (
            <Image
                style={[styles.image, { alignSelf: 'center' }]}
                source={{ uri: `https://cdn.hiyobi.me/data/${id}/${item.hash}.webp` }}
            />
        );
    };

    async function fetchData(id: number) {
        let files = await GetFiles(id);
        setData(files);
    };

    return (
        <FlatList
            data={data}
            ref={flatListRef}
            style={[styles.absoluteview, { flex: 1 }]}
            renderItem={(item) => renderItem(item, props.route.params.id)}
            keyExtractor={(item: any) => item.hash}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={true}
        />
    );
}

// export class ViewerScreen extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             data: [],
//             loading: false
//         }
//         useEffect(() => {
//             this.fetchData(this.props.route.params.id);
//         }, [props.route.params.id]);
//     }

//     renderItem({ item }: { item: ImageObject }, id: number) {
//         return (
//             <Image
//                 style={[styles.image, { alignSelf: 'center' }]}
//                 source={{ uri: `https://cdn.hiyobi.me/data/${id}/${item.hash}.webp` }}
//             />
//         );
//     };

//     async fetchData(id: number) {
//         let files = await GetFiles(id);
//         this.setState({ data: files });
//     };

//     componentDidMount() {
//         this.fetchData(this.props.route.params.id);
//     }

//     render() {
//         return (
//             <FlatList
//                 data={this.state.data}
//                 style={[styles.absoluteview, { flex: 1 }]}
//                 renderItem={(item) => this.renderItem(item, this.props.route.params.id)}
//                 keyExtractor={item => item.hash}
//                 pagingEnabled
//                 horizontal
//                 showsHorizontalScrollIndicator={true}
//             />
//         );
//     }
// }

export default ViewerScreen;