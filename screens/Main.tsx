import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Viewer from "./Viewer";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { Item } from "../components/Item";
import { Refine } from "../module/kitomi";

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
    fetch(`https://apiomi.nahee.kim/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `SELECT * FROM galleries ORDER BY id DESC LIMIT ${(this.index - 1) * 25},25`
      })
    })
      .then((res) => res.json())
      .then((res) => Refine(res))
      .then((res) => {
        console.log(res);
        navigation.setOptions({ title: `hiyobi.me - ${this.index}p`});
        return this.setState({ data: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderItem({ item }: any) {
    return (
      <Item item={item}/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
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