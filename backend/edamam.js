const axios = require("axios");
require("dotenv").config();


class EdamamClient {
  constructor(appId, appKey) {
    this.appId = process.env.EDAMAM_APP_ID;
    this.appKey = process.env.EDAMAM_APP_KEY;
  }

  async nutritionDetails({ ingr }) {
    const response = await axios.post(
      `https://api.edamam.com/api/nutrition-details?app_id=${this.appId}&app_key=${this.appKey}`,
      { ingr }
    );
    return response.data;
  }
}

module.exports = EdamamClient;