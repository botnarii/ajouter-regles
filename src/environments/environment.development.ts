export const environment = {
    production: false,
    msalConfig: {
        auth: {
            clientId: 'd26031bc-0c36-4452-aed6-ecada314eba5',
            authority: 'https://login.microsoftonline.com/b565dcff-7372-479c-a5d5-b1205b061009/',
        }
    },
    apiConfig: {
        scopesBase: ['user.read', 'user.read.all', 'User.ReadWrite.All', 'Directory.ReadWrite.All', 'User.Invite.All', 'User.ManageIdentities.All'],
		uriBase: 'https://graph.microsoft.com/v1.0',
        scopes: ['user.read', 'User.ReadWrite.All'],
        uri: 'https://graph.microsoft.com/v1.0/me',
        scopesApiUsers: ['https://cispmessb2c.onmicrosoft.com/creation-usag/api/user.read'],
        uriApiUsers: 'https://localhost:7158',
    },
    authorityDomain: 'cispmessb2c.onmicrosoft.com'
};
