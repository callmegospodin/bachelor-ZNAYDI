import {
  axiosConfig,
  axiosFormDataConfig,
  axiosGetPhotoConfig,
} from "../../../configs/axios.config";
import { ErrorContextType } from "../../../shared/types/common.types";
import { UpdateUserDataType, UserDataType } from "../types/user.types";

export const UserService = {
  async createUser(userData: UserDataType) {
    const data = await axiosConfig //axiosFormDataConfig
      .post<number | ErrorContextType>("users", userData)
      .catch((error) => {
        return error.response.data;
      });

    return data;
  },

  async getOneUser(id: string) {
    const { data } = await axiosConfig.get(`user/${id}`);
    if (data) {
      return data;
    }
  },

  async getUserPhoto(filename: string) {
    const { data } = await axiosGetPhotoConfig.get(
      `/user/user-photo/${filename}`
    );

    if (data) {
      return data;
    }
  },

  async getAllUsers() {
    const { data } = await axiosConfig.get("user");
    if (data) {
      return data;
    }
  },
  async updateUser(id: string, userData: UpdateUserDataType) {
    const { data } = await axiosConfig.patch(`user/${id}`, userData);
    if (data) {
      return data;
    }
  },
  async deleteUser(id: string) {
    const { data } = await axiosConfig.delete(`user/${id}`);
    if (data) {
      return data;
    }
  },
};
