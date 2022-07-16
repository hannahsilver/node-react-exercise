import React from 'react';

export function Repo(props) {
  return (
    <ul key={props.id}>
      <li>{props.name}</li>
      <li>{props.description}</li>
      <li>{props.language}</li>
      <li>{props.forksCount}</li>
    </ul>
  );
}

export default Repo;

// let history = useHistory();
// history.push(`/repo/${id}`);
