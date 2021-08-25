/**
 * HTTP Request Library
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import env from '../env';

class Request {
  private instance: AxiosInstance;

  /**
   * 생성자
   * @param url 서버 URL
   */
  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.instance.get<T>(path, config);

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async post<T>(
    path: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.instance.post<T>(
        path,
        data,
        config,
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async put<T>(
    path: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.instance.put<T>(
        path,
        data,
        config,
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.instance.delete<T>(path, config);

      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

export const request = new Request({ baseURL: env.SERVER_URL });
