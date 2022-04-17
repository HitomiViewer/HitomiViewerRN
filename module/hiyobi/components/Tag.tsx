import React from "react";
import { StyleSheet, Text } from "react-native";
import { DisplayValue } from "..";
import TagTemplate from "../../../components/Tag";

interface Props {
    tag: DisplayValue
}

export class Tag extends TagTemplate<Props> {
    get tagStyle() {
        const { tag } = this.props;
        switch (tag.value.split(':')[0]) {
            case "female":
                return this.styles.female;
            case "male":
                return this.styles.male;
            default:
                return null;
        }
    }

    get tagDisplay() {
        return this.props.tag.display;
    }
}
