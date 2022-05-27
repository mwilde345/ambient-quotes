const axios = require("axios").default;

export const query = async (params) => {
  console.log(params);
  // const result = await axios.post("localhost:4000/graphql", params);
  return axios({
    url: "http://localhost:4000/graphql",
    method: "post",
    data: params,
  })
    .then(function (response) {
      // console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
