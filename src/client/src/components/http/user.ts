import axios from 'axios';

import { GET_USER_API, UHTTP, User } from './user.interface';

class UserHTTP implements UHTTP {
  private observers: Function[];
  private static instance: UserHTTP;

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
    axios.get(GET_USER_API)
      .then(({ data }) => this.observers.forEach(observer => observer(new UserProxy(data))));
  }

  static getInstance(): UserHTTP {
    if (!UserHTTP.instance) {
      UserHTTP.instance = new UserHTTP();
    }
    return UserHTTP.instance;
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
    this.subjects = user.subjects.map(
      ({
        subject,
        assessment,
        lecturer }: { subject: any, assessment: string, lecturer: string }) => ({
          id: subject._id,
          subject: subject.subject,
          assessment,
          lecturer
        })
    );
  }
}

export { UserHTTP };