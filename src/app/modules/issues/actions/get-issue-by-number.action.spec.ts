import { environment } from 'src/environments/environment.development';
import { getIssueByNumber } from './get-issue-by-number.action';

const issueNumber = '123';
const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.githubToken;

const mockIssue = {
  id: 123,
  number: issueNumber,
  body: 'Issue body',
};

describe('GetIssueByNumber action', () => {
  it('should fetch issue successfully', async () => {
    // Arrange
    const requestURl = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    // Act
    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    const issue = await getIssueByNumber(issueNumber);
    // Assert
    expect(window.fetch).toHaveBeenCalledWith(requestURl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
  });

  it('should not fetch issue successfully', async () => {
    const requestURl = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse);

    try {
      const issue = await getIssueByNumber(issueNumber);

      //? Fail test if it gets here because it should throw an error
      expect(true).toBe(false);
    } catch (error) {
      console.log(error);
      expect(error).toEqual(new Error('Error getting issue'));
    }
    // expect(window.fetch).toHaveBeenCalledWith(requestURL, {
    //   headers: {
    //     Authorization: `Bearer ${GITHUB_TOKEN}`,
    //   },
    // });
  });
});
