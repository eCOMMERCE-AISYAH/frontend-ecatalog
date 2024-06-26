/* eslint-disable import/no-absolute-path */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboard,
	faHome,
	faKey,
	faMagnifyingGlass,
	faRightFromBracket,
	faRightToBracket,
	faShoppingBag,
	faShoppingCart,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Fragment, useEffect, useState } from 'react';
import Logo from '../../elements/logo/Index';
import NavbarIcon from '../../elements/navbarIcon/Index';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../elements/button/Index';
import { logoutUser } from '../../../../../helper/logoutUser';
import Alert from '../../elements/alert/Index';
import { decryptData } from '../../../../../helper/cryptoData';
import { getCartByUserId } from '../../../../../services/cartProduct';

const Navbar = () => {
	let user = localStorage.getItem('user') && decryptData('user');
	let cart = localStorage.getItem('cart') && decryptData('cart');
	const [navbar, setNavbar] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(false);
	const [status, setStatus] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();

	window.onscroll = () => {
		if (window.scrollY > 0) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};

	const handleOpenDropdown = () => {
		setOpenDropdown(!openDropdown);
	};

	const handleLogout = async () => {
		const response = await logoutUser();

		if (response.status !== 'success') {
			setStatus(response);
			setTimeout(() => {
				setStatus('');
			}, 5000);
		}

		navigate('/');
		setStatus(response);
		setOpenDropdown(false);

		setTimeout(() => {
			setStatus('');
		}, 5000);
	};

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value);
	};

	const handleNavigate = (e) => {
		if (searchInput && e.keyCode === 13) {
			navigate(`/products?search=${searchInput}`);
		}
	};

	let cartTotal = 0;

	if (cart && cart.length > 0) {
		cartTotal = cart.length;
	}

	return (
		<Fragment>
			<nav
				className={` ${
					navbar ? 'shadow' : ''
				} bg-white py-5 px-20 sticky top-0 flex justify-between items-center z-10`}
			>
				<Logo />
				<div className="w-1/3 text-center relative">
					<input
						type="text"
						className="border border-green-500 text-sm w-full rounded-full focus:border-green-700"
						placeholder="Cari produk yang anda inginkan"
						onChange={handleSearchInput}
						onKeyDown={handleNavigate}
					/>
					<button
						className="absolute p-2 right-2"
						onClick={handleNavigate}
					>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
				<div className="flex items-center justify-end gap-5 text-gray-400 w-1/3">
					<NavbarIcon
						link={'/'}
						icon={faHome}
						onClick={() => setOpenDropdown(false)}
					/>
					<NavbarIcon
						link={'/products'}
						icon={faShoppingBag}
						onClick={() => setOpenDropdown(false)}
					/>
					<NavbarIcon
						link={'/cart'}
						icon={faShoppingCart}
						onClick={() => setOpenDropdown(false)}
						// badge={cart && String(cartTotal)}
					/>
					{user ? (
						<Dropdown icon={faUser} onClick={handleOpenDropdown} />
					) : (
						<Link
							to={'/login'}
							className="text-sm rounded-md border border-success text-success hover:text-white hover:bg-primary p-3"
						>
							Login
						</Link>
					)}
				</div>
				{openDropdown && (
					<div className="absolute right-20 top-20 bg-white shadow-md p-4 rounded-md flex flex-col gap-2">
						{user.role !== 'GUEST' && (
							<>
								<DropdownMenu
									icon={faUser}
									text="Edit Profil"
									link={'/editprofile'}
									onClick={handleOpenDropdown}
								/>
								<DropdownMenu
									icon={faKey}
									text="Ganti Password"
									link={'/changepassword'}
									onClick={handleOpenDropdown}
								/>
							</>
						)}
						<DropdownMenu
							icon={faClipboard}
							text="Riwayat Transaksi"
							link={'/orderhistory'}
							onClick={handleOpenDropdown}
						/>
						<Button
							style={
								'border border-danger text-danger hover:bg-danger hover:text-white'
							}
							icon={faRightFromBracket}
							text={'Logout'}
							onClick={handleLogout}
						/>
					</div>
				)}
			</nav>

			{status && (
				<Alert
					message={status.message}
					onSuccess={status.status}
					success="success"
					onClick={() => setStatus('')}
				/>
			)}
		</Fragment>
	);
};

export default Navbar;

const Dropdown = (props) => {
	const { icon, onClick } = props;
	return (
		<div
			className="cursor-pointer text-gray-400 hover:text-green-700"
			onClick={() => {
				onClick();
			}}
		>
			<FontAwesomeIcon icon={icon} className=" w-7 h-7" />
		</div>
	);
};

const DropdownMenu = (props) => {
	const { icon, text, link, onClick } = props;
	return (
		<Link
			to={link}
			className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-primary"
			onClick={onClick}
		>
			<div className="w-5 h-5 flex justify-center">
				<FontAwesomeIcon icon={icon} className="h-5" />
			</div>
			<p>{text}</p>
		</Link>
	);
};
