import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Viewer from "./Viewer";
import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer";
import { ItemTemplate } from "../components/Item";
import { OriginalGallery } from "../types/Module";

type Props = DrawerScreenProps<RootParamList>;

interface State<DataType> {
  data: Array<DataType>;
  loading: boolean;
}

export class MainScreenTemplate<DataType extends OriginalGallery> extends React.Component<Props, State<DataType>> {
  protected styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    }
  }

  componentDidMount() {
    const { route, navigation } = this.props;
    if (!('index' in route.params)) return;
    this.fetchData(route.params.index | 1, navigation)
  }

  componentDidUpdate(prevProps: Props) {
    const { route, navigation } = this.props;
    if (!('index' in route.params && 'index' in prevProps.route.params)) return;
    if (prevProps.route.params.index != route.params.index)
      this.fetchData(route.params.index | 1, navigation)
  }

  protected fetchData(index: number, navigation: DrawerNavigationProp<RootParamList>) { }

  protected renderItem({ item }: { item: OriginalGallery }, navigation: DrawerNavigationProp<RootParamList>) {
    return (
      <Text>Please override renderItem function</Text>
    );
  }

  render() {
    return (
      <View style={this.styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={(item) => this.renderItem(item, this.props.navigation)}
          keyExtractor={(item) => String(item.id)}
          style={{ width: '100%' }}
        />
      </View>
    );
  }
}

export default MainScreenTemplate;