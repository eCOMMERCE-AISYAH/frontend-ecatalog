import { useEffect, useState } from 'react';
import Button from '../../components/user/elements/button/Index';
import CardOrderHitory from '../../components/user/fragments/cardOrderHistory/Index';
import { getAllOrderByUserId } from '../../../services/orderProduct';
import { decryptData } from '../../../helper/cryptoData';
import { Link } from 'react-router-dom';

const OrderHistoryPage = () => {
	const user = decryptData('user');
	let [orderHistory, setOrderHistory] = useState([]);
	const [status, setStatus] = useState('all');

	const getOrderHistory = async (status) => {
		try {
			const response = await getAllOrderByUserId(user.id, status);
			setOrderHistory(response.data);
		} catch (error) {
			console.error('Failed to fetch order history:', error);
		}
	};

	useEffect(() => {
		getOrderHistory(status);
	}, [status, user.id]);

	const handleStatus = (statusOrder) => {
		setStatus(statusOrder);
	};

	return (
		<main className="min-h-[70vh] p-5 max-w-screen-xl mx-auto px-5 md:px-20">
			<div className="flex flex-col md:flex-row justify-between md:items-center">
				<div className="w-full md:w-1/4 flex flex-col gap-1 justify-center">
					<h1 className="font-semibold text-2xl">
						Riwayat Transaksi
					</h1>

					<div className="mb-5 text-sm text-primary flex gap-1">
						<Link to={'/'}>Beranda</Link>
						<p>/</p>
						<Link to={'/orderhistory'}>Riwayar Transaksi</Link>
					</div>
				</div>

				<div className="flex gap-3 mt-3 lg:mt-1 w-full md:w-3/4 overflow-y-auto lg:overflow-y-visible lg:justify-end no-scrollbar">
					<Button
						text={'Semua Riwayat'}
						style={`border text-nowrap text-sm ${status === 'all' ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'}`}
						onClick={() => handleStatus('all')}
					/>
					<Button
						text={'Sedang Diproses'}
						style={`border text-nowrap text-sm ${status === 'PROSES' ? 'bg-yellow-500 text-white' : 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'}`}
						onClick={() => handleStatus('PROSES')}
					/>
					<Button
						text={'Berhasil'}
						style={`border text-nowrap text-sm ${status === 'SUKSES' ? 'bg-success text-white' : 'border-success text-success hover:bg-success hover:text-white'}`}
						onClick={() => handleStatus('SUKSES')}
					/>
					<Button
						text={'Dibatalkan'}
						style={`border text-nowrap text-sm ${status === 'BATAL' ? 'bg-danger text-white' : 'border-danger text-danger hover:bg-danger hover:text-white'}`}
						onClick={() => handleStatus('BATAL')}
					/>
				</div>
			</div>

			<div className="mt-5 flex flex-col gap-3 mb-5">
				{orderHistory.length > 0 ? (
					orderHistory.map((item) => (
						<CardOrderHitory
							key={item.id}
							invoice={item.invoice}
							date={item.createdAt}
							address={item.address}
							status={item.status}
							id={item.id}
						/>
					))
				) : (
					<p className="text-center font-semibold">
						Tidak ada riwayat transaksi
					</p>
				)}
			</div>
		</main>
	);
};

export default OrderHistoryPage;
