import { getProductBySlug } from '../../../services/product';

export const FETCH_PRODUCT_DETAIL_REQUEST = 'FETCH_PRODUCT_DETAIL_REQUEST';
export const FETCH_PRODUCT_DETAIL_SUCCESS = 'FETCH_PRODUCT_DETAIL_SUCCESS';
export const FETCH_PRODUCT_DETAIL_ERROR = 'FETCH_PRODUCT_DETAIL_ERROR';

export const fetchProductDetailRequest = () => ({
	type: FETCH_PRODUCT_DETAIL_REQUEST,
});

export const fetchProductDetailSuccess = (product) => ({
	type: FETCH_PRODUCT_DETAIL_SUCCESS,
	payload: product,
});

export const fetchProductDetailError = (error) => ({
	type: FETCH_PRODUCT_DETAIL_ERROR,
	payload: error,
});

export const fetchProductDetail = (id) => {
	return async (dispatch) => {
		dispatch(fetchProductDetailRequest());
		try {
			const data = await getProductBySlug(id);
			dispatch(fetchProductDetailSuccess(data));
		} catch (error) {
			dispatch(fetchProductDetailError(error));
		}
	};
};
