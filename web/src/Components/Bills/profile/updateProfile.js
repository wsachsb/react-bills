import api from "../../../services/api";

export const updateProfile = async (data) => {
  try {
    console.log("updateProfile: " + JSON.stringify(data));
    const response = await api.post('/user/update', data);
    return response.data;
  } catch (error) {
    throw new Error('Error updating profile: ' + error.message);
  }
};
