var query = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};
var id = query('id') ? query('id') : null;
var validate_flag = true;

if(id){
    findOneBrand(id)
}

function findOneBrand(id) {
    $.ajax({
        url: '/brand-list/find-one/'+id,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          console.log(data)
          if (data.status == 200) {
                $('#formrow-customCheck').prop("checked", data.data.is_active)
                $('#name').val(data.data.name)
                $('#textarea').val(data.data.description)

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

//Add Brand
$('#add_brand').on('click',function (e) {
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
        let description = $('#textarea').val().trim();

        let data = {
            name: name,
            description: description,
            is_active: is_active,
            code : name.toUpperCase()
        };
        $.ajax({
            url: '/brand-add/save', // route path
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
                        text: "Brand Saved Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/brand-list';
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

//Add Brand
$('#edit_brand').on('click',function (e) {
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
        let description = $('#textarea').val().trim();

        let data = {
            id: id,
            name: name,
            description: description,
            is_active: is_active,
            code : name.toUpperCase()
        };

        $.ajax({
            url: '/brand-add/update?'+id, // route path
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
                        text: "Brand Updated Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/brand-list';
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

