import menuDataJson from "@/data.json";

type Brand = {
	id: number;
	name: string;
	link: string;
	image: string;
};

const brandData: Brand[] = menuDataJson.hero.brand.icons.map((brand, index) => ({
	id: index + 1,
	...brand,
}));

export default brandData;

