let allProducts = [];
// Mãng giỏ hàng

let cart = [];

// Lưu vào JSON
function saveJSON() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
// Lấy data
function LoadJSON() {
  let storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    renderCart();
  }
}
LoadJSON();

function fetchListProduct() {
  getList()
    .then(function (result) {
      allProducts = result.data;
      renderProduct(allProducts);
    })
    .catch((err) => {
      // Thất Bại
    });
}
fetchListProduct();
function renderProduct(listProduct) {
  let contentHTML = "";
  for (let index = 0; index < listProduct.length; index++) {
    let divString = `<div class="col-lg-6 col-md-12">
                            <div class="row">
                                <div id="introPhone" class="col-6 ">
                                    <h4> ${listProduct[index].name}</h4>
                                    <p>Màn Hình: ${
                                      listProduct[index].screen
                                    }</p>
                                    <p>Camera sau: ${
                                      listProduct[index].backCamera
                                    }</p>
                                    <p>Camera Trước:  ${
                                      listProduct[index].frontCamera
                                    }</p>
                                    <p>Ưu Điểm: ${listProduct[index].desc}</p>
                                    <p>Giá Bán: <span class="price">
                                    ${listProduct[
                                      index
                                    ].price.toLocaleString()}$</span></p>
                                    <div>
                                    <button onclick="addCart(${index})" type="button" class="btn btn-success"> <i class="fa fa-shopping-cart"></i> Thêm Vào Giỏ Hàng</button>
                                    </div>
                                </div>
                                <div id="imagePhone" class="col-6">
                                    <img src="${
                                      listProduct[index].img
                                    }" class="img-fluid" alt="">
                                </div>
                            </div>
                        </div>`;
    contentHTML += divString;
  }
  document.getElementById("productList").innerHTML = contentHTML;
}

// Fillter lọc hiển thị

function filterProducts() {
  let filterValue = document.getElementById("productFilter").value;

  if (filterValue === "all") {
    fetchListProduct();
  } else {
    let filteredProducts = allProducts.filter(
      (itemProduct) =>
        itemProduct.type.toLowerCase() === filterValue.toLowerCase()
    );
    renderProduct(filteredProducts);
  }
}

// addCart
function addCart(index) {
  let product = allProducts[index];
  let item = cart.find((item) => item.id === product.id);
  if (item) {
    item.quantity += 1;
    item.totalPrice = item.quantity * item.price;
  } else {
    let cartItem = {
      id: product.id,
      name: product.name,
      quantity: 1,
      price: product.price,
      totalPrice: product.price,
    };
    cart.push(cartItem);
  }
  renderCart();
  saveJSON();
}

// Render cart
function renderCart() {
  let cartSP = document.getElementById("Modal_SP");
  let contentHTML = "";
  let totalAmount = 0;

  cart.forEach((item) => {
    totalAmount += item.totalPrice;
    contentHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.totalPrice.toLocaleString()}$</td>
      <td>
        <button type="button" class="btn btn-success" onclick="updateCartItem('${
          item.id
        }', -1)">-</button>
        <span>${item.quantity}</span>
        <button type="button" class="btn btn-success" onclick="updateCartItem('${
          item.id
        }', 1)">+</button>
      </td>
    </tr>`;
  });

  //  tổng tiền
  contentHTML += `<tr>
    <td class="pt-5" colspan="3"><strong>Tổng Tiền:</strong></td>
    <td class="pt-5"><strong>${totalAmount.toLocaleString()}$</strong></td>
  </tr>`;

  cartSP.innerHTML = contentHTML;
}

/**
 Trong giao diện giỏ hàng, cho phép người dùng chỉnh sửa số lượng (gợi ý: cho 2 nút tăng giảm),viết hàm gắn vào 2 nút đó, khi nhấn vào thì truyền vào id, tìm trong mảng giỏ hàng xem sản phẩm đó nằm ở đâu, lấy quantity ra tăng hoặc giảm , sau đó render lại giao diện
 */
function updateCartItem(productId, change) {
  let item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    } else {
      item.totalPrice = item.quantity * item.price;
    }
    renderCart();
    saveJSON();
  }
}

// Người dùng nhấn nút thanh toán, clear giỏ hàng, set mảng giỏ hàng về mảng rỗng []
function buyNow() {
  // Xóa giỏ hàng
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
  alert("Cảm ơn bạn đã mua hàng!");
}
