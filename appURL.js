const { execSync } = require("child_process");

module.exports = () => {
    var gp = undefined;
    try {
        gp = execSync("gp url 3000").toString().slice(0,-1);
    } catch (error) {}
    const appURL = (gp || process.env["VERCEL_URL"].split('/')[0] || process.env["COSC_CALLBACK_URL"]);
    return appURL;
}