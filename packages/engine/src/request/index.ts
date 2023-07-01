import axios, { AxiosRequestConfig } from "axios";

const defaultConfig: AxiosRequestConfig = {
	withCredentials: false
};

const request = (config: AxiosRequestConfig) => {
	return axios.request({ ...defaultConfig, ...config });
};

export default request;
