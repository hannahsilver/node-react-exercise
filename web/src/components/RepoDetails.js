import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function RepoDetails() {
  const repoId = useParams();
  const [repo, setRepo] = useState({});
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  // console.log(repo);
  // console.log(repo.full_name);

  // fetch data from id
  useEffect(() => {
    fetch('http://localhost:4000/repos')
      .then((res) => res.json())
      .then((data) => {
        // const repos = data;
        const response = data.filter((r) => r.id === Number(repoId.id));
        // console.log(response);
        setRepo(response[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [repoId]);

  //fetch commits
  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo.full_name}/commits`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setName(data[0].commit.author.name);
        setDate(data[0].commit.author.date);
        setMessage(data[0].commit.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [repo]);

  return (
    <div>
      {name ? (
        <ul>
          <li>NAME: {name}</li>
          <li>DATE: {date}</li>
          <li>MESSAGE: {message}</li>
        </ul>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default RepoDetails;
