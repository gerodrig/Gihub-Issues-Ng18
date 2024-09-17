

import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;



export const getIssues = async (): Promise<GithubIssue[]> => {
  await sleep(1500);

  try {
    const response = await fetch(`${BASE_URL}/issues`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error getting issues');
    }

    const issues = (await response.json()) as GithubIssue[];

    return issues;
  } catch (error) {
    throw new Error('Error getting issues');
  }
};
