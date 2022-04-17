import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Viewer from "./Viewer";
import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer";
import { Item } from "../components/Item";
import { GetList } from "../module/kitomi";

type Props = DrawerScreenProps<RootParamList, 'Main'>;

interface State {
  data: Array<any>;
  loading: boolean;
}

export class MainScreen extends React.Component<Props, State> {
  private index: number;
  constructor(props: Props) {
    super(props);
    const { route } = this.props;
    this.index = route.params.index | 1;
    this.state = {
      data: [],
      loading: false
    }
  }

  componentDidMount() {
    const { route, navigation } = this.props;
    GetList(this.index).then((data) => {
      navigation.setOptions({ title: `hiyobi.me - ${this.index}p`});
      return this.setState({ data });
    });
  }

  renderItem({ item }: any, navigation: DrawerNavigationProp<RootParamList, "Main">) {
    return (
      <Item item={item} navigation={this.props.navigation}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={(item) => this.renderItem(item, this.props.navigation)}
          keyExtractor={(item) => String(item.id)}
          style={{ width: '100%' }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;