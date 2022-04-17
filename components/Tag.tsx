import React from "react";
import { StyleSheet, Text } from "react-native";

export default class TagTemplate<Props> extends React.Component<Props> {
    protected styles = StyleSheet.create({
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

    get tagStyle(): object | null {
        return null;
    }
    get tagDisplay(): string {
        return '';
    }

    render() {
        return (
            <Text style={[this.styles.tag, this.tagStyle]}>
                {this.tagDisplay}
            </Text>
        );
    }
}
