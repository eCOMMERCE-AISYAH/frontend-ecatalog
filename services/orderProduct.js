import { getAppUrl } from '../config/app';
import axios from 'axios';

export const postOrderProduct = async (data) => {
	try {
		const response = await axios.post(`${getAppUrl()}api/orders`, data);
		console.log(response);

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const postOrderHistoryProduct = async (data) => {
	try {
		const response = await axios.post(`${getAppUrl()}/api/orderhistory`);

		return response.data;
	} catch (error) {
		console.log(error);
	}
};