import { axiosConfig } from "../../../configs/axios.config";

export const EventsService = {
  async getAllEvents() {
    const response = await axiosConfig.get("events");
    if (response?.data) {
      return response?.data;
    }
  },

  async getOneById(id: string) {
    const response = await axiosConfig.get(`events/${id}`);
    if (response?.data) {
      return response?.data;
    }
  },

  async createFeedback(feedbackData: any) {
    await axiosConfig.post("feedbacks", feedbackData).catch((error) => {
      return error.response.data;
    });
  },

  async getAllFeedbacks(id: string) {
    const response = await axiosConfig.get(`feedbacks/${id}`);
    if (response?.data) {
      return response?.data;
    }
  },
};
