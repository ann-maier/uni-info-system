import React, { useState, useEffect } from 'react';

import { AssessmentComponent } from '../assessment/assessment';
import { UserHTTP } from '../http/user';
import { GET_USER_API, UserDTO } from '../http/user.interface';

const App: React.FC = () => {
  const [user, setUser] = useState<UserDTO>({ id: '', firstName: '', lastName: '', group: '', subjects: [] });

  useEffect(() => {
    const httpObservable = UserHTTP.getInstance();
    httpObservable.subscribe((user: UserDTO) => setUser(user));
    httpObservable.getUsers(GET_USER_API);
  }, []);

  return <AssessmentComponent user={user} />;
};

export default App;
