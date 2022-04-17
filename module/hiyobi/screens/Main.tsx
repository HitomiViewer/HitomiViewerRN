/// <reference path="../components/Item.tsx" />
import { DrawerNavigationProp } from "@react-navigation/drawer";
import React from "react";
import MainScreenTemplate from "../../../screens/Main";
import { Item } from "../components";
import { Gallery } from "../types";

interface State {
    data: Array<any>;
    loading: boolean;
}

export class HiyobiMainScreen extends MainScreenTemplate<Gallery> {
    protected async fetchData(index: number, navigation: DrawerNavigationProp<RootParamList, "Main-Hiyobi">) {
        console.log("fetching");
        let data = await fetch("https://api.hiyobi.me/list/1")
            .then(res => res.json())
            .catch(err => console.log(err));
        this.setState({ data });
    }

    renderItem({ item }: { item: Gallery }, navigation: DrawerNavigationProp<RootParamList, "Main-Hiyobi">) {
        return (
            <Item item={item} navigation={navigation} />
        );
    }
}
