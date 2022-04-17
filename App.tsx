import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import { MainScreen } from "./screens/Main";
import 'react-native-gesture-handler'

const Drawer = createDrawerNavigator<RootParamList>();

export default class App extends React.Component {
  render() {
    /* https://github.com/software-mansion/react-native-reanimated/issues/3049 */
    return (
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation={true}>
          <Drawer.Screen
            name="Main"
            component={MainScreen}
            options={{ title: "hiyobi.me" }}
            initialParams={{ index: 1 }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
