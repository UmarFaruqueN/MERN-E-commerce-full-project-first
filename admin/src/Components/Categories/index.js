//axios
export {
     addCategory,
     getCategory,
     updateCategory,
     deleteCategory,
     addSubCategory,
     getSubCategory,
     updateSubCategory,
     deleteSubCategory,
     addType,
     getType,
     updateType,
     deleteType,
} from "../../utlis/Constants";

export { setCategory, setSubCategory, setType } from "../../Redux/index";

export { default as AddCategoryDialouge } from "./CategoryManagement/components/AddCategoryDialouge";
export { default as EditCategoryDialouge } from "./CategoryManagement/components/EditCategoryDialouge";
export { default as CategoryManagement } from "./CategoryManagement/CategoryManagement";

export { default as AddSubCategoryDialouge } from "./SubCategoryManagement/components/AddSubCategoryDialouge";
export { default as EditSubCategoryDialouge } from "./SubCategoryManagement/components/EditSubCategoryDialouge";
export { default as SubCategoryManagement } from "./SubCategoryManagement/SubCategoryManagement";

export { default as AddTypeDialouge } from "./TypeManagement/components/AddTypeDialouge";
export { default as EditTypeDialouge } from "./TypeManagement/components/EditTypeDialouge";
export { default as TypeManagement } from "./TypeManagement/TypeManagement";

export {default as Categories} from "./Categories"
