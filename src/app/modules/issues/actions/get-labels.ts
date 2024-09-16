import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  try {
    const response = await fetch(
      'https://api.github.com/repos/angular/angular/labels'
    );

    if (!response.ok) {
      throw new Error('Error getting labels');
    }

    const labels = (await response.json()) as GithubLabel[];

    console.log(labels);

    return labels;
  } catch (error) {
    throw new Error('Error getting labels');
  }
};
