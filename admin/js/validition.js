function checkImgURL(url, callback) {
    const img = new Image();

    img.onload = () => {
        callback(true);
    };

    img.onerror = () => {
        callback(false);
    };

    img.src = url;
}

function validateForm() {
    var name = document.getElementById('tenSP').value;
    var price = document.getElementById('giaSP').value;
    var screen = document.getElementById('manHinhSP').value;
    var backCamera = document.getElementById('cameraSau').value;
    var frontCamera = document.getElementById('cameraTruoc').value;
    var img = document.getElementById('hinhAnh').value;
    var desc = document.getElementById('moTaSP').value;
    var type = document.getElementById('loaiSP').value;

    let isValid = true;

    if(name == '') {
        document.getElementById('tbTenSP').innerHTML = 'Tên sản phẩm không được để trống';
        isValid = false;
    }
    else {
        document.getElementById('tbTenSP').innerHTML = '';
    }

    if(price <= 0 || price == '') {
        document.getElementById('tbGia').innerHTML = 'Giá sản phẩm không hợp lệ';
        isValid = false;
    }
    else {
        document.getElementById('tbGia').innerHTML = '';
    }

    if(screen == '') {
        document.getElementById('tbManHinh').innerHTML = 'Màn hình sản phẩm không được để trống';
        isValid = false;
    }
    else {
        document.getElementById('tbManHinh').innerHTML = '';
    }

    if(backCamera == '') {
        document.getElementById('tbCameraSau').innerHTML = 'Không được để trống mục này';
        isValid = false;
    }
    else {
        document.getElementById('tbCameraSau').innerHTML = '';
    }

    if(frontCamera == '') {
        document.getElementById('tbCameraTruoc').innerHTML = 'Không được để trống mục này';
        isValid = false;
    }
    else {
        document.getElementById('tbCameraTruoc').innerHTML = '';
    }

    if(img == '') {
        document.getElementById('tbAnhSP').innerHTML = 'Ảnh sản phẩm không được để trống';
        isValid = false;
    }
    else {
        checkImgURL(img, function(isValidImg) {
            if(isValidImg) {
                document.getElementById('tbAnhSP').innerHTML = "";
            }
            else {
                document.getElementById('tbAnhSP').innerHTML = "Đường dẫn không hợp lệ";
                isValid = false;
            }
        });
    }

    if(desc == '') {
        document.getElementById('tbMoTaSP').innerHTML = 'Mô tả sản phẩm không được để trống';
        isValid = false;
    }
    else {
        document.getElementById('tbMoTaSP').innerHTML = '';
    }

    if(type == 'Chọn loại sản phẩm') {
        document.getElementById('tbLoaiSP').innerHTML = 'Hãy chọn loại sản phẩm';
        isValid = false;
    }
    else {
        document.getElementById('tbLoaiSP').innerHTML = '';
    }

    return isValid;
}