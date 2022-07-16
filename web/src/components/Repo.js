import React from 'react';

export function Repo(props) {
  return (
    <ul key={props.id} className="repo-container">
      <li> NAME: {props.name}</li>
      <li>DESCRIPTION: {props.description}</li>
      <li>LANGUAGE: {props.language}</li>
      <li>FORKS COUNT: {props.forksCount}</li>
    </ul>
  );
}

export default Repo;
