chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'getTopSites') {
		let response = {};
		// Obtenha os sites mais acessados usando a API chrome.topSites
		chrome.topSites.get(function (topSites) {
			// Envie os sites mais acessados como resposta ao Content Script
			response['topSites'] = topSites;
		});

		sendResponse(response);
		return true; // Permite a comunicação assíncrona
	} else if (request.action == 'search') {
		chrome.search.query({ text: request.query });
	}
});
