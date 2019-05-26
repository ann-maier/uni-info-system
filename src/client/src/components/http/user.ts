import axios from 'axios';
import { AxiosResponse } from 'axios';

import { GET_USER_API, Observable } from './user.interface';

class HTTP implements Observable {
  observers: Function[];
  private static instance: HTTP;

  private constructor() {
    this.observers = [];
  }

  subscribe(observer: Function) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Function) {
    this.observers = this.observers.filter(subscriber => subscriber !== observer);
  }

  notify() {
    const userProxy = new UserProxy();
    userProxy.getUsers(GET_USER_API)
      .then(({ data }: AxiosResponse) => this.observers.forEach(observer => {
        const { _id, first_name, last_name, group, subjects } = data;
        observer({
          id: _id,
          firstName: first_name,
          lastName: last_name,
          group,
          subjects: subjects.map(({ subject, assessment, lecturer }: any) =>
            ({ id: subject._id, subject: subject.subject, assessment, lecturer }))
        });
      }));
  }

  static getInstance(): HTTP {
    if (!HTTP.instance) {
      HTTP.instance = new HTTP();
    }
    return HTTP.instance;
  }
}

class User implements User {
  getUsers(URL: string) {
    return axios.get(URL);
  }
}

class UserProxy implements User {
  private realUser: User = new User();
  private realCache: any = {};

  getUsers(URL: string) {
    if (!this.realCache[URL]) {
      this.realCache[URL] = this.realUser.getUsers(URL);
    }
    return this.realCache[URL];
  }
}

export { HTTP, User };