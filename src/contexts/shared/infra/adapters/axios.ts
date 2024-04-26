import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AppLogger } from './logger';

export class AxiosHttpClient {
  private readonly http: AxiosInstance;

  constructor(private readonly appLogger: AppLogger) {
    this.http = axios.create();
    const logger = this.appLogger.getLoggerInstance('AxiosHttpClient');

    this.http.interceptors.request.use(
      (config) => {
        config.headers['startTime'] = new Date().getTime();
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.http.interceptors.response.use(
      async (response) => {
        response.headers['endTime'] = new Date().getTime();
        logger.trace({
          event: 'http_request_response',
          data: {
            request: {
              method: response.config.method,
              url: `${response.config.baseURL}${response.config.url}`,
              params: response.config.params,
              body: JSON.parse(response?.config?.data ?? null),
              headers: response.config.headers,
              baseUrl: response.config.baseURL,
            },
            response: {
              duration:
                response.headers['endTime'] -
                response.config.headers['startTime'],
              statusCode: response.status,
              body: response.data,
              headers: response.headers,
            },
          },
        });
        return response;
      },
      async (error: any) => {
        error.response.headers['endTime'] = new Date().getTime();
        logger.trace({
          event: 'http_request_response_error',
          data: {
            request: {
              method: error?.config.method,
              url: `${error?.config.baseURL}${error?.config.url}`,
              params: error?.config.params,
              body: JSON.parse(error?.config?.data ?? null),
              headers: error?.config.headers,
              baseUrl: error?.config.baseURL,
            },
            response: {
              duration:
                error?.response.headers['endTime'] -
                error?.response.config.headers['startTime'],
              statusCode: error?.response.status,
              body: error?.response.data,
              headers: error?.response.headers,
            },
          },
        });
        return Promise.reject(error);
      },
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await (
      await this.http.get<T>(url, config)
    ).data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return await (
      await this.http.post<T>(url, data, config)
    ).data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return await (
      await this.http.put<T>(url, data, config)
    ).data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await (
      await this.http.delete<T>(url, config)
    ).data;
  }
}
