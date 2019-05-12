import React from 'react';

import { User } from '../http/user.interface';

interface Props {
  user: User;
}

const AssessmentComponent: React.SFC<Props> = ({ user }) => {
  const { id, firstName, lastName } = user;

  return id
    ? <p>Welcome, {firstName} {lastName}</p>
    : <p>Loading...</p>;
}

export { AssessmentComponent };