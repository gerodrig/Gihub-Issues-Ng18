import { environment } from 'src/environments/environment.development';
import { getCommentsByIssue } from './get-comments-by-issue.action';

const issueNumber = '123';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

const mockComments: any[] = [
  {
    id: 1,
    body: 'Comment 1',
    user: { login: 'user1' },
  },
  {
    id: 2,
    body: 'Comment 2',
    user: {
      login: 'user2',
    },
  },
];

describe('getIssueComments', () => {
  it('Should fetch issue comments successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueCommentsResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    const issue = await getCommentsByIssue(issueNumber);

    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
  });

  it('Should throw an error if the response is not ok', async () => {
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getCommentsByIssue(issueNumber);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toEqual(new Error('Error getting comments'));
    }
  });
});
