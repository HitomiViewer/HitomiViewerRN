/// <reference path="../components/Item.tsx" />
import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import MainScreenTemplate from "../../../screens/Main";
import { Item, ItemExtendHiyobi } from "../components";
import { Gallery } from "../types";

interface State {
    data: Array<any>;
    loading: boolean;
}

export class MainExtendedHiyobiScreen extends MainScreenTemplate<Gallery> {
    protected async fetchData(index: number, navigation: DrawerNavigationProp<RootParamList>) {
        let data = await fetch(`https://apiomi.nahee.kim/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `SELECT * FROM galleries ORDER BY id DESC LIMIT ${(index - 1) * 25},25`
            })
        }).then((res) => res.json())
            .catch((err) => console.log(err));
        this.setState({ data });
    }

    renderItem({ item }: { item: Gallery }, navigation: DrawerNavigationProp<RootParamList, "Main-Kitomi">) {
        return (
            <ItemExtendHiyobi item={item} navigation={navigation} />
        );
    }
}
