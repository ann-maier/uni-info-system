import { AxiosPromise } from "axios";

const USER_ID = '5cd71bafdc1fa62330b7423f';
export const GET_USER_API = `/users/${USER_ID}`;

export interface Subject {
  id: string,
  subject: string,
  assessment: boolean,
  lecturer: string
}

export interface User {
  getUsers: () => AxiosPromise
}

export interface UserDTO {
  id: string,
  firstName: string,
  lastName: string,
  group: string,
  subjects: Subject[]
}

export interface Observable {
  subscribe: (observer: Function) => void,
  unsubscribe: (observer: Function) => void,
  notify: () => void
}