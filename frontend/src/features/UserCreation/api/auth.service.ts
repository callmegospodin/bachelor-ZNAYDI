import { axiosConfig } from "../../../configs/axios.config";
import { ErrorContextType } from "../../../shared/types/common.types";
import { LoginUserDatatype, UserSystemDataType } from "../types/user.types";

export const AuthService = {
  async login(userData: LoginUserDatatype) {
    const data = await axiosConfig
      .post<UserSystemDataType | ErrorContextType>("auth/login", userData)
      .catch((error) => {
        return error.response.data;
      });

    return data;
  },
  async isAuthorizedUser(): Promise<UserSystemDataType | undefined> {
    const { data } = await axiosConfig.get<UserSystemDataType | undefined>(
      "auth/profile"
    );

    if (data) {
      return data;
    }
  },
};
