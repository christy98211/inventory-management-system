var query = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};
var id = query('id') ? query('id') : null;
var validate_flag = true;

if(id){   
    findOneCustomers(id)
}

function findOneCustomers(id) {
    $.ajax({
        url: '/customers-list/find-one/'+id,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          console.log(data)
          if (data.status == 200) { 
                $('#formrow-customCheck').prop("checked", data.data.is_active)
                $('#customer_id').val(data.data.customer_id)
                $('#customer_name').val(data.data.customer_name)
                $('#address').val(data.data.address)
                $('#contact').val(data.data.contact)
                $('#textarea').val(data.data.description)

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

//Add customers
$('#add_customers').on('click',function (e) {
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
        let customer_id = $('#customer_id').val().trim();
        let customer_name = $('#customer_name').val().trim();
        let address = $('#address').val().trim();
        let contact = $('#contact').val().trim();
        let description = $('#textarea').val().trim();

        let data = {
            customer_id: customer_id,
            customer_name: customer_name,
            address: address,
            contact: contact,
            description: description,
            is_active: is_active,
            code : customer_name.toUpperCase()
        };
        $.ajax({
            url: '/customers-add/save', // route path
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
                        text: "Customer Saved Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/customers-list';
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

//Add customers
$('#edit_customers').on('click',function (e) {
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
        let customer_id = $('#customer_id').val();
        let customer_name = $('#customer_name').val().trim();
        let address = $('#address').val().trim();
        let contact = $('#contact').val().trim();
        let description = $('#textarea').val().trim();

        let data = {
            id: id,
            customer_id: customer_id,
            customer_name: customer_name,
            address: address, 
            contact: contact,
            description: description,
            is_active: is_active,
            code : customer_name.toUpperCase()
        };

        console.log("data",data)
        $.ajax({
            url: '/customers-add/update?'+id, // route path
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
                        text: "Customer Updated Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/customers-list';
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


