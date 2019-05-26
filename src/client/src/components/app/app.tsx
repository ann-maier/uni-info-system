import React, { useState, useEffect } from 'react';

import { AssessmentComponent } from '../assessment/assessment';
import { HTTP } from '../http/user';
import { UserDTO } from '../http/user.interface';

const App: React.FC = () => {
  const [user, setUser] = useState<UserDTO>({ id: '', firstName: '', lastName: '', group: '', subjects: [] });

  useEffect(() => {
    const httpObservable = HTTP.getInstance();
    httpObservable.subscribe((user: UserDTO) => setUser(user));
    httpObservable.notify();
  }, []);

  return <AssessmentComponent user={user} />;
};

export default App;
