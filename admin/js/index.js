var urlAPI = 'https://66acc4e9f009b9d5c7335514.mockapi.io/products_2';
const btnThem = document.getElementById('btnThem');
const btnThemSP = document.getElementById('btnThemSP');
const btnCapNhatSP = document.getElementById('btnCapNhatSP');
const btnTimSP = document.getElementById('btnTimSP');
const arrowUp = document.getElementById('arrowUp');
const arrowDown = document.getElementById('arrowDown');
const list = document.getElementById('tableDanhSach');

// Nút thêm sản phẩm, hiện modal và ẩn nút cập nhật
btnThem.addEventListener('click', function(e) {
    e.preventDefault();
    btnThemSP.style.display = 'block';
    btnCapNhatSP.style.display = 'none';
    resetModal();
})

// Nút cập nhật sản phẩm
btnCapNhatSP.addEventListener('click', function(e) {
    e.preventDefault();
})

// Nút tìm sản phẩm
// Tìm theo tiêu chí hoặc chỉ theo loại hoặc kết hợp tìm theo loại + sắp xếp sản phẩm theo giá
btnTimSP.addEventListener('click', function(e) {
    e.preventDefault();
    var tenSP = document.getElementById('searchName').value.toLowerCase();

    if(arrowUp.style.color != 'red' && arrowDown.style.color != 'red') {
        searchProduct(tenSP);
    }
    else if(arrowUp.style.color == 'red') {
        filterAndSortProduct(true);
    }
    else if(arrowDown.style.color == 'red') {
        filterAndSortProduct(false);
    }
})

// Hai mũi tên dùng để sắp xếp danh sách sản phẩm theo giá tiền
arrowUp.addEventListener('click', function(e) {
    e.preventDefault();
    arrowUp.style.color = 'red';
    arrowDown.style.color = '#007bff';
    filterAndSortProduct(true);
})

arrowDown.addEventListener('click', function(e) {
    e.preventDefault();
    arrowUp.style.color = '#007bff';
    arrowDown.style.color = 'red';
    filterAndSortProduct(false);
})

// Bất cứ nút sửa sản phẩm nào cũng sẽ kích hoạt modal, ẩn nút thêm và hiện nút cập nhật
list.addEventListener('click', function(e) {
    if(e.target && e.target.classList.contains('suaSP')) {
        btnThemSP.style.display = 'none';
        btnCapNhatSP.style.display = 'block';
    }
})

// Hàm hiển thị danh sách
function fetchListProduct() {
    axios({
        url: urlAPI,
        method: "GET",
    }).then(function(res) {
        renderProduct(res.data);
    }).catch(function(err) {
        alert(err);
    })
}
fetchListProduct();

// Hàm render có chức năng in danh sách sản phẩm
function renderProduct(listProduct) {
    var contentHTML = '';
    for(var i = 0; i < listProduct.length; i++) {       
        var product = listProduct[i];
        var tString = `<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.screen}</td>
                        <td>${product.backCamera}</td>
                        <td>${product.frontCamera}</td>
                        <td><img src="${product.img}" alt="${product.name}" width="100"></td>
                        <td>${product.desc}</td>
                        <td>${product.type}</td>
                        <td>
                            <button class='btn btn-danger' onclick='delProduct(${product.id})'>Xóa</button>
                            <button class='btn btn-success suaSP' onclick='editProduct(${product.id})'>Sửa</button>
                        </td>
                    </tr>`;
            contentHTML += tString;
    }
    document.getElementById('tableDanhSach').innerHTML = contentHTML;
}

// Hàm hiển thị danh sách sản phẩm dựa vào tên sản phẩm
function searchProduct(tenSP) {
    axios({
        url: urlAPI,
        method: "GET",
    }).then(function(res) {

        var productList = res.data;
        var filterProducts = productList.filter(function(product) {
            return product.name.toLowerCase().includes(tenSP);
        })

        renderProduct(filterProducts);
    }).catch(function(err) {
        alert(err);
    })
}

// function sortProductsByPrice(isAscending) {
//     axios({
//         url: urlAPI,
//         method: "GET",
//     }).then(function(res) {

//         var productList = res.data;
//         productList.sort(function(a, b) {
//             return isAscending ? a.price - b.price : b.price - a.price;
//         })

//         renderProduct(productList);
//     }).catch(function(err) {})
// }


// Hàm hiển thị danh sách sản phẩm dựa vào 2 tiêu chí: loại sản phẩm + sắp xếp giá tiền
function filterAndSortProduct(isAscending) {
    var tenSP = document.getElementById('searchName').value.toLowerCase();

    axios({
        url: urlAPI,
        method: "GET",
    }).then(function(res) {

        var productList = res.data;
        var filterProducts = productList.filter(function(product) {
            return product.name.toLowerCase().includes(tenSP);
        })

        if(isAscending !== undefined) {
            filterProducts.sort(function(a, b) {
                return isAscending ? a.price - b.price : b.price - a.price;
            })
        }

        renderProduct(filterProducts);
    }).catch(function(err) {
        alert(err);
    })
}

// Hàm thêm sản phẩm, có validation
function addProduct() {
    var product = getDataForm();

    var thongBao = document.getElementsByClassName('sp-thongbao');
    if(validateForm() == false) {
        for (let i = 0; i < thongBao.length; i++) {
            thongBao[i].style.display = 'inline-block';
        }
    }
    else {
        axios({
            url: urlAPI,
            method: "POST",
            data: product,
        }).then(function(res) {
            alert('Thêm sản phẩm thành công')
            $("#myModal").modal('hide');
            fetchListProduct();
        }).catch(function(err) {
            alert(err);
        });
    }
}

// Hàm xóa sản phẩm, có xác nhận trước khi xóa
function delProduct(id) {
    const xacNhanXoaSP = confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');
    if(xacNhanXoaSP) {
        axios({
            url: `${urlAPI}/${id}`,
            method: "DELETE",
        }).then(function(res) {
            fetchListProduct();
            alert('Sản phẩm đã bị xóa khỏi danh sách');
        }).catch(function(err) {
            alert('Lỗi! Không thể xóa sản phẩm')
        })
    }
}

// Hàm dùng để hiển thị thông tin sản phẩm cần cập nhật lên trên modal
function editProduct(id) {
    axios({
        url: `${urlAPI}/${id}`,
        method: "GET",
    }).then(function(res) {
        $('#myModal').modal('show');
        var product = res.data;

        document.getElementById('tenSP').value = product.name;
        document.getElementById('giaSP').value = product.price;
        document.getElementById('manHinhSP').value = product.screen;
        document.getElementById('cameraSau').value = product.backCamera;
        document.getElementById('cameraTruoc').value = product.frontCamera;
        document.getElementById('hinhAnh').value = product.img;
        document.getElementById('moTaSP').value = product.desc;
        document.getElementById('loaiSP').value = product.type;

        document.getElementById('layMaSP').innerText = product.id;
    }).catch(function(err) {
        alert(err);
    })
}

// Hàm cập nhật sản phẩm, có validation
function updateProduct() {
    var id = document.getElementById('layMaSP').innerText;
    var product = getDataForm();

    var thongBao = document.getElementsByClassName('sp-thongbao');
    if(validateForm() == false) {
        for (let i = 0; i < thongBao.length; i++) {
            thongBao[i].style.display = 'inline-block';
        }
    }
    else {
        axios({
            url: `${urlAPI}/${id}`,
            method: "PUT",
            data: product, 
        }).then(function(res) {
            alert('Cập nhật sản phẩm thành công');
            $('#myModal').modal('hide');
            fetchListProduct();
        }).catch(function(err) {
            alert(err);
        }) 
    }    
}

// Hàm trung gian dùng để tiếp nhận thông tin nhập vào từ modal
function getDataForm() {
    var name = document.getElementById('tenSP').value;
    var price = document.getElementById('giaSP').value;
    var screen = document.getElementById('manHinhSP').value;
    var backCamera = document.getElementById('cameraSau').value;
    var frontCamera = document.getElementById('cameraTruoc').value;
    var img = document.getElementById('hinhAnh').value;
    var desc = document.getElementById('moTaSP').value;
    var type = document.getElementById('loaiSP').value;
    return {
        name: name,
        price: Number(price),
        screen: screen,
        backCamera: backCamera,
        frontCamera: frontCamera,
        img: img,
        desc: desc,
        type: type,
    }
}

// Hàm reset thông tin trên modal, thường sử dụng khi cần thêm sản phẩm mới
function resetModal() {
    document.getElementById('tenSP').value = "";
    document.getElementById('giaSP').value = "";
    document.getElementById('manHinhSP').value = "";
    document.getElementById('cameraSau').value = "";
    document.getElementById('cameraTruoc').value = "";
    document.getElementById('hinhAnh').value = "";
    document.getElementById('moTaSP').value = "";
    document.getElementById('loaiSP').value = "Chọn loại sản phẩm";

    document.getElementById('layMaSP').innerText = "";
}