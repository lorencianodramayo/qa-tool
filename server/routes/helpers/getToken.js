const fetch = require("cross-fetch");

exports.getToken = async () => {
    var details = {
        username: process.env.ADLIB_USER,
        password: process.env.ADLIB_PASS,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var loginRequest = await fetch("https://api-app.ad-lib.io/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
    });

    var responseHeaders = loginRequest.headers;
    var responseCookies = responseHeaders.get("set-cookie");
    var loginCookie = responseCookies.substr(
        responseCookies.indexOf("connect.sid=") + 12,
        responseCookies.indexOf(";") -
        (responseCookies.indexOf("connect.sid=") + 12)
    );

    return {token: loginCookie};
}