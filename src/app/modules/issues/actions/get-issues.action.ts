

import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GithubIssue, State } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;



export const getIssues = async (state: State = State.All, selectedLabels: string[]): Promise<GithubIssue[]> => {
  await sleep(1500);

  const params = new URLSearchParams();
  params.append('state', state);

  if(selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }


  try {
    const response = await fetch(`${BASE_URL}/issues?${params}`, {
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
