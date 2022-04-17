import React from "react";
import { StyleSheet, Text } from "react-native";
import TagTemplate from "../../../components/Tag";
import { TagObject } from "../types";

interface Props {
    tag: TagObject
}

export class Tag extends TagTemplate<Props> {
    get tagStyle() {
        const { tag } = this.props;
        switch (tag.type) {
            case "female":
                return this.styles.female;
            case "male":
                return this.styles.male;
            default:
                return null;
        }
    }

    get tagDisplay() {
        return this.props.tag.full;
    }
}
