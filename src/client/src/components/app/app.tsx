import React, { useState, useEffect } from 'react';

import { AssessmentComponent } from '../assessment/assessment';
import { HTTP } from '../http/user';
import { User } from '../http/user.interface';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({ id: '', firstName: '', lastName: '', group: '', subjects: [] });

  useEffect(() => {
    const httpObservable = HTTP.getInstance();
    httpObservable.subscribe((user: User) => setUser(user));
    httpObservable.notify();
  }, []);

  return <AssessmentComponent user={user} />;
};

export default App;
