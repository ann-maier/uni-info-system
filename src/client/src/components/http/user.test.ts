import { HTTP, User } from './user';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HTTP', () => {
  describe('unsubscribe', () => {
    it('should remove subscriptions', () => {
      const http: HTTP = HTTP.getInstance();
      const subscriber = jest.fn((data) => console.log('I am subscriber!', data));

      http.subscribe(subscriber);
      expect(http.observers.length).toBe(1);

      http.unsubscribe(subscriber);
      expect(http.observers.length).toBe(0);
    });
  });

  describe('subscribe', () => {
    it('should add subscriptions', () => {
      const http: HTTP = HTTP.getInstance();
      const subscriber = jest.fn((data) => console.log('I am subscriber!', data));

      http.subscribe(subscriber);
      http.subscribe(subscriber);

      expect(http.observers.length).toBe(2);
    });
  });

  describe('notify', () => {
    it('should fetch users when notify is fired', () => {
      const mockResponse = { data: 'user data' };
      mockedAxios.get.mockReturnValueOnce(Promise.resolve(mockResponse as AxiosResponse));

      const http: HTTP = HTTP.getInstance();
      http.notify();

      expect(mockedAxios.get).toHaveBeenCalled();
    });
  });

  describe('getInstance', () => {
    it('should return only one instance of the class', () => {
      const http1: HTTP = HTTP.getInstance();
      const http2: HTTP = HTTP.getInstance();

      expect(http1).toEqual(http2);
    });
  });
});

describe('getUsers', () => {
  it('should fetch user info', async () => {
    const user = new User();
    const mockResponse = { data: 'user data' };
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(mockResponse as AxiosResponse));

    const result = await user.getUsers('/test');

    expect(result).toBe(mockResponse);
  });
});