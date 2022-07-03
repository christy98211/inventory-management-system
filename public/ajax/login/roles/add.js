var query = function (field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};
var id = query('id') ? query('id') : null;
var validate_flag = true;

if(id){
    findOneRoles(id)
}

function findOneRoles(id) {
    $.ajax({
        url: '/roles-list/find-one/'+id,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          if (data.status == 200) {
                $('#formrow-customCheck').prop("checked", data.data.is_active)
                $('#name').val(data.data.name)
                $('#textarea').val(data.data.description)
                $('#dashboard_view').prop("checked", data.data.assign_role[0].dashboard.view)
                $('#dashboard_add').prop("checked", data.data.assign_role[0].dashboard.add)
                $('#dashboard_edit').prop("checked", data.data.assign_role[0].dashboard.edit)
                $('#dashboard_delete').prop("checked", data.data.assign_role[0].dashboard.delete)
                $('#brand_view').prop("checked", data.data.assign_role[0].brand.view)
                $('#brand_add').prop("checked", data.data.assign_role[0].brand.add)
                $('#brand_edit').prop("checked", data.data.assign_role[0].brand.edit)
                $('#brand_delete').prop("checked", data.data.assign_role[0].brand.delete)
                $('#location_view').prop("checked", data.data.assign_role[0].location.view)
                $('#location_add').prop("checked", data.data.assign_role[0].location.add)
                $('#location_edit').prop("checked", data.data.assign_role[0].location.edit)
                $('#location_delete').prop("checked", data.data.assign_role[0].location.delete)
                $('#state_view').prop("checked", data.data.assign_role[0].state.view)
                $('#state_add').prop("checked", data.data.assign_role[0].state.add)
                $('#state_edit').prop("checked", data.data.assign_role[0].state.edit)
                $('#state_delete').prop("checked", data.data.assign_role[0].state.delete)
                $('#country_view').prop("checked", data.data.assign_role[0].country.view)
                $('#country_add').prop("checked", data.data.assign_role[0].country.add)
                $('#country_edit').prop("checked", data.data.assign_role[0].country.edit)
                $('#country_delete').prop("checked", data.data.assign_role[0].country.delete)
                $('#users_view').prop("checked", data.data.assign_role[0].users.view)
                $('#users_add').prop("checked", data.data.assign_role[0].users.add)
                $('#users_edit').prop("checked", data.data.assign_role[0].users.edit)
                $('#users_delete').prop("checked", data.data.assign_role[0].users.delete)
                $('#roles_view').prop("checked", data.data.assign_role[0].roles.view)
                $('#roles_add').prop("checked", data.data.assign_role[0].roles.add)
                $('#roles_edit').prop("checked", data.data.assign_role[0].roles.edit)
                $('#roles_delete').prop("checked", data.data.assign_role[0].roles.delete)
                $('#product_category_view').prop("checked", data.data.assign_role[0].product_category.view)
                $('#product_category_add').prop("checked", data.data.assign_role[0].product_category.add)
                $('#product_category_edit').prop("checked", data.data.assign_role[0].product_category.edit)
                $('#product_category_delete').prop("checked", data.data.assign_role[0].product_category.delete)
                $('#items_view').prop("checked", data.data.assign_role[0].items.view)
                $('#items_add').prop("checked", data.data.assign_role[0].items.add)
                $('#items_edit').prop("checked", data.data.assign_role[0].items.edit)
                $('#items_delete').prop("checked", data.data.assign_role[0].items.delete)
                $('#sales_view').prop("checked", data.data.assign_role[0].sales.view)
                $('#sales_add').prop("checked", data.data.assign_role[0].sales.add)
                $('#sales_edit').prop("checked", data.data.assign_role[0].sales.edit)
                $('#sales_delete').prop("checked", data.data.assign_role[0].sales.delete)
                $('#customers_view').prop("checked", data.data.assign_role[0].customers.view)
                $('#customers_add').prop("checked", data.data.assign_role[0].customers.add)
                $('#customers_edit').prop("checked", data.data.assign_role[0].customers.edit)
                $('#customers_delete').prop("checked", data.data.assign_role[0].customers.delete)


            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

//Add roles
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
        var main_obj = {
            dashboard: {
                view: $('#dashboard_view').prop("checked") ? true : false,
                add: $('#dashboard_add').prop("checked") ? true : false,
                edit: $('#dashboard_edit').prop("checked") ? true : false,
                delete: $('#dashboard_delete').prop("checked") ? true : false,
            },
            brand: {
                view: $('#brand_view').prop("checked") ? true : false,
                add: $('#brand_add').prop("checked") ? true : false,
                edit: $('#brand_edit').prop("checked") ? true : false,
                delete: $('#brand_delete').prop("checked") ? true : false,
            },
            location: {
                view: $('#location_view').prop("checked") ? true : false,
                add: $('#location_add').prop("checked") ? true : false,
                edit: $('#location_edit').prop("checked") ? true : false,
                delete: $('#location_delete').prop("checked") ? true : false,
            },
            state: {
                view: $('#state_view').prop("checked") ? true : false,
                add: $('#state_add').prop("checked") ? true : false,
                edit: $('#state_edit').prop("checked") ? true : false,
                delete: $('#state_delete').prop("checked") ? true : false,
            },
            country: {
                view: $('#country_view').prop("checked") ? true : false,
                add: $('#country_add').prop("checked") ? true : false,
                edit: $('#country_edit').prop("checked") ? true : false,
                delete: $('#country_delete').prop("checked") ? true : false,
            },
            users: {
                view: $('#users_view').prop("checked") ? true : false,
                add: $('#users_add').prop("checked") ? true : false,
                edit: $('#users_edit').prop("checked") ? true : false,
                delete: $('#users_delete').prop("checked") ? true : false,
            },
            roles: {
                view: $('#roles_view').prop("checked") ? true : false,
                add: $('#roles_add').prop("checked") ? true : false,
                edit: $('#roles_edit').prop("checked") ? true : false,
                delete: $('#roles_delete').prop("checked") ? true : false,
            },
            product_category: {
                view: $('#product_category_view').prop("checked") ? true : false,
                add: $('#product_category_add').prop("checked") ? true : false,
                edit: $('#product_category_edit').prop("checked") ? true : false,
                delete: $('#product_category_delete').prop("checked") ? true : false,
            },
            items: {
                view: $('#items_view').prop("checked") ? true : false,
                add: $('#items_add').prop("checked") ? true : false,
                edit: $('#items_edit').prop("checked") ? true : false,
                delete: $('#items_delete').prop("checked") ? true : false,
            },
            sales: {
                view: $('#sales_view').prop("checked") ? true : false,
                add: $('#sales_add').prop("checked") ? true : false,
                edit: $('#sales_edit').prop("checked") ? true : false,
                delete: $('#sales_delete').prop("checked") ? true : false,
            },
            customers: {
                view: $('#customers_view').prop("checked") ? true : false,
                add: $('#customers_add').prop("checked") ? true : false,
                edit: $('#customers_edit').prop("checked") ? true : false,
                delete: $('#customers_delete').prop("checked") ? true : false,
            },
            
        };

        let data = {
            name: name,
            description: description,
            is_active: is_active,
            code : name.toUpperCase(),
            assign_role :  main_obj,
        };

        if(id){
            data.id = id
            $.ajax({
                url: '/roles-add/update?'+id, // route path
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
                            text: "Role Updated Sucessfully",
                            icon: "success",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                window.location.href = '/roles-list';
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
                url: '/roles-add/save', // route path
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
                            text: "Role Saved Sucessfully",
                            icon: "success",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                window.location.href = '/roles-list';
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

//Add roles
$('#add_roles').on('click',function (e) {
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
        var main_obj = {
            dashboard: {
                view: $('#dashboard_view').prop("checked") ? true : false,
                add: $('#dashboard_add').prop("checked") ? true : false,
                edit: $('#dashboard_edit').prop("checked") ? true : false,
                delete: $('#dashboard_delete').prop("checked") ? true : false,
            },
            brand: {
                view: $('#brand_view').prop("checked") ? true : false,
                add: $('#brand_add').prop("checked") ? true : false,
                edit: $('#brand_edit').prop("checked") ? true : false,
                delete: $('#brand_delete').prop("checked") ? true : false,
            },
            location: {
                view: $('#location_view').prop("checked") ? true : false,
                add: $('#location_add').prop("checked") ? true : false,
                edit: $('#location_edit').prop("checked") ? true : false,
                delete: $('#location_delete').prop("checked") ? true : false,
            },
            state: {
                view: $('#state_view').prop("checked") ? true : false,
                add: $('#state_add').prop("checked") ? true : false,
                edit: $('#state_edit').prop("checked") ? true : false,
                delete: $('#state_delete').prop("checked") ? true : false,
            },
            country: {
                view: $('#country_view').prop("checked") ? true : false,
                add: $('#country_add').prop("checked") ? true : false,
                edit: $('#country_edit').prop("checked") ? true : false,
                delete: $('#country_delete').prop("checked") ? true : false,
            },
            users: {
                view: $('#users_view').prop("checked") ? true : false,
                add: $('#users_add').prop("checked") ? true : false,
                edit: $('#users_edit').prop("checked") ? true : false,
                delete: $('#users_delete').prop("checked") ? true : false,
            },
            roles: {
                view: $('#roles_view').prop("checked") ? true : false,
                add: $('#roles_add').prop("checked") ? true : false,
                edit: $('#roles_edit').prop("checked") ? true : false,
                delete: $('#roles_delete').prop("checked") ? true : false,
            },
            product_category: {
                view: $('#product_category_view').prop("checked") ? true : false,
                add: $('#product_category_add').prop("checked") ? true : false,
                edit: $('#product_category_edit').prop("checked") ? true : false,
                delete: $('#product_category_delete').prop("checked") ? true : false,
            },
            items: {
                view: $('#items_view').prop("checked") ? true : false,
                add: $('#items_add').prop("checked") ? true : false,
                edit: $('#items_edit').prop("checked") ? true : false,
                delete: $('#items_delete').prop("checked") ? true : false,
            },
            sales: {
                view: $('#sales_view').prop("checked") ? true : false,
                add: $('#sales_add').prop("checked") ? true : false,
                edit: $('#sales_edit').prop("checked") ? true : false,
                delete: $('#sales_delete').prop("checked") ? true : false,
            },
            customers: {
                view: $('#customers_view').prop("checked") ? true : false,
                add: $('#customers_add').prop("checked") ? true : false,
                edit: $('#customers_edit').prop("checked") ? true : false,
                delete: $('#customers_delete').prop("checked") ? true : false,
            },
            
        };

        let data = {
            name: name,
            description: description,
            is_active: is_active,
            code : name.toUpperCase(),
            assign_role :  main_obj,
        };
        $.ajax({
            url: '/roles-add/save', // route path
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
                        text: "Role Saved Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/roles-list';
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

//Add roles
$('#edit_roles').on('click',function (e) {
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
        var main_obj = {
            dashboard: {
                view: $('#dashboard_view').prop("checked") ? true : false,
                add: $('#dashboard_add').prop("checked") ? true : false,
                edit: $('#dashboard_edit').prop("checked") ? true : false,
                delete: $('#dashboard_delete').prop("checked") ? true : false,
            },
            brand: {
                view: $('#brand_view').prop("checked") ? true : false,
                add: $('#brand_add').prop("checked") ? true : false,
                edit: $('#brand_edit').prop("checked") ? true : false,
                delete: $('#brand_delete').prop("checked") ? true : false,
            },
            location: {
                view: $('#location_view').prop("checked") ? true : false,
                add: $('#location_add').prop("checked") ? true : false,
                edit: $('#location_edit').prop("checked") ? true : false,
                delete: $('#location_delete').prop("checked") ? true : false,
            },
            state: {
                view: $('#state_view').prop("checked") ? true : false,
                add: $('#state_add').prop("checked") ? true : false,
                edit: $('#state_edit').prop("checked") ? true : false,
                delete: $('#state_delete').prop("checked") ? true : false,
            },
            country: {
                view: $('#country_view').prop("checked") ? true : false,
                add: $('#country_add').prop("checked") ? true : false,
                edit: $('#country_edit').prop("checked") ? true : false,
                delete: $('#country_delete').prop("checked") ? true : false,
            },
            users: {
                view: $('#users_view').prop("checked") ? true : false,
                add: $('#users_add').prop("checked") ? true : false,
                edit: $('#users_edit').prop("checked") ? true : false,
                delete: $('#users_delete').prop("checked") ? true : false,
            },
            roles: {
                view: $('#roles_view').prop("checked") ? true : false,
                add: $('#roles_add').prop("checked") ? true : false,
                edit: $('#roles_edit').prop("checked") ? true : false,
                delete: $('#roles_delete').prop("checked") ? true : false,
            },
            product_category: {
                view: $('#product_category_view').prop("checked") ? true : false,
                add: $('#product_category_add').prop("checked") ? true : false,
                edit: $('#product_category_edit').prop("checked") ? true : false,
                delete: $('#product_category_delete').prop("checked") ? true : false,
            },
            items: {
                view: $('#items_view').prop("checked") ? true : false,
                add: $('#items_add').prop("checked") ? true : false,
                edit: $('#items_edit').prop("checked") ? true : false,
                delete: $('#items_delete').prop("checked") ? true : false,
            },
            sales: {
                view: $('#sales_view').prop("checked") ? true : false,
                add: $('#sales_add').prop("checked") ? true : false,
                edit: $('#sales_edit').prop("checked") ? true : false,
                delete: $('#sales_delete').prop("checked") ? true : false,
            },
            customers: {
                view: $('#customers_view').prop("checked") ? true : false,
                add: $('#customers_add').prop("checked") ? true : false,
                edit: $('#customers_edit').prop("checked") ? true : false,
                delete: $('#customers_delete').prop("checked") ? true : false,
            },
           
        };

        let data = {
            id:id,
            name: name,
            description: description,
            is_active: is_active,
            code : name.toUpperCase(),
            assign_role :  main_obj,
        };

        $.ajax({
            url: '/roles-add/update?'+id, // route path
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
                        text: "Role Updated Sucessfully",
                        icon: "success",
                        button: true,
                    }).then((value) => {
                        if (value) {
                            window.location.href = '/roles-list';
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

