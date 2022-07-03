var query = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};
var id = query('id') ? query('id') : null;
var validate_flag = true;

function getItems() {
    $.ajax({
        type: 'GET',
        url: '/items-list/list',
        success: function (data) {
            if (data.status == 200) {
                var _data = data.data;
                var catalogue_assign_region = $('#item_name');
                for (var i = 0; i < _data.length; i++) {
                    if(_data[i].is_active === true){
                        catalogue_assign_region.append('<option value="' + _data[i]._id + '" rate="' + _data[i].rate + '">' + _data[i].product_name + '</option>');
                    }
                }
            }
        },
        error: function (err) {
            console.log('ERROR', JSON.stringify(err));
        }
    })
}

$(document).ready(function () {
    getCustomer_id();
    getItems();
    getCustomer_name();
    if(id){
        findOneSales(id)
    }
    
});


function getCustomer_id() {
    $.ajax({
        type: 'GET',
        url: '/customers-list/list',
        success: function (data) {
            if (data.status == 200) {
                var _data = data.data;
                var catalogue_assign_region = $('#customer_id');
                for (var i = 0; i < _data.length; i++) {
                    if(_data[i].is_active === true){
                        catalogue_assign_region.append('<option value="' + _data[i]._id + '">' + _data[i].customer_id + '</option>');
                    }
                }
            }
        },
        error: function (err) {
            console.log('ERROR', JSON.stringify(err));
        }
    })
}

// get sales
function getCustomer_name() {
    $.ajax({
        type: 'GET',
        url: '/customers-list/list',
        success: function (data) {
            if (data.status == 200) {
                var _data = data.data;
                var catalogue_assign_region = $('#customer_name');
                for (var i = 0; i < _data.length; i++) {
                    if(_data[i].is_active === true){
                        catalogue_assign_region.append('<option value="' + _data[i]._id + '">' + _data[i].customer_name + '</option>');
                    }
                }
            }
        },
        error: function (err) {
            console.log('ERROR', JSON.stringify(err));
        }
    })
}


function findOneSales(id) {
    $.ajax({
        url: '/sales-list/find-one/'+id,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          console.log(data)
          setTimeout(function(){ 

          if (data.status == 200) {
                $('#formrow-customCheck').prop("checked", data.data.is_active)
                $('#customer_id').val(data.data.customer_id);
                $('#customer_name').val(data.data.customer_name);
                $('#item_name').val(data.data.item_name);
                $('#item_quantity').val(data.data.item_quantity);
                $('#bill_amount').val(data.data.bill_amount)
                $('#textarea').val(data.data.description)
            }
        }, 500);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

function reduceItemQuantity(id,quantity) {
    $.ajax({
        url: `/items-list/find-one-reduce-quantity/${id}?quantity=${quantity}`,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          console.log(data)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

$('#item_quantity').on('change',function (e) {
    let quantity = $('#item_quantity').val()
    let rate = $('#item_name option:selected').attr('rate')
    let bill = quantity * rate;
    $('#bill_amount').val(bill )

})

//Add sales
$('#add_master').on('click',function (e) {
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
        let customer_id =  $('#customer_id option:selected').val();
        let customer_name =  $('#customer_name option:selected').val();
        let item_name =  $('#item_name option:selected').val();
        let item_quantity =  $('#item_quantity').val();
        let bill_amount = $('#bill_amount').val().trim();
        let description = $('#textarea').val().trim();

        let data = {
            id: id,
            customer_id: customer_id,
            customer_name: customer_name,
            item_name: item_name,
            item_quantity: item_quantity,
            bill_amount: bill_amount,
            description: description,
            is_active: is_active,
            code : customer_name.toUpperCase()
        };

        console.log(data)

        if(id){
            data.id = id
            $.ajax({
                url: '/sales-add/update?'+id, // route path
                type: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': "application/json",
                },
                'success': function (data, textStatus, request) {
                    console.log(data)
        
                    if (data.status == 200) {    
                        reduceItemQuantity(id,item_quantity)                
                        swal.fire({
                            title: "Update",
                            text: "Sales Updated Sucessfully",
                            icon: "success",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                window.location.href = '/sales-list';
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
        }else{
            $.ajax({
                url: '/sales-add/save', // route path
                type: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': "application/json",
                },
                'success': function (data, textStatus, request) {
                    console.log(data)
        
                    if (data.status == 200) {
                        reduceItemQuantity(id,item_quantity)
                        swal.fire({
                            title: "Save",
                            text: "Sales Saved Sucessfully",
                            icon: "success",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                window.location.href = '/sales-list';
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
    }
});

//Add sales
$('#add_sales').on('click',function (e) {
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
        let customer_id =  $('#customer_id option:selected').val();
        let customer_name =  $('#customer_name option:selected').val();
        let item_name =  $('#item_name option:selected').val();
        let item_quantity =  $('#item_quantity').val();
        let bill_amount = $('#bill_amount').val().trim();
        let description = $('#textarea').val().trim();

        let data = {
            id: id,
            customer_id: customer_id,
            customer_name: customer_name,
            item_name: item_name,
            item_quantity: item_quantity,
            bill_amount: bill_amount,
            description: description,
            is_active: is_active,
            code : customer_name.toUpperCase()
        };
        $.ajax({
            url: '/sales-add/save', // route path
            type: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            },
            'success': function (data, textStatus, request) {
                console.log(data)
    
                if (data.status == 200) {
                    reduceItemQuantity(item_name,item_quantity)
                    swal.fire({
                        title: "Save",
                        text: "Sales Saved Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/sales-list';
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

//Add sales
$('#edit_sales').on('click',function (e) {
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
        let customer_id =  $('#customer_id option:selected').val();
        let customer_name =  $('#customer_name option:selected').val();
        let item_name =  $('#item_name option:selected').val();
        let item_quantity =  $('#item_quantity').val();
        let bill_amount = $('#bill_amount').val().trim();
        let description = $('#textarea').val().trim();

        let data = {
            id: id,
            customer_id: customer_id,
            customer_name: customer_name,
            item_name: item_name,
            item_quantity: item_quantity,
            bill_amount: bill_amount,
            description: description,
            is_active: is_active,
            code : customer_name.toUpperCase()
        };

        $.ajax({
            url: '/sales-add/update?'+id, // route path
            type: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json",
            },
            'success': function (data, textStatus, request) {
                console.log(data)
    
                if (data.status == 200) {    
                    reduceItemQuantity(item_name,item_quantity)                
                    swal.fire({
                        title: "Update",
                        text: "Sales Updated Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/sales-list';
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

 