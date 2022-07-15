import React, { useState, useEffect } from 'react';

export function Repos() {
  const [repos, setRepos] = useState([]);

  //sort by creation date in descending order
  const sortedRepos = repos.sort((a, b) =>
    a.created_at < b.created_at ? 1 : -1
  );
  //   console.log(sortedRepos, 'sorted');

  //fetch from backend
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
  }, []);

  return (
    <div className="App">
      {repos && (
        <div>
          {sortedRepos.map((repo) => (
            <ul key={repo.id}>
              <li>{repo.name}</li>
              <li>description: {repo.description}</li>
              <li>language: {repo.language}</li>
              <li>forks count: {repo.forks_count}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

export default Repos;
