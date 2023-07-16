import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const defaultConfig: AxiosRequestConfig = {
	withCredentials: false
};

const request = <T=string>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
	return axios.request({ ...defaultConfig, ...config, ...{
		url: "/proxy",
		method: "GET",
		params: {
			url: config.url
		}
	} });
};

export default request;
