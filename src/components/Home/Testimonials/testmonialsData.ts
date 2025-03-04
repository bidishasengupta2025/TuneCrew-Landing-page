import { Testimonial } from "@/types/testimonial";
import menuDataJson from "@/data.json";

const testimonialData: Testimonial[][] = [
	menuDataJson.testimonials.testimonials.col1.map((testimonial, index) => ({
		id: index + 1,
		...testimonial,
	})),
	menuDataJson.testimonials.testimonials.col2.map((testimonial, index) => ({
		id: index + 1,
		...testimonial,
	})),
	menuDataJson.testimonials.testimonials.col3.map((testimonial, index) => ({
		id: index + 1,
		...testimonial,
	})),
];

export default testimonialData;

