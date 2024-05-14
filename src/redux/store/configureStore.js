import { configureStore } from '@reduxjs/toolkit';
import productDetailReducer from '../reducer/productDetailReducer';
import productsReducer from '../reducer/productsReducer';
import categoryReducer from '../reducer/categoryReducer';
import subCategoryReducer from '../reducer/subCategoryReducer';
import counterReducer from '../reducer/counterReducer';

export default configureStore({
	reducer: {
		fetchProductDetail: productDetailReducer,
		fetchProducts: productsReducer,
		fetchCategories: categoryReducer,
		fetchSubCategories: subCategoryReducer,
		counter: counterReducer,
	},
});