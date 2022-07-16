import React, { useState, useEffect } from 'react';
import Repo from './Repo';

export function Home() {
  const [repos, setRepos] = useState([]);
  //filteredRepo, setFilteredRepo
  // const [language, setLanguage] = useState('');

  //sort by creation date in descending order
  const sortedRepos = repos.sort((a, b) =>
    a.created_at < b.created_at ? 1 : -1
  );
  //   console.log(sortedRepos, 'sorted');

  //create array with just languages
  const langArray = repos.map((repo) => {
    return [repo.language];
  });
  // console.log(langArray);

  //filter duplicates of language arrays
  const filterLangArray = [...new Set(langArray)];
  // console.log(filterLangArray);

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
          {sortedRepos.map((repo) => {
            return (
              <Repo
                key={repo.id}
                name={repo.name}
                description={repo.description}
                language={repo.language}
                forksCount={repo.forks_count}
              />
            );
          })}
          <ul>
            {filterLangArray.map((language) => {
              return <button key={language}>{language}</button>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
