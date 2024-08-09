var urlAPI = 'https://66acc4e9f009b9d5c7335514.mockapi.io/products_2';
const btnThem = document.getElementById('btnThem');
const btnCapNhatSP = document.getElementById('btnCapNhatSP');
const btnTimSP = document.getElementById('btnTimSP');
const arrowUp = document.getElementById('arrowUp');
const arrowDown = document.getElementById('arrowDown');

btnThem.addEventListener('click', function(e) {
    e.preventDefault();
    resetModal();
})

btnCapNhatSP.addEventListener('click', function(e) {
    e.preventDefault();
})

btnTimSP.addEventListener('click', function(e) {
    e.preventDefault();
    var loaiSP = document.getElementById('searchName').value.toLowerCase();

    if(arrowUp.style.color == '#007bff' && arrowDown.style.color == '#007bff') {
        searchProduct(loaiSP);
    }
    else if(arrowUp.style.color == 'red') {
        filterAndSortProduct(true);
    }
    else if(arrowDown.style.color == 'red') {
        filterAndSortProduct(false);
    }
})

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

function fetchListProduct() {
    axios({
        url: urlAPI,
        method: "GET",
    }).then(function(res) {
        renderProduct(res.data);
    }).catch(function(err) {})
}
fetchListProduct();

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
                            <button class='btn btn-success' onclick='editProduct(${product.id})'>Sửa</button>
                        </td>
                    </tr>`;
            contentHTML += tString;
    }
    document.getElementById('tableDanhSach').innerHTML = contentHTML;
}

function searchProduct(loaiSP) {
    axios({
        url: urlAPI,
        method: "GET",
    }).then(function(res) {

        var productList = res.data;
        var filterProducts = productList.filter(function(product) {
            return product.type.toLowerCase().includes(loaiSP);
        })

        renderProduct(filterProducts);
    }).catch(function(err) {})
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

function filterAndSortProduct(isAscending) {
    var loaiSP = document.getElementById('searchName').value.toLowerCase();

    axios({
        url: urlAPI,
        method: "GET",
    }).then(function(res) {

        var productList = res.data;
        var filterProducts = productList.filter(function(product) {
            return product.type.toLowerCase().includes(loaiSP);
        })

        if(isAscending !== undefined) {
            filterProducts.sort(function(a, b) {
                return isAscending ? a.price - b.price : b.price - a.price;
            })
        }

        renderProduct(filterProducts);
    }).catch(function(err) {})
}

function addProduct() {
    var product = getDataForm();
    axios({
        url: urlAPI,
        method: "POST",
        data: product,
    }).then(function(res) {
        $("#myModal").modal('hide');
        fetchListProduct();
    }).catch(function(err) {
    });
}

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
    else {

    }
}

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
    }).catch(function(err) {})
}

function updateProduct() {
    var id = document.getElementById('layMaSP').innerText;
    var product = getDataForm();

    axios({
        url: `${urlAPI}/${id}`,
        method: "PUT",
        data: product, 
    }).then(function(res) {
        $('#myModal').modal('hide');
        fetchListProduct();
    }).catch(function(err) {}) 
}

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
        price: price,
        screen: screen,
        backCamera: backCamera,
        frontCamera: frontCamera,
        img: img,
        desc: desc,
        type: type,
    }
}

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