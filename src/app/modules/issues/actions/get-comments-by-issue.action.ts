// import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment.development';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getCommentsByIssue = async (
  issueNumber: string
): Promise<GithubIssue[]> => {
  // await sleep(1500);

  try {
    const response = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error getting comments');
    }

    const comments = (await response.json()) as GithubIssue[];

    return comments;
  } catch (error) {
    throw new Error('Error getting comments');
  }
};
