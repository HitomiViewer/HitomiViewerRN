import { DrawerScreenProps } from "@react-navigation/drawer";
import React, { Component, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, Modal, StyleSheet, View, Text } from "react-native";
import { OriginalImageObject } from "../types/Image";

const Dimension = Dimensions.get('window');

type Props = DrawerScreenProps<RootParamList>;

interface State<DataType> {
    data: Array<DataType>;
    loading: boolean;
}

// export function ViewerScreen(props: Props) {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const flatListRef = React.createRef<FlatList<any>>();

//     useEffect(() => {
//         flatListRef.current?.scrollToOffset({ offset: 0 });
//         fetchData(props.route.params.id);
//     }, [props.route.params.id]);

//     function renderItem({ item }: { item: ImageObject }, id: unknown) {
//         return (
//             <Image
//                 style={[styles.image, { alignSelf: 'center' }]}
//                 source={{ uri: `https://cdn.hiyobi.me/data/${id}/${item.hash}.webp` }}
//             />
//         );
//     };

//     async function fetchData(id: unknown) {
//         if (typeof id != 'number') return console.log("wrong id type");
//         let files = await GetFiles(id);
//         setData(files);
//     };

//     return (
//         <FlatList
//             data={data}
//             ref={flatListRef}
//             style={[styles.absoluteview, { flex: 1 }]}
//             renderItem={(item) => renderItem(item, props.route.params.id)}
//             keyExtractor={(item: any) => item.hash}
//             pagingEnabled
//             horizontal
//             showsHorizontalScrollIndicator={true}
//         />
//     );
// }

export class ViewerScreenTemplate<DataType extends OriginalImageObject> extends React.Component<Props, State<DataType>> {
    protected styles = StyleSheet.create({
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

    constructor(props: Props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
    }

    renderItem({ item }: { item: OriginalImageObject }, id: unknown) {
        return (
            <Image
                style={[this.styles.image, { alignSelf: 'center' }]}
                source={{ uri: `` }}
            />
        );
    };

    async fetchData(id: unknown) {
        if (typeof id != 'number') return console.log("wrong id type");
        //let files = await GetFiles(id);
        //this.setState({ data: files });
    };

    componentDidMount() {
        if (!('id' in this.props.route.params)) return;
        this.fetchData(this.props.route.params.id);
    }

    componentDidUpdate(prevProps: Props) {
        if (!('id' in this.props.route.params && 'id' in prevProps.route.params)) return;
        if (prevProps.route.params.id != this.props.route.params.id)
            this.fetchData(this.props.route.params.id);
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                style={[this.styles.absoluteview, { flex: 1 }]}
                renderItem={(item) => ('id' in this.props.route.params) ? this.renderItem(item, this.props.route.params.id) : null}
                keyExtractor={item => item.hash}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={true}
            />
        );
    }
}

export default ViewerScreenTemplate;