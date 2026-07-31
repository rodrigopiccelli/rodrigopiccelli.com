/**
 * WebMCP Support for Agent Discovery
 * Exposes tools to AI agents via the WebMCP API
 * https://webmachinelearning.github.io/webmcp/
 */

if (typeof navigator !== 'undefined' && navigator.modelContext) {
    navigator.modelContext.provideContext({
        tools: [
            {
                name: "open_github_profile",
                description: "Open Rodrigo Piccelli's GitHub profile",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                },
                execute: async () => {
                    window.open('https://github.com/rodrigopiccelli');
                    return { success: true, url: 'https://github.com/rodrigopiccelli' };
                }
            },
            {
                name: "open_linkedin_profile",
                description: "Open Rodrigo Piccelli's LinkedIn profile",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                },
                execute: async () => {
                    window.open('https://linkedin.com/in/rodrigopiccelli');
                    return { success: true, url: 'https://linkedin.com/in/rodrigopiccelli' };
                }
            },
            {
                name: "open_instagram_profile",
                description: "Open Rodrigo Piccelli's Instagram profile",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                },
                execute: async () => {
                    window.open('https://www.instagram.com/rodrigopiccelli/');
                    return { success: true, url: 'https://www.instagram.com/rodrigopiccelli/' };
                }
            }
        ]
    });
}
