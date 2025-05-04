import { axiosConfig } from "../../../configs/axios.config";
import { UpdatePositionDataType } from "../types/position.types";

export const PositionService = {
  async getOnePosition(id: string) {
    const { data } = await axiosConfig.get(`position/${id}`);
    if (data) {
      return data;
    }
  },
  async getAllPositions() {
    const { data } = await axiosConfig.get("position");
    if (data) {
      return data;
    }
  },
  async updatePosition(id: string, positionData: UpdatePositionDataType) {
    const { data } = await axiosConfig.patch(`position/${id}`, positionData);
    if (data) {
      return data;
    }
  },
  async deletePosition(id: string) {
    const { data } = await axiosConfig.delete(`position/${id}`);
    if (data) {
      return data;
    }
  },
};
