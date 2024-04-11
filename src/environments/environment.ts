export const environment = {
    production: false,
	msalConfig: {
		auth: {
			clientId: 'ENTER_CLIENT_ID',
			authority: 'ENTER_AUTHORITY'
		}
	},
	apiConfig: {
		scopesBase: ['ENTER_SCOPE'],
		uriBase: 'ENTER_URI',
		scopes: ['ENTER_SCOPE'],
		uri: 'ENTER_URI',
		scopesApiUsers: ['ENTER_SCOPE'],
        uriApiUsers: 'ENTER_URI',
	}
};
