// import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import type { GithubLabel } from '../interfaces/github-label.interface';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;



export const getLabels = async (): Promise<GithubLabel[]> => {
  // await sleep(1500);

  try {
    const response = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error getting labels');
    }

    const labels = (await response.json()) as GithubLabel[];

    return labels;
  } catch (error) {
    throw new Error('Error getting labels');
  }
};
