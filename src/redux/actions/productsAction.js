import { getAllProducts, getAllProductsDashboard, getProductCount } from '../../../services/product';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR';
export const FETCH_PRODUCT_DASHBOARD_REQUEST = 'FETCH_PRODUCT_DASHBOARD_REQUEST';
export const FETCH_PRODUCT_DASHBOARD_SUCCESS = 'FETCH_PRODUCT_DASHBOARD_SUCCESS';
export const FETCH_PRODUCT_DASHBOARD_ERROR = 'FETCH_PRODUCT_DASHBOARD_ERROR';
export const FETCH_PRODUCT_COUNT_REQUEST = 'FETCH_PRODUCT_COUNT_REQUEST';
export const FETCH_PRODUCT_COUNT_SUCCESS = 'FETCH_PRODUCT_COUNT_SUCCESS';
export const FETCH_PRODUCT_COUNT_ERROR = 'FETCH_PRODUCT_COUNT_ERROR';

export const fetchProductCountRequest = () => ({
	type: 'FETCH_PRODUCT_COUNT_REQUEST',
});

export const fetchProductCountSuccess = (product) => ({
	type: 'FETCH_PRODUCT_COUNT_SUCCESS',
	payload: product,
});

export const fetchProductCountError = (error) => ({
	type: 'FETCH_PRODUCT_COUNT_ERROR',
	payload: error,
});

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

export const fetchProductCount = () => {
	return async (dispatch) => {
		dispatch(fetchProductCountRequest());
		try {
			const data = await getProductCount();
			dispatch(fetchProductCountSuccess(data));
		} catch (error) {
			dispatch(fetchProductCountError(error.message));
		}
	};
};

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
