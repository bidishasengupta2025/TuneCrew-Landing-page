import { FeatureWithImg } from "@/types/featureWithImg";
import featureItemData from "./featuresData";
import FeatureItem from "./FeatureItem";
import SectionHeader from "@/components/Common/SectionHeader";
import menuDataJson from "@/data.json";


const FeaturesWithImage = () => {
	return (
		<section className='overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5'>
			{/* <!-- section title --> */}
			<SectionHeader
				title={menuDataJson.featuresWithImages.title}
				description={menuDataJson.featuresWithImages.description}
			/>

			<div className='mx-auto w-full max-w-[1040px] px-4 sm:px-8 xl:px-0'>
				{featureItemData?.map((item: FeatureWithImg, key: number) => (
					<FeatureItem data={item} key={key} />
				))}
			</div>
		</section>
	);
};

export default FeaturesWithImage;
