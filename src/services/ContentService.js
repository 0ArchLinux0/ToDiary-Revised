const axios = require("axios");

// let baseURL = `http://ec2-54-180-90-248.ap-northeast-2.compute.amazonaws.com:1000`;
let baseURL = `http://localhost:3083`

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers": "*",
  "Access-Control-Allow-Methods": "*",
};

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const apiClient = axios.create({
  headers,
  timeout: 60 * 60 * 1000,
});

export default {
  postContent(contentInfo) {
    return apiClient.post(`${baseURL}/content`, contentInfo);
  },
  getPostit(_id) {
    // console.log(_id);
    return apiClient.get(`${baseURL}/postIt`, {
      params: { _id },
    });
  }
  // exists(query) {
  //   return apiClient.get(baseURL + "/content", {
  //     params: {
  //       email: accountInfo.id,
  //     },
  //   });
  // },
};
