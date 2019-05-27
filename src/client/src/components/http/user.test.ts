import { UserHTTP, User } from './user';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserHTTP', () => {
  describe('unsubscribe', () => {
    it('should remove subscriptions', () => {
      const http: UserHTTP = UserHTTP.getInstance();
      const subscriber = jest.fn((data) => console.log('I am subscriber!', data));

      http.subscribe(subscriber);
      expect(http.observers.length).toBe(1);

      http.unsubscribe(subscriber);
      expect(http.observers.length).toBe(0);
    });
  });

  describe('subscribe', () => {
    it('should add subscriptions', () => {
      const http: UserHTTP = UserHTTP.getInstance();
      const subscriber = jest.fn((data) => console.log('I am subscriber!', data));

      http.subscribe(subscriber);
      http.subscribe(subscriber);

      expect(http.observers.length).toBe(2);
    });
  });

  describe('getInstance', () => {
    it('should return only one instance of the class', () => {
      const http1: UserHTTP = UserHTTP.getInstance();
      const http2: UserHTTP = UserHTTP.getInstance();

      expect(http1).toEqual(http2);
    });
  });
});

describe('getUsers', () => {
  it('should fetch user info', async () => {
    const user = new User();
    const mockResponse = { data: 'user data' };
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(mockResponse as AxiosResponse));

    user.getUsers('/test');
    
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});