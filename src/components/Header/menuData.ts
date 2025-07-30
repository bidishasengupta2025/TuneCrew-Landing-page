import { Menu } from "@/types/menu";
import rawData from "@/data.json";

// ✅ Define types before use
type HeaderMenuItem = {
  title: string;
  path: string;
  newTab?: boolean;
  style?: string;
};

type HeaderData = {
  logo: string;
  logoLight: string;
  menu: HeaderMenuItem[];
  cta: HeaderMenuItem[];
};

// ✅ Cast JSON as typed object
const menuDataJson = rawData as { header: HeaderData };

// ✅ Build your typed menu data
export const menuData: Menu[] = menuDataJson.header.menu.map((item, index) => ({
  id: index + 1,
  ...item,
}));
