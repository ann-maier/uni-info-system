import React from 'react';

import './assessment.css';
import { User, Subject } from '../http/user.interface';

interface TableProps {
  subjects: Subject[];
}

const TableComponent: React.SFC<TableProps> = ({ subjects }) => (
  <table>
    <thead>
      <tr>
        <th>Subject</th>
        <th>Assessment Mark</th>
        <th>Lector</th>
      </tr>
    </thead>
    <tbody>
      {
        subjects.map(({ id, subject, assessment, lecturer }: Subject) =>
          <tr key={id}>
            <td>{subject}</td>
            <td>{assessment ? 'A' : 'N/A'}</td>
            <td>{lecturer}</td>
          </tr>
        )
      }
    </tbody>
  </table>
);

interface AssessmentProps {
  user: User;
  className?: string;
}

const AssessmentComponent: React.SFC<AssessmentProps> = ({ user }) => {
  const { id, firstName, lastName, subjects } = user;

  return <div className="App-header">
    {
      id
        ? (
          <>
            <h1>Welcome, {firstName} {lastName}</h1>
            <TableComponent subjects={subjects} />
          </>
        )
        : <h1>Loading...</h1>
    }
  </div>;
}

export { AssessmentComponent };