// Lấy Data
let callApi = "https://66a7892753c13f22a3d01ad6.mockapi.io/product2";
function getList() {
  return axios({
    url: callApi,
    method: "GET",
  });
}
