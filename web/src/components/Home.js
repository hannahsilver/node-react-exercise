import React, { useState, useEffect } from 'react';
import Repo from './Repo';

export function Home() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState(repos);

  //fetch from backend
  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        //sort by creation date in descending order
        const sortedData = data.sort((a, b) =>
          a.created_at < b.created_at ? 1 : -1
        );
        // console.log(sortedData);
        setRepos(sortedData);
        setFilteredRepos(sortedData);
      });
  }, []);

  //create array with just languages
  const langArray = repos.map((repo) => {
    return repo.language;
  });
  // console.log(langArray);

  //filter duplicates of language arrays
  const filterLangArray = [...new Set(langArray)];
  // console.log(filterLangArray);

  // filtering data by language type
  function handleClick(language) {
    const filterLanguage = repos.filter((repo) => repo.language === language);
    // console.log(filterLanguage, 'filterlang');
    return setFilteredRepos(filterLanguage);
  }

  return (
    <div className="App">
      <ul>
        {filterLangArray.map((lang) => {
          return (
            <button
              key={lang}
              onClick={() => {
                handleClick(lang);
                // console.log(lang, 'lang');
              }}
            >
              {lang}
            </button>
          );
        })}
      </ul>
      {repos && (
        <div>
          {filteredRepos.map((repo) => {
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
        </div>
      )}
    </div>
  );
}

export default Home;
