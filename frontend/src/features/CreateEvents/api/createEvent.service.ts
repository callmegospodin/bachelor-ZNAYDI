import { axiosConfig } from "../../../configs/axios.config";

export const EventCategoryService = {
  async getAllCategories() {
    const { data } = await axiosConfig.get("event/categories");
    if (data) {
      return data;
    }
  },

  async createEvent(eventData: any) {
    await axiosConfig.post("events", eventData).catch((error) => {
      return error.response.data;
    });
  },
};
