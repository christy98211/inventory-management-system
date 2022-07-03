var query = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};
var id = query('id') ? query('id') : null;
var validate_flag = true;
 
$(document).ready(function () {
    getProduct_category();
if(id){
    findOneItems(id)
}
});

function getProduct_category() {
    $.ajax({
        type: 'GET',
        url: '/category-list/list',
        success: function (data) {
            if (data.status == 200) {
                var _data = data.data;
                var catalogue_assign_region = $('#product_category');
                for (var i = 0; i < _data.length; i++) {
                    if(_data[i].is_active === true){
                        catalogue_assign_region.append('<option value="' + _data[i]._id + '">' + _data[i].name + '</option>');
                    }
                }
            }
        },
        error: function (err) {
            console.log('ERROR', JSON.stringify(err));
        }
    })
}

function findOneItems(id) {
    $.ajax({
        url: '/items-list/find-one/'+id,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          console.log(data)
          if (data.status == 200) {
                $('#formrow-customCheck').prop("checked", data.data.is_active)
                $('#product_id').val(data.data.product_id)
                $('#product_name').val(data.data.product_name)
                $('#product_category').val(data.data.product_category)
                $('#rate').val(data.data.rate)
                $('#quantity').val(data.data.quantity) 
                $('#textarea').val(data.data.description)

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

//Add Items
$('#add_items').on('click',function (e) {
    e.preventDefault();
    $(":input").map(function (item) {
        if ($(this).prop('required')) {
            if (this.value == "") {
                validate_flag = false;
                $("#" + this.id).css('border', '1px solid #f46a6a');
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: #f46a6a;">This field is required</small>').insertAfter("#" + this.id);
            } else {
                validate_flag = true;
                $("#validation_" + this.id).remove();
                $("#" + this.id).css('border', '1px solid #ccc');
            }
        }
    });
    if (!validate_flag) {
    } else {
        let is_active = $('#formrow-customCheck').prop("checked") ? true : false;
        let product_id = $('#product_id').val().trim();
        let product_name = $('#product_name').val().trim();
        let product_category = $('#product_category option:selected').val();
        let rate = $('#rate').val().trim();
        let quantity= $('#quantity').val().trim();
        let textarea = $('#textarea').val().trim();
 
        let data = {
            product_id: product_id,
            product_name: product_name,
            product_category:product_category,
            rate: rate,
            quantity: quantity,
            description: textarea,
            is_active: is_active,
            code : product_name.toUpperCase()
        };
        // console.log("this is my data",data)
        $.ajax({
            url: '/items-add/save', // route path
            type: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            },
            'success': function (data, textStatus, request) {
                console.log(data) 
    
                if (data.status == 200) {
                    swal.fire({
                        title: "Save",
                        text: "Item Saved Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/items-list';
                        }
                    });
                } else {
                    swal.fire({
                        title: "Save",
                        text: data.message,
                        icon: "error",
                        button: true,
                    }).then((value) => {
                    });
                }
    
            },
            'error': function (err) {
                console.log('ERROR', JSON.stringify(err));
            }
    
        });
    }
});

//Add Items
$('#edit_items').on('click',function (e) {
    e.preventDefault();
    $(":input").map(function (item) {
        if ($(this).prop('required')) {
            if (this.value == "") {
                validate_flag = false;
                $("#" + this.id).css('border', '1px solid #f46a6a');
                $("#validation_" + this.id).is(":visible") ? null : $('<small id=validation_' + this.id + ' style="color: #f46a6a;">This field is required</small>').insertAfter("#" + this.id);
            } else {
                validate_flag = true;
                $("#validation_" + this.id).remove();
                $("#" + this.id).css('border', '1px solid #ccc');
            }
        }
    });
    if (!validate_flag) {
    } else {
        let is_active = $('#formrow-customCheck').prop("checked") ? true : false;
        let product_id = $('#product_id').val().trim();
        let product_name = $('#product_name').val().trim();
        let product_category = $('#product_category option:selected').val();
        let rate = $('#rate').val().trim();
        let quantity = $('#quantity').val().trim();
        let description = $('#textarea').val().trim();

        let data = {
            id: id,
            product_id: product_id,
            product_name: product_name,
            product_category: product_category,
            rate: rate,
            quantity: quantity,
            description: description,
            is_active: is_active,
            code : product_name.toUpperCase()
        };

        $.ajax({
            url: '/items-add/update?'+id, // route path
            type: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            },
            'success': function (data, textStatus, request) {
                console.log(data)
    
                if (data.status == 200) {                    
                    swal.fire({
                        title: "Update",
                        text: "Item Updated Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/items-list';
                        }
                    });
                } else {
                    swal.fire({
                        title: "Update",
                        text: data.message,
                        icon: "error",
                        button: true,
                    }).then((value) => {
                    });
                }
    
            },
            'error': function (err) {
                console.log('ERROR', JSON.stringify(err));
            }
    
        });
       
    }
});

