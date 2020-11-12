const { execSync } = require("child_process");

module.exports = () => {
    var gp = undefined;

    try {
        gp = execSync("gp url 3000").toString().slice(0,-1);
    } catch (error) {}

    var appURL = (gp || process.env["COSC_CALLBACK_URL"] || process.env["VERCEL_URL"] );
    
    if (!(appURL.startsWith("https://") || appURL.startsWith("http://"))) {
        appURL = "https://" + appURL;
    }
    return appURL;
}