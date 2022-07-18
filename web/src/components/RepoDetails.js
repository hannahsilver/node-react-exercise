import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function RepoDetails() {
  const repoId = useParams();
  const [repo, setRepo] = useState({});

  console.log(repo);

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

  return (
    <div>
      <p>hi</p>
    </div>
  );
}

export default RepoDetails;
