const request = require('supertest');
const { server } = require('../app');
const { google } = require('googleapis');
const base64url = require('base64url');

jest.mock('googleapis',()=> {
    const gmailMock = {
        users:{
            messages: {
                list: jest.fn(),
                get: jest.fn(),
            }
        }
    }

    return {
        google: {
            gmail: jest.fn().mockReturnValue(gmailMock),
            auth:{
                OAuth2: jest.fn().mockImplementation(() => {
                    return {
                        setCredentials: jest.fn(),
                    };
                }),
            }
        }
    }
})




afterEach((done) => {
    server.close(done);
});

describe('Test the mails endpoint', (done)=>{
    it('should return a list of mocked mail', async ()=>{

        const gmail = google.gmail()

        gmail.users.messages.list.mockResolvedValue({
            data: {
              messages: [
                { id: '1', threadId: 't1' },
                { id: '2', threadId: 't2' },
              ],
            },
        });

        gmail.users.messages.get.mockResolvedValueOnce({
          data: {
            id: '1',
            threadId: 't1',
            snippet: 'Snippet 1',
            payload: {
              headers: [{ name: 'Subject', value: 'Subject 1' }],
              parts: [{ mimeType: 'text/plain', body: { data: base64url.encode('Body 1') } }],
            },
          },
        }).mockResolvedValueOnce({
          data: {
            id: '2',
            threadId: 't2',
            snippet: 'Snippet 2',
            payload: {
              headers: [{ name: 'Subject', value: 'Subject 2' }],
              parts: [{ mimeType: 'text/plain', body: { data: base64url.encode('Body 2') } }],
            },
          },
        });

        const res = await request(server).get('/mail').set('Authorization', 'Bearer accesskeyyy')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual([
                {
                  id: '1',
                  threadId: 't1',
                  snippet: 'Snippet 1',
                  subject: 'Subject 1',
                  body: 'Body 1',
                },
                {
                  id: '2',
                  threadId: 't2',
                  snippet: 'Snippet 2',
                  subject: 'Subject 2',
                  body: 'Body 2',
                },
              ]);
    })
})











