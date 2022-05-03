const fetch = require("cross-fetch");

exports.getData = async (url, token) => {
    let result = await fetch(url, {
        headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            pragma: "no-cache",
            "sec-ch-ua":
                '"Google Chrome";v="87", " GATool_ConceptStatus";v="99", "Chromium";v="87"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            cookie: `connect.sid=${token};`,
        },
        referrer: "https://app.ad-lib.io/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
    });

    let data = await result.json();

    return data;
}