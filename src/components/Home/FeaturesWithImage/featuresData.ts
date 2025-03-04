import { FeatureWithImg } from "@/types/featureWithImg";
import menuDataJson from "@/data.json";

const featureItemData: FeatureWithImg[] = menuDataJson.featuresWithImages.features.map((feature, index) => ({
    ...feature,
    id: index + 1,
}));




export default featureItemData;
