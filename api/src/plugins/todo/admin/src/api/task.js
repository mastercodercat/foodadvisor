import axiosInstance from '../../src/utils/axiosInstance';

const taskRequests = {
  getTaskCount: async () => {
    const data = await axiosInstance.get(`/todo/count`);
    return data;
  },
  getSettings: async () => {
    const data = await axiosInstance.get(`/todo/settings`);
    return data;
  },
  setSettings: async (data) => {
    return await axiosInstance.post(`/todo/settings`, {
      body: data,
    });
  },
};
export default taskRequests;
