// Lấy Data
let callApi = "https://66acc4e9f009b9d5c7335514.mockapi.io/products_2";
function getList() {
  return axios({
    url: callApi,
    method: "GET",
  });
}
