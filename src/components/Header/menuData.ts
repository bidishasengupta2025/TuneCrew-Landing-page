import { Menu } from "@/types/menu";

import menuDataJson from "@/data.json";

export const menuData: Menu[] = menuDataJson.header.menu.map((item, index) => ({
  id: index + 1,
  ...item,
}));
