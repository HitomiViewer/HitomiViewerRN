import React from "react";
import { StyleSheet, Text } from "react-native";
import { TagObject } from "../types/Info";

interface Props {
    tag: TagObject
}

interface State {

}

export default class Tag extends React.Component<Props> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Text style={[styles.tag, getStyle(this.props.tag)]}>
                {this.props.tag.display}
            </Text>
        );
    }
}

function getStyle(tag: TagObject) {
    let data = tag.value.split(':');
    if (data.length > 0) {
        let type = data[0];
        if (type == "female")
            return styles.female;
        else if (type == "male")
            return styles.male;
        else
            return null;
    }
    else
        return null;
}

const styles = StyleSheet.create({
    tag: {
        backgroundColor: 'rgb(153, 153, 153)',
        fontSize: 12,
        color: 'white',
        padding: 3,
        marginLeft: 4,
        borderRadius: 5,
        justifyContent: 'center',
        height: 22
    },
    female: {
        backgroundColor: 'rgb(255, 94, 94)'
    },
    male: {
        backgroundColor: 'rgb(65, 149, 244)'
    }
});
