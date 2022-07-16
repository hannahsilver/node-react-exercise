import { Router, Request, Response } from 'express';
import repoData from '../../data/repos.json';
const axios = require('axios');
export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  try {
    const response = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );

    // console.log(response.data);

    //aggregating the 2 endpoints
    let data = repoData.concat(response.data);

    //filtering false forks
    const filteredData = data.filter((data) => data.fork === false);

    res.json(filteredData);
  } catch (err) {
    console.log(err);
  }
});
