const { httpGet } = require('./mock-http-interface');

/**
 * Execute a HTTP GET request for an Arnie Quote URL and return the HTTP response.
 * 
 * @param {string} url Arnie Quote URL string.
 * @returns {Promise<Object>} Promise containing the HTTP response object for the Arnie Quote URL.
 * 
 * @throws Will throw if HTTP GET request fails.
 */
const httpGetArnieQuoteUrl = async (url) => {
  try {
    return httpGet(url);
  } catch (error) {
    console.error(`HTTP GET request failed for Arnie Quote URL (${url})`, error);
    throw(error);
  }
}

/**
 * Parse a HTTP GET response for an Arnie Quote URL into
 * an Arnie Quote message object.
 * 
 * @param {Object} urlResp HTTP GET response for an Arnie Quote URL.
 * @returns {Promise<Object>} Promise containing the parsed Arnie Quote message object.
 * 
 * @throws Will throw if parsing the HTTP response fails.
 */
const parseArnieQuoteHttpResp = async (urlResp) => {
  try {
    const { status, body } = urlResp;
    const bodyObj = JSON.parse(body);
    if (status === 200) {
      return { "Arnie Quote": bodyObj.message };
    } else {
      return { "FAILURE": bodyObj.message };
    }
  } catch (error) {
    console.error("Failed to parse Arnie Quote HTTP response", error);
    throw(error);
  }
}

const getArnieQuotes = async (urls) => {
  try {
    // Asynchronously HTTP GET and parse each URL.
    const arnieQuotePromises = urls.map(async (url) => {
      const urlHttpResp = await httpGetArnieQuoteUrl(url);
      const arnieQuoteMsg = await parseArnieQuoteHttpResp(urlHttpResp);

      return arnieQuoteMsg;
    });

    // Wait for all Arnie quote messages to be processed in promise array.
    const results = await Promise.all(arnieQuotePromises);

    return results;
  } catch (error) {
    console.error("Failed to get Arnie Quote URL messages", error);
    throw(error);
  }
};

module.exports = {
  getArnieQuotes,
};
