import axios from 'axios';

import { GET_USER_API, User, Observable } from './user.interface';

const getUsers = (URL: string) => {
  return axios.get(URL);
}

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
    getUsers(GET_USER_API)
      .then(({ data }) => this.observers.forEach(observer => observer(new UserProxy(data))));
  }

  static getInstance(): HTTP {
    if (!HTTP.instance) {
      HTTP.instance = new HTTP();
    }
    return HTTP.instance;
  }
}

class UserProxy implements User {
  id: string;
  lastName: string;
  firstName: string;
  group: string;
  subjects: [];

  constructor(user: any) {
    this.id = user._id;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.group = user.group;
    this.subjects = user.subjects.map(({ subject, assessment, lecturer }
      : { subject: any, assessment: string, lecturer: string }) =>
      ({ id: subject._id, subject: subject.subject, assessment, lecturer })
    );
  }
}

export { HTTP, getUsers };