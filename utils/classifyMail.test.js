const { OpenAI } = require('openai');
const { classifyEmails } = require('./classifyMails');

jest.mock('openai', () => {
    return {
        OpenAI: jest.fn().mockImplementation(() => {
            return {
                completions: {
                    create: jest.fn()
                }
            };
        })
    };
});

describe("Test classify middleware", () => {
    it("should return an array of classifications", async () => {
        const mockBody = [
            {
                id: "18ffa257bdfe9ad3",
                threadId: "18ffa257bdfe9ad3",
                snippet: "@OkaroOnochie: https://t.co/cQPfx44eAP Mr No Bitches sent you a Direct Message. https://t.co/cQPfx44eAP Reply Settings | Help | Opt-out | Download app X Corp. 1355 Market Street, Suite 900 San",
                subject: "Mr No Bitches (@OkaroOnochie) has sent you a Direct Message on X!",
                body: "Mr No Bitches sent you a Direct Message.Reply\r\n>"
            },
        ];

        const openAIInstance = new OpenAI('apiKey');
        const mockClassifications = ['important'];
        openAIInstance.completions.create.mockResolvedValue({
            data: {
                choices: mockClassifications.map(label => ({ text: label }))
            }
        });

        const res = await classifyEmails(mockBody, "apiKey");

        expect(res.length).toBeGreaterThan(0);
        expect(res[0]).toBe('important');
    });
});
