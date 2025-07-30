
import { FeatureItem } from "@/types/featureItem";

import menuDataJson from "@/data.json";

const featuresData: FeatureItem[] = menuDataJson.features.features.map((feature, index) => ({
	id: index + 1,
	...feature,
}));


export default featuresData;
