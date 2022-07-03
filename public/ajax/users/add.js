var query = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};
var id = query('id') ? query('id') : null;
var validate_flag = true;

$(document).ready(function () {
    getProductCategory();
    getRole();
    getLocation();
    if(id){
        findOneUsers(id)
    }
});

// get product category
function getProductCategory() {
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

// get user role
function getRole() {
    $.ajax({
        type: 'GET',
        url: '/roles-list/list',
        success: function (data) {
            if (data.status == 200) {
                var _data = data.data;
                var catalogue_assign_region = $('#role');
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

// get location 
function getLocation() {
    $.ajax({
        type: 'GET',
        url: '/location-list/list',
        success: function (data) {
            if (data.status == 200) {
                var _data = data.data;
                var catalogue_assign_region = $('#location');
                for (var i = 0; i < _data.length; i++) {
                    if(_data[i].is_active === true){
                        catalogue_assign_region.append('<option value="' + _data[i]._id + '">' + _data[i].city + '</option>');
                    }
                }
            }
        },
        error: function (err) {
            console.log('ERROR', JSON.stringify(err));
        }
    })
}



function findOneUsers(id) {
    $.ajax({
        url: '/users-list/find-one/'+id,
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
                $('#name').val(data.data.name)
                $('#email').val(data.data.email)
                $('#phone_number').val(data.data.phone_number)
                $('#password').val(data.data.password)
                $('#textarea').val(data.data.description)
                $('#product_category').val(data.data.product_category).change();
                $('#gender').val(data.data.gender);
                $('#role').val(data.data.role_id);
                $('#location').val(data.data.location);
                $('#textarea').val(data.data.user_info)
            }
        }, 500);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

//Add users
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
        let name = $('#name').val().trim();
        let user_info = $('#textarea').val().trim();
        let email  = $('#email').val().trim();
        let phone_number = $('#phone_number').val();
        let password = $('#password').val();
        let product_category = $('#product_category').val();
        let gender = $('#gender').val().trim();
        let role_id = $('#role').val();
        let location = $('#location').val();
        let role_code =  $('#role option:selected').text();

        let data = {
            name: name,
            is_active: is_active,
            code : name.toUpperCase(),
            user_info :user_info,
            email  : email,
            phone_number: phone_number,
            password : password,
            product_category: product_category,
            gender : gender,
            role_id : role_id,
            location : location,
            role_code: role_code.toUpperCase()
        };
        console.log(data)

        if(id){
            data.id = id
            $.ajax({
                url: '/users-add/update?'+id, // route path
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
                            text: "User Updated Sucessfully",
                            icon: "success",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                window.location.href = '/users-list';
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
                url: '/users-add/save', // route path
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
                            text: "User Saved Sucessfully",
                            icon: "success",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                window.location.href = '/users-list';
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

//Add users
$('#add_users').on('click',function (e) {
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
        let name = $('#name').val().trim();
        let user_info = $('#textarea').val().trim();
        let email  = $('#email').val().trim();
        let phone_number = $('#phone_number').val();
        let password = $('#password').val();
        let product_category = $('#product_category').val();
        // let gender = $('#gender').val().trim();
        let role_id = $('#role').val();
        let location = $('#location').val();
        let role_code =  $('#role option:selected').text();

        let data = {
            name: name,
            is_active: is_active,
            code : name.toUpperCase(),
            user_info :user_info,
            email  : email,
            phone_number: phone_number,
            password : password,
            product_category: product_category,
            // gender : gender,
            role_id : role_id,
            location : location,
            role_code: role_code.toUpperCase()
        };
        $.ajax({
            url: '/users-add/save', // route path
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
                        text: "Users Saved Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/users-list';
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

//Add users
$('#edit_users').on('click',function (e) {
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
        let name = $('#name').val().trim();
        let user_info = $('#textarea').val().trim();
        let email  = $('#email').val().trim();
        let phone_number = $('#phone_number').val();
        let password = $('#password').val();
        let product_category = $('#product_category').val();
        let role_id = $('#role').val();
        let location = $('#location').val();
        let role_code =  $('#role option:selected').text();

        let data = {
            id: id,
            name: name,
            is_active: is_active,
            code : name.toUpperCase(),
            user_info :user_info,
            email  : email,
            phone_number: phone_number,
            password : password,
            product_category: product_category,
            role_id : role_id,
            location : location,
            role_code: role_code.toUpperCase()
        };


        $.ajax({
            url: '/users-add/update?'+id, // route path
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
                        text: "Users Updated Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/users-list';
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

