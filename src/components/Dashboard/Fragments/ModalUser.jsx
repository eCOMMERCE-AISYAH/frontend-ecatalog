import Button from '../Elements/Button';
import Modal from '../Elements/Modal';

const ModalUser = () => {
	return (
		<>
			<Modal id="delete">
				<div className="bg-white modal-box py-3 px-9">
					<h3 className="font-bold text-lg">Alert!</h3>
					<p className="py-4 flex">
						Are you sure you want to delete this
						<span className="px-1 font-bold">"user"?</span>
					</p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							{/* <button className="btn">Close</button> */}
							<div className="flex mt-2 justify-end">
								<Button
									type="submit"
									variants="btn mr-2 px-4 py-2 border border-light-red hover:border-red-700 rounded-lg"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									variants="btn px-4 py-2 bg-light-red hover:bg-red-700 rounded-lg text-white"
								>
									Delete
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default ModalUser;
