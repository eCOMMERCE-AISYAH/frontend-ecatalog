import TrashIcon from '../../../assets/img/icon/TrashIcon/TrashIcon.png';
import { DocumentTextIcon } from '@heroicons/react/24/solid';
import Input from '../Elements/Input';
import Label from '../Elements/Input/Label';
import Select from '../Elements/Select';
import Option from '../Elements/Select/option';
import Textarea from '../Elements/Textarea';
import ImageProduct from '../../../../public/images/Rectangle 11.png';
import Button from '../Elements/Button';
import Counter from '../../user/fragments/counter/Index';
import ModalProduct from './ModalProduct';
import { postProduct } from '../../../../services/product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../../redux/actions/categoryAction';
import { fetchSubCategories } from '../../../redux/actions/subCategoryAction';

const PhotoData = [
	{
		id: 1,
		name: 'assakinah-22-3-23-145601.jpg',
	},
	{
		id: 2,
		name: 'assakinah-22-3-23-145602.jpg',
	},
	{
		id: 1,
		name: 'assakinah-22-3-23-145603.jpg',
	},
];

const FormProduct = () => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.fetchCategories.category);
	const subCategories = useSelector(
		(state) => state.fetchSubCategories.category,
	);
	const count = useSelector((state) => state.counter.count);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchSubCategories());
	}, [dispatch]);

	// if (!categories && !subCategories) {
	// 	return <p>Loading....</p>;
	// }

	const [addProduct, setAddProduct] = useState({});
	const [addImage, setAddImage] = useState([]);
	const [categoriesValue, setCategoriesValue] = useState();

	let images = [];
	const handleImage = (e) => {
		// for (let i = 0; i < e.target.files.length; i++) {
		// 	images.push(e.target.files[i]);
		// }
		setAddImage(e.target.files);
	};

	const handleChangeCategories = (e) => {
		setCategoriesValue(e.target.value);
	};

	const handleAddProduct = (e) => {
		setAddProduct({ ...addProduct, [e.target.name]: e.target.value });
	};

	const handleSubmitAddProduct = () => {
		const productData = {
			name: addProduct.name,
			description: addProduct.description,
			price: Number(addProduct.price),
			stock: count,
			image: addImage,
			subCategoryId: addProduct.subCategoryId,
		};
		console.log(productData);
		postProduct(productData);

		// if (!response.status == 200) {
		// 	images = [];
		// }
	};

	return (
		<div className="flex justify-between">
			<div className="w-2/4">
				<Label variants="font-semibold" htmlFor="productname">
					Product Name
				</Label>
				<div className="pt-2">
					<Input
						variants="rounded-lg ring-1 border-0 w-full ring-primary focus:ring-1 focus:outline-none focus:ring-success transition ease-in-out 5s py-2 px-3"
						type="text"
						name="name"
						placeholder="Insert Product Name"
						onChange={handleAddProduct}
					/>
				</div>
				<div className="flex justify-start gap-2 ">
					<div className="w-full pt-4">
						<Label variants="font-semibold" htmlFor="category">
							Category
						</Label>
						<div className="pt-2">
							<Select
								variants="rounded-lg ring-1 border-0 w-full ring-primary focus:ring-1 focus:outline-none focus:ring-success transition ease-in-out 5s py-2 px-3"
								name="categoryId"
								title="Category"
							>
								<Option
									value="Choose Category"
									title="Choose Category"
								/>
								{categories.map((category, index) => (
									<Option
										key={index}
										value={category.id}
										title={category.name}
									/>
								))}
							</Select>
						</div>
					</div>
					<div className="w-full pt-4">
						<Label
							variants="font-semibold"
							htmlFor="subcategory"
							title="Sub Category"
						>
							Sub Category
						</Label>
						<div className="pt-2 pb-2">
							<Select
								variants="rounded-lg ring-1 border-0 w-full ring-primary focus:ring-1 focus:outline-none focus:ring-success transition ease-in-out 5s py-2 px-3"
								name="subCategoryId"
								title="Category"
								onChange={handleAddProduct}
							>
								<Option
									value="Choose Sub Category"
									title="Choose Sub Category"
								/>
								{subCategories.map((subCategory, index) => (
									<Option
										key={index}
										value={subCategory.id}
										title={subCategory.name}
									/>
								))}
							</Select>
						</div>
					</div>
				</div>
				<div className="pt-4">
					<div className="pb-3">
						<Label
							variants="font-semibold pb-2"
							htmlFor="productdescription"
						>
							Description
						</Label>
					</div>
					<div className="pb-3">
						<Textarea
							variants="resize-none border-0 ring-primary ring-1 focus:ring-1 focus:outline-none focus:ring-success transition ease-in-out 5s rounded-lg w-full"
							name="description"
							cols="66"
							rows="10"
							onChange={handleAddProduct}
						/>
					</div>
				</div>
				<div className="flex">
					<div className="pt-3">
						<Label htmlFor="productstock" variants="font-semibold">
							Stock
						</Label>
						<div className="pt-3">
							<Counter />
						</div>
					</div>
					<div className="pt-3 ml-2 w-full">
						<Label htmlFor="productprice" variants="font-semibold">
							Price
						</Label>
						<div className="pt-3">
							<Input
								type="number"
								name="price"
								variants="w-full rounded-lg border-0 ring-primary ring-1 focus:ring-1 focus:outline-none focus:ring-success transition ease-in-out 5s px-3 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								onChange={handleAddProduct}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-2/5">
				<div className="flex justify-center">
					<img src={ImageProduct} alt="" />
				</div>
				<div className="py-7">
					<div className="pb-1 pt-4">
						<Label htmlFor="imageproduct" variants="font-semibold">
							Photo Product
						</Label>
					</div>
					<div className="pt-1 pb-1">
						<Input
							type="file"
							variants="rounded-lg ring-1 ring-black border-0 w-full py-2 px-3"
							name="image"
							placeholder="Choose Image"
							multiple
							onChange={handleImage}
						/>
						<p className="flex text-slate-500">
							<span className="text-danger pr-2">*</span>
							Please input file with jpg, jpeg, png, gif extension
						</p>
						{PhotoData.map((item) => (
							<div className="pt-4" key={item} value={item.id}>
								<div className="rounded-lg py-2 px-3 flex justify-center">
									<Button
										type="button"
										variants="flex items-center focus:outline-none"
									>
										<DocumentTextIcon className="w-9 pr-2" />
										<p>{item.name}</p>
									</Button>
									<Button type="button">
										<img
											src={TrashIcon}
											alt=""
											className="h-5 my-auto pl-2"
										/>
									</Button>
								</div>
							</div>
						))}
						<div className="pt-2">
							<p className="py-4 text-justify">
								Double check the data you entered before saving
								for this product
							</p>
							<div className="flex justify-end">
								<div className="px-2">
									<Button
										type="submit"
										variants="py-2 px-5 rounded-lg bg-red text-white"
									>
										Cancel
									</Button>
								</div>
								<div className="px-2">
									<Button
										type="button"
										variants="py-2 px-5 rounded-lg bg-danger text-white"
										onClick={() =>
											document
												.getElementById('delete')
												.showModal()
										}
									>
										Delete
									</Button>
									<ModalProduct></ModalProduct>
								</div>
								<div className="px-2">
									<Button
										type="submit"
										variants="py-2 px-6 rounded-lg bg-success text-white"
										onClick={handleSubmitAddProduct}
									>
										Save
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormProduct;
