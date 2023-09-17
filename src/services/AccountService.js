const axios = require("axios");
// let baseURL = `https://ec2-52-79-233-153.ap-northeast-2.compute.amazonaws.com:2083`;
// let baseURL = `http://ec2-3-134-110-46.us-east-2.compute.amazonaws.com`;
let baseURL = `https://api.todiary.net:2083`;
 
// let baseURL = `http://localhost:2083`

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
  login(accountInfo) {
    console.log(accountInfo);
    return apiClient.get(baseURL + "/email", {
      params: {
        email: accountInfo.id,
      },
    });
  },
  getInfo(userOid, toGrab) {
    // console.log(userOid);
    return apiClient.get(`${baseURL}/accountdata`, {
      params: {
        userOid,
        toGrab,
      },
    });
  },
  exists(filter) {
    return apiClient.get(`${baseURL}/exists`, { params: filter });
  },
  register(data) {
    return apiClient.post(`${baseURL}/register`,data);
  },
  setAccountData(data) {
    return apiClient.post(`${baseURL}/accountdata`, data);
  },
  requestGoogleLogin() {
    return new Promise((resolve, reject) => {
      if (window.gapi && window.gapi.auth2) {
        window.gapi.auth2.getAuthInstance().then((googleAuth) => {
          googleAuth
            .signIn()
            .then(() => {
              const googleUser = googleAuth.currentUser.get();
              const profile = googleUser.getBasicProfile();
              const userEmail = profile.getEmail();
              const googleAccessToken = googleUser.getAuthResponse().id_token;
              console.log(`${baseURL}/login`)
              console.log(googleUser)
              console.log(userEmail)
              apiClient.post(`${baseURL}/login`, {
                token: googleAccessToken,
                loginAttemptType: "google",
              })
                .then(({data}) => {
                  console.log(data);
                  if (data === 'register') resolve(
                    {
                      mode:'register',
                      email: userEmail,
                    })
                  else if (data.accountType == "google")
                    resolve({ ...data, googleAccessToken });
                  else reject({ message: "account type err" });
                })
                .catch((e) => {
                  console.log(e)
                  reject({ userEmail, message: "error" });
                });
              // resolve({email: userEmail, googleAccessToken})
            })
            .catch(() => {
              reject({ message: "failed login" });
            });
        });
      } else {
        // this.$store.dispatch("AccountModule/clearUser");
        // this.$store.dispatch("AccountModule/clearLoginTimeRecord");
        // this.$store.dispatch("AccountModule/clearLoginType");
        resolve();
      }
    });
  },
};
