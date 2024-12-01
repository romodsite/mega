function transformToPaidLink(originalUrl, apiUrl, apiToken, advertType = 1) {
    // Helper function to encode URL in Base64 format
    function fps_b64_encode(url) {
        return btoa(encodeURIComponent(url).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }

    if (!originalUrl || !apiUrl || !apiToken) {
        console.error("Missing parameters: originalUrl, apiUrl, or apiToken");
        return originalUrl;
    }

    // Construct the paid URL
    return `${apiUrl}full?api=${encodeURIComponent(apiToken)}&url=${fps_b64_encode(originalUrl)}&type=${encodeURIComponent(advertType)}`;
}

// Example usage:
const originalUrl = "https://example.com";
const apiUrl = "https://shrtfly.com/";
const apiToken = "a1e3a1bbddfc42bbdfd0eb2a600495bb";
const advertType = 1; // Optional, default is 1

// const paidLink = transformToPaidLink(originalUrl, apiUrl, apiToken, advertType);
// console.log(paidLink); // This will print the transformed paid link
