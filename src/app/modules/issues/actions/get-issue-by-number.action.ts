import { environment } from 'src/environments/environment.development';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

export const getIssueByNumber = async (
  issueNumber: string
): Promise<GithubIssue> => {

  try {
    const response = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error getting issue');
    }

    const issue = (await response.json()) as GithubIssue;

    return issue;
  } catch (error) {
    throw new Error('Error getting issue');
  }
};
