import { getAllProducts, getAllProductsDashboard } from '../../../services/product';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR';
export const FETCH_PRODUCT_DASHBOARD_REQUEST = 'FETCH_PRODUCT_DASHBOARD_REQUEST';
export const FETCH_PRODUCT_DASHBOARD_SUCCESS = 'FETCH_PRODUCT_DASHBOARD_SUCCESS';
export const FETCH_PRODUCT_DASHBOARD_ERROR = 'FETCH_PRODUCT_DASHBOARD_ERROR';

export const fetchProductsRequest = () => ({
	type: 'FETCH_PRODUCT_REQUEST',
});

export const fetchProductsSuccess = (products) => ({
	type: 'FETCH_PRODUCT_SUCCESS',
	payload: products,
});

export const fetchProductsError = (error) => ({
	type: 'FETCH_PRODUCT_ERROR',
	payload: error,
});

export const fetchProductsDashboardRequest = () => ({
	type: 'FETCH_PRODUCT_DASHBOARD_REQUEST',
});

export const fetchProductsDashboardSuccess = (products) => ({
	type: 'FETCH_PRODUCT_DASHBOARD_SUCCESS',
	payload: products,
});

export const fetchProductsDashboardError = (error) => ({
	type: 'FETCH_PRODUCT_DASHBOARD_ERROR',
	payload: error,
});

export const fetchProducts = (skip, take) => {
	return async (dispatch) => {
		dispatch(fetchProductsRequest());
		try {
			const data = await getAllProducts(skip, take);
			dispatch(fetchProductsSuccess(data));
		} catch (error) {
			dispatch(fetchProductsError(error.message));
		}
	};
};

export const fetchProductsDashboard = () => {
	return async (dispatch) => {
		dispatch(fetchProductsDashboardRequest());
		try {
			const data = await getAllProductsDashboard();
			dispatch(fetchProductsDashboardSuccess(data));
		} catch (error) {
			dispatch(fetchProductsDashboardError(error.message));
		}
	};
};
