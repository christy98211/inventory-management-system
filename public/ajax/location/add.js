var query = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};
var id = query('id') ? query('id') : null;
var validate_flag = true;

$(document).ready(function () {
    getCountry();
    getState();
    if(id){
        findOneLocation(id) 
    }
     
});

// get location
function getState() {
    $.ajax({
        type: 'GET',
        url: '/state-list/list',
        success: function (data) {
            if (data.status == 200) {
                var _data = data.data;
                var catalogue_assign_region = $('#state');
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
function getCountry() {
    $.ajax({
        type: 'GET',
        url: '/country-list/list',
        success: function (data) {
            if (data.status == 200) {
                var _data = data.data;
                var catalogue_assign_region = $('#country');
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


function findOneLocation(id) {
    $.ajax({
        url: '/location-list/find-one/'+id,
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
                $('#name').val(data.data.city)
                $('#state').val(data.data.state);
                $('#country').val(data.data.country);
                $('#textarea').val(data.data.description)
            }
        }, 500);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

//Add location
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
        let description = $('#textarea').val().trim();
        let state =  $('#state option:selected').val();
        let country =  $('#country option:selected').val();

        let data = {
            city: name,
            state: state,
            country: country,
            description: description,
            is_active: is_active,
            code : name.toUpperCase()
        };

        console.log(data)

        if(id){
            data.id = id
            $.ajax({
                url: '/location-add/update?'+id, // route path
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
                            text: "Location Updated Sucessfully",
                            icon: "success",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                window.location.href = '/location-list';
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
                url: '/location-add/save', // route path
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
                            text: "Location Saved Sucessfully",
                            icon: "success",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                window.location.href = '/location-list';
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

//Add location
$('#add_location').on('click',function (e) {
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
        let state =  $('#state option:selected').val();
        let country =  $('#country option:selected').val();

        let data = {
            city: name,
            state: state,
            country: country,
            description: description,
            is_active: is_active,
            code : name.toUpperCase()
        };
        $.ajax({
            url: '/location-add/save', // route path
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
                        text: "Location Saved Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/location-list';
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

//Add location
$('#edit_location').on('click',function (e) {
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
        let state =  $('#state option:selected').val();
        let country =  $('#country option:selected').val();

        let data = {
            id: id,
            city: name,
            state: state,
            country: country,
            description: description,
            is_active: is_active,
            code : name.toUpperCase()
        };

        $.ajax({
            url: '/location-add/update?'+id, // route path
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
                        text: "Location Updated Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/location-list';
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

 