import React, { useState, useEffect } from 'react';

import './app.css';
import { AssessmentComponent } from '../assessment/assessment';
import { UserHTTP } from '../http/user';
import { User } from '../http/user.interface';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({ id: '', firstName: '', lastName: '', group: '', subjects: [] });

  useEffect(() => {
    const httpObservable = UserHTTP.getInstance();
    httpObservable.subscribe((user: User) => setUser(user));
    httpObservable.notify();
  }, []);

  return <AssessmentComponent user={user} />;
};

export default App;
