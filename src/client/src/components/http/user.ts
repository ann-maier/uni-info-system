import axios from 'axios';

import { UserDTO, Observable } from './user.interface';

class UserHTTP implements Observable {
  observers: Function[];
  private static instance: UserHTTP;

  private constructor() {
    this.observers = [];
  }

  subscribe(observer: Function) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Function) {
    this.observers = this.observers.filter(
      subscriber => subscriber !== observer
    );
  }

  async getUsers(URL: string) {
    const userProxy = new UserProxy();
    const userData = await userProxy.getUsers(URL);
    this.notify(userData);
  }

  notify(data: UserDTO) {
    this.observers.forEach(observer => observer(data));
  }

  static getInstance(): UserHTTP {
    if (!UserHTTP.instance) {
      UserHTTP.instance = new UserHTTP();
    }
    return UserHTTP.instance;
  }
}

class User implements User {
  async getUsers(URL: string) {
    const { data } = await axios.get(URL);
    const { _id, first_name, last_name, group, subjects } = data;
    return {
      id: _id,
      firstName: first_name,
      lastName: last_name,
      group,
      subjects: subjects.map(({ subject, assessment, lecturer }: any) => ({
        id: subject._id,
        subject: subject.subject,
        assessment,
        lecturer
      }))
    };
  }
}

class UserProxy implements User {
  private realUser: User = new User();
  private realCache: { [URL: string]: UserDTO } = {};

  async getUsers(URL: string) {
    if (!this.realCache[URL]) {
      this.realCache[URL] = await this.realUser.getUsers(URL);
    }
    return this.realCache[URL];
  }
}

export { UserHTTP, User };
