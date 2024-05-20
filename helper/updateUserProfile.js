import { updateUser } from '../services/user';

export const updateUserProfile = async (id, data) => {
	const profile = {
		name: data.name,
		oldPassword: data.oldPassword,
		newPassword: data.newPassword,
		phoneNumber: data.phoneNumber,
		address: data.address,
	};

	try {
		const response = await updateUser(id, profile);

		if (response.status !== 'success') {
			console.log(response);

			return {
				status: response.status,
				message: 'Gagal memperbarui profil',
			};
		}
		localStorage.removeItem('user');

		const user = {
			id: response.data.id,
			name: response.data.name,
			address: response.data.address,
			role: response.data.role,
			phoneNumber: response.data.phoneNumber,
			token: response.data.token,
		};

		localStorage.setItem('user', JSON.stringify(user));

		return {
			status: response.status,
			message: 'Profil berhasil diperbarui',
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			message: 'Terjadi kesalahan saat memperbarui profil',
		};
	}
};