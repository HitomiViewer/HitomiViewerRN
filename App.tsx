import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import { MainScreenTemplate } from "./screens/Main";
import 'react-native-gesture-handler'
import ViewerScreen from "./screens/Viewer";
import * as Hiyobi from "./module/hiyobi";
import * as Kitomi from "./module/kitomi";

const Drawer = createDrawerNavigator<RootParamList>();

export default class App extends React.Component {
  render() {
    /* https://github.com/software-mansion/react-native-reanimated/issues/3049 */
    return (
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation={true}>
          <Drawer.Screen
            name="Main-Hiyobi"
            component={Hiyobi.MainScreen}
            options={{ title: "hiyobi.me" }}
            initialParams={{ index: 1 }}
          />
          <Drawer.Screen
            name="Main-Kitomi"
            component={Kitomi.MainScreen}
            options={{ title: "kitomi.nahee.kim" }}
            initialParams={{ index: 1 }}
          />
          <Drawer.Screen
            name="Main-Kitomi-Extend-Hiyobi"
            component={Kitomi.MainExtendedHiyobiScreen}
            options={{ title: "kitomi load with hiyobi" }}
            initialParams={{ index: 1 }}
          />
          <Drawer.Screen
            name="Viewer-Hiyobi"
            component={Hiyobi.ViewerScreen}
            options={{ drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="Viewer-Kitomi"
            component={Kitomi.ViewerScreen}
            options={{ drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="Viewer-Kitomi-Extend-Hiyobi"
            component={Kitomi.ViewerExtendHiyobiScreen}
            options={{ drawerItemStyle: { display: "none" } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
