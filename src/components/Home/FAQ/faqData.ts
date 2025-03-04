import { Faq } from "@/types/faq";

import menuDataJson from "@/data.json";

const faqData: Faq[] = menuDataJson.FAQ.faq.map((faq, index) => ({
	id: index + 1,
	...faq,
}));

export default faqData;
