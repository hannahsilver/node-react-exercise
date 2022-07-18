import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function RepoDetails() {
  const navigate = useNavigate();

  const repoId = useParams();
  const [repo, setRepo] = useState({});
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [readMe, setReadMe] = useState('');

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

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
    )
      .then((res) => res.text())
      .then((data) => {
        console.log(data, 'readme');
        setReadMe(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [repo]);

  return (
    <div>
      <button
        onClick={(ev) => {
          ev.stopPropagation();
          // console.log('hi');
          navigate('/');
        }}
      >
        back to repos
      </button>
      {name ? (
        <div>
          <ul>
            <li>NAME: {name}</li>
            <li>DATE: {date}</li>
            <li>MESSAGE: {message}</li>
          </ul>
          {readMe ? <p>{readMe}</p> : null}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default RepoDetails;
