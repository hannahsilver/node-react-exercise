import React, { useState, useEffect } from 'react';

export function Repos() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setRepos(data);
      });
    // console.log(repos, 'repos');
  });

  return (
    <div className="App">
      <p>hi</p>
      {repos && (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Repos;
