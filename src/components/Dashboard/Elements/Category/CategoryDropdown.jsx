import {
	HashtagIcon,
	ListBulletIcon,
	PlusIcon,
} from '@heroicons/react/24/solid';
import TrashIcon from '../../../../assets/img/icon/TrashIcon';
import PencilIcon from '../../../../assets/img/icon/PencilIcon';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input';
import ModalCategory from '../../Fragments/ModalCategory';
import {
	editCategory,
	deleteCategory,
	postSubCategory,
	editSubCategory,
	deleteSubCategory,
} from '../../../../../services/category';

const CategoryDropdown = (props) => {
	const { categories, children, id, hidden } = props;

	const [open, setOpen] = useState(false);
	const handleDropdown = () => setOpen(!open);

	const [editNameCategory, setEditCategory] = useState(categories);

	function handleEditCategory(e) {
		setEditCategory(e.target.value);
	}

	function handleEdit() {
		editCategory(id, { name: editNameCategory }).then((res) => {
			window.location.reload();
		});
	}

	function handleDelete() {
		deleteCategory(id).then((res) => {
			window.location.reload();
		});
	}

	return (
		<>
			<div
				className={`px-4 text-slate-700 cursor-pointer hover:bg-success hover:text-white transition-all 3s ease-in ${
					open && 'bg-success text-white'
				}`}
				onClick={handleDropdown}
				hidden={hidden}
			>
				<div
					className={`flex justify-between items-center px-2.5 py-2.5 border-b border-b-slate-300 hover:border-b ${
						open && 'bg-success text-white border-b-dark-green'
					}`}
				>
					<div className="flex items-center gap-2.5">
						<ListBulletIcon className="w-5 h-5" />
						<p>{categories}</p>
					</div>
					{/* <ChevronDownIcon className="w-3 h-3" /> */}
					<div className="flex gap-2">
						<Button
							type="button"
							variants="focus:outline-none"
							onClick={() =>
								document.getElementById('edit' + id).showModal()
							}
						>
							<img
								src={PencilIcon}
								className="w-7 pl-2 transition-all ease-out delay-100 hover:-translate-y-1 hover:scale-110 hover:rounded-lg hover:shadow-xl duration-300"
								alt="pencilicon"
							/>
						</Button>
						<ModalCategory
							id={'edit' + id}
							title="Edit Category"
							btn="Save"
							variants="bg-success"
						>
							<Input
								type="text"
								name="category"
								variants="rounded-lg ring-1 border-0 w-full ring-dark-green focus:ring-1 focus:outline-none focus:ring-success transition ease-in-out 5s py-2 px-3"
								onChange={handleEditCategory}
								value={editNameCategory}
							/>
							<div className="flex justify-end pt-2">
								<Button
									type="submit"
									variants="mr-2 px-4 py-2 border border-danger hover:text-red-700 hover:border-red-700 transition ease-in-out 5s rounded-lg text-danger"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									variants="px-4 py-2 rounded-lg bg-success text-white"
									onClick={handleEdit}
								>
									Save
								</Button>
							</div>
						</ModalCategory>
						<Button
							type="button"
							variants="focus:outline-none"
							onClick={() =>
								document.getElementById(id).showModal()
							}
						>
							<img
								src={TrashIcon}
								className="w-6 pl-2 transition-all ease-out delay-100 hover:-translate-y-1 hover:scale-110 hover:rounded-lg hover:shadow-xl duration-300"
								alt="trashicon"
							/>
						</Button>
						<ModalCategory
							id={id}
							title="Alert!"
							variants="bg-light-red hover:bg-red-700 transition ease-in-out 5s"
						>
							<p className="flex text-black">
								Are you sure you want to delete this
								<span className="font-semibold pl-1">
									"{editNameCategory} ?"
								</span>
							</p>
							<div className="flex justify-end pt-2">
								<Button
									type="submit"
									variants="mr-2 px-4 py-2 border border-danger hover:text-red-700 hover:border-red-700 transition ease-in-out 5s rounded-lg text-danger"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									variants="px-4 py-2 rounded-lg bg-danger text-white "
									onClick={handleDelete}
								>
									Delete
								</Button>
							</div>
						</ModalCategory>
					</div>
				</div>
			</div>
			{open && children}
		</>
	);
};

const SubCategory = (props) => {
	const { subCategories, id } = props;

	const [editNameSubCategory, setEditSubCategory] = useState(subCategories);

	function handleEditSubCategory(e) {
		setEditSubCategory(e.target.value);
	}

	function handleEdit() {
		editSubCategory(id, { name: editNameSubCategory }).then((res) => {
			window.location.reload();
		});
	}

	function handleDelete() {
		deleteSubCategory(id).then((res) => {
			window.location.reload();
		});
	}
	return (
		<>
			<div className="ps-10 pe-4 text-slate-700 cursor-pointer hover:bg-success hover:text-white transition-all 3s ease-in">
				<div className="flex justify-between items-center px-2.5 py-2.5 border-b border-b-slate-300 hover:border-b-green">
					<Link className="flex items-center gap-2.5">
						<HashtagIcon className="w-5 h-5" />
						<p>{subCategories}</p>
					</Link>

					<div className="flex gap-2">
						<Button
							type="button"
							variants="focus:outline-none"
							onClick={() =>
								document
									.getElementById('editsub' + id)
									.showModal()
							}
						>
							<img
								src={PencilIcon}
								className="w-6 pl-2"
								alt="trashicon"
							/>
						</Button>
						<ModalCategory
							id={'editsub' + id}
							title="Edit Sub Category"
							btn="Save"
							variants="bg-success"
						>
							<div>
								<Input
									type="text"
									name="category"
									placeholder="Insert Sub Category"
									variants="rounded-lg ring-1 border-0 w-full ring-dark-green focus:ring-1 focus:outline-none focus:ring-success transition ease-in-out 5s py-2 px-3"
									onChange={handleEditSubCategory}
									value={editNameSubCategory}
								/>
							</div>
							<div className="flex justify-end gap-2 pt-3">
								<Button
									type="submit"
									variants="mr-2 px-4 py-2 border border-danger hover:text-red-700 hover:border-red-700 transition ease-in-out 5s rounded-lg text-danger"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									variants="px-4 py-2 rounded-lg bg-success text-white"
									onClick={handleEdit}
								>
									Save
								</Button>
							</div>
						</ModalCategory>

						<Button
							type="button"
							variants="focus:outline-none"
							onClick={() =>
								document
									.getElementById('deleteSub' + id)
									.showModal()
							}
						>
							<img
								src={TrashIcon}
								className="w-6 pl-2"
								alt="trashicon"
							/>
						</Button>
						<ModalCategory
							id={'deleteSub' + id}
							title="Delete Sub Category"
							btn="Delete"
							variants="bg-light-red hover:bg-red-700 transition ease-in-out 5s"
						>
							<p className="flex text-black">
								Are you sure you want to delete
								<span className="font-semibold pl-1">
									"{editNameSubCategory} ?"
								</span>
							</p>
							<div className="flex justify-end gap-2 pt-3">
								<Button
									type="submit"
									variants="mr-2 px-4 py-2 border border-danger hover:text-red-700 hover:border-red-700 transition ease-in-out 5s rounded-lg text-danger"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									variants="px-4 py-2 rounded-lg bg-danger text-white"
									onClick={handleDelete}
								>
									Delete
								</Button>
							</div>
						</ModalCategory>
					</div>
				</div>
			</div>
		</>
	);
};

const AddSubCategory = ({ id }) => {
	const [subCategory, setSubCategory] = useState('');

	function handleSubCategory(e) {
		setSubCategory(e.target.value);
		console.log(setSubCategory);
	}

	function handleSubmitSubCategory() {
		postSubCategory({
			name: subCategory,
			categoryId: id,
		}).then(() => {
			window.location.reload();
		});
	}
	return (
		<>
			<div className="w-full focus:outline-none">
				<div className="ps-10 pe-4 text-slate-700 cursor-pointer hover:bg-success hover:text-white transition-all 3s ease-in">
					<div className="px-2.5 py-2.5 border-b border-b-slate-300 hover:border-b-green">
						<div className="flex items-center gap-2.5">
							<Button
								type="button"
								variants="flex items-start gap-2.5"
								onClick={() =>
									document
										.getElementById('addSub')
										.showModal()
								}
							>
								<span>
									<PlusIcon className="w-5 h-5" />
								</span>
								Add Sub Category
							</Button>
							<ModalCategory
								id="addSub"
								title="Add Sub Category"
								btn="Save"
								variants="bg-success z-50"
							>
								<div className="flex mt-2 justify-end">
									<Input
										type="text"
										name="subcategory"
										variants="rounded-lg ring-1 border-0 w-full ring-inset ring-success focus:ring-1 focus:ring-inset focus:ring-primary focus:outline-none py-2 px-3"
										placeholder="Insert Sub Category Name"
										onChange={handleSubCategory}
									/>
								</div>
								<div className="flex justify-end pt-3 gap-2">
									<Button
										variants="focus:outline-none ring-1 ring-danger rounded-md py-2 px-3 text-danger hover:text-white hover:bg-danger transition-all ease-in 3s"
										type="submit"
									>
										Cancel
									</Button>
									<Button
										variants="focus:outline-none bg-success rounded-md py-2 px-5 text-white hover:bg-primary transition-all ease-in 3s"
										type="submit"
										onClick={handleSubmitSubCategory}
									>
										Save
									</Button>
								</div>
							</ModalCategory>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

CategoryDropdown.SubCategory = SubCategory;
CategoryDropdown.AddSubCategory = AddSubCategory;

export default CategoryDropdown;
