const axios = require("axios");

let baseURL = `http://ec2-54-180-90-248.ap-northeast-2.compute.amazonaws.com:1000`;
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
              apiClient.post(`${baseURL}/login`, {
                token: googleAccessToken,
                loginAttemptType: "google",
              })
                .then(({ data }) => {
                  if (data === 'register') resolve('register')
                  else if (data.accountType == "google")
                    resolve({ ...data, googleAccessToken });
                  else reject({ message: "account type err" });
                })
                .catch((e) => {
                  console.log(e)
                  reject({ userEmail, message: "not registered" });
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
