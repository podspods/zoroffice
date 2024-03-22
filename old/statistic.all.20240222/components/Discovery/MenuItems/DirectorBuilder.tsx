import MenuItemsDirector from '@systran/react-components/lib/organisms/AppLayout/NavBar/Director';
import NavCategoryBuilder, { type NavCategoryValidation } from '@systran/react-components/lib/organisms/AppLayout/NavBar/NavCategoryBuilder';
import { type NavCategory } from '@systran/react-components/lib/organisms/AppLayout/NavBar/NavBar';
import {itemsValidation, adminItemsValidation} from './TranslateServerNavCategories';

export default function MenuItemDirectorBuilder() {
  return new MenuItemsDirector<NavCategoryValidation, NavCategory>({navCategoryBuilder: NavCategoryBuilder, navCategoriesValidation: {itemsValidation, adminItemsValidation}});
}
