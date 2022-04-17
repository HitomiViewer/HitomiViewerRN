import { Image } from 'react-native';
import ViewerScreenTemplate from "../../../screens/Viewer";
import { ImageObject } from "../../hiyobi";

export class ViewerExtendHiyobiScreen extends ViewerScreenTemplate<ImageObject> {
    async fetchData(id: number) {
        let files = await fetch(`https://cdn.hiyobi.me/json/${id}_list.json`, {})
            .then(res => res.json())
            .catch(err => console.log(err))
        this.setState({ data: files });
    }

    renderItem({ item }: { item: ImageObject }, id: number) {
        return (
            <Image
                style={[this.styles.image, { alignSelf: 'center' }]}
                source={{ uri: `https://cdn.hiyobi.me/data/${id}/${item.hash}.webp` }}
            />
        );
    }
}