import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const defaultConfig: AxiosRequestConfig = {
	
};

const request = <T=string>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
	return axios.request({ ...defaultConfig, ...config });
};

export default request;
