let page_number_dropdown;
let pages_left;
let page_number_input;
let total_records;
let total_units;
let offset;

function getAllCategoryList(limit, offset, search_data) {
    let searchTerm = search_data ? search_data : ""
    $.ajax({
        url: `/category-list/list-table?limit=${limit}&offset=${offset}&search=${searchTerm}`,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          if (data.status == 200) {
            if (data.data[0].rows.length >= 1) {
                let tr = '';
                $('#listing-table').css("display", "table");
                $("#listing-table > tbody").empty();

                $('#total_units').text(data.data[0].totalRecord[0].count);
                total_records = data.data[0].totalRecord[0].count;
                pages_left = Math.ceil((total_records / page_number_dropdown));
                $('#pages_left').text(pages_left);


                let data_rows = data.data[0].rows;
                $.each(data_rows, function (i, item) {
                    let index = offset + i +1;
                    item.is_active = item.is_active ? "Active" : "In-Active";
                    tr += `<tr>
                    <th><span class="co-name">${item.name}</span></th>
                    <td>${item.description}</td>
                    <td>${moment(item.created_at).format('lll')}</td>
                    <td>${item.user[0] ? item.user[0].name : 'NA' }</td>
                    <td>${item.is_active}</td>
                    <td>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary edit_category" data-id="${item._id}">Edit</button>
                            <button type="button" class="btn btn-primary view_category" data-id="${item._id}">View</button>
                            <button type="button" class="btn btn-primary delete_category" data-id="${item._id}">Delete</button>
                        </div>
                    </td>
                </tr>`;
                });
                $('#listing-table').append(tr);
                $('.table-responsive').responsiveTable('update');
            } else {
                $('#listing-table').css("display", "none");
            }
        }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};


$(document).ready(function () {
    page_number_dropdown = parseInt($('#page_number_dropdown').val());
    $('#page_number_input').val("1");
    page_number_input = parseInt($('#page_number_input').val());
    offset = 0;
    let limit = 10;
    let search_data = "";    
    getAllCategoryList(limit, offset, search_data);
});

//onclick extreme left
$('#extreme-left').on('click', function () {
    let intial_num = 1;
    page_number_input = parseInt($('#page_number_input').val(intial_num));
    page_number_input = parseInt($('#page_number_input').val());

    if (page_number_input <= pages_left) {
        offset = page_number_dropdown * (page_number_input - 1);
        let limit = page_number_dropdown;
        let search_data = $('#search_data').val();
        getAllCategoryList(limit, offset, search_data);
    }
});

//onclick extreme right
$('#extreme-right').on('click', function () {
    let last_num = pages_left;
    page_number_input = parseInt($('#page_number_input').val(last_num));
    page_number_input = parseInt($('#page_number_input').val());

    if (page_number_input <= pages_left) {
        offset = page_number_dropdown * (page_number_input - 1);
        let limit = page_number_dropdown;
        let search_data = $('#search_data').val();
        getAllCategoryList(limit, offset, search_data);
    }

});

//onclick one number increment
$('#one-right').on('click', function () {
    page_number_dropdown = parseInt($('#page_number_dropdown').val());
    page_number_input = parseInt($('#page_number_input').val());
    if (page_number_input < pages_left) {
        page_number_input = page_number_input + 1;
        $('#page_number_input').val(page_number_input)
        page_number_input = parseInt($('#page_number_input').val());

        if (page_number_input <= pages_left) {
            offset = page_number_dropdown * (page_number_input - 1);
            let limit = page_number_dropdown;
            let search_data = $('#search_data').val();
            getAllCategoryList(limit, offset, search_data);
        }
    }
});

//onclick one number decrement
$('#one-left').on('click', function () {
    //let one_decrement = '';
    page_number_dropdown = parseInt($('#page_number_dropdown').val());
    page_number_input = parseInt($('#page_number_input').val());
    if (page_number_input > 1) {
        page_number_input = page_number_input - 1;
        $('#page_number_input').val(page_number_input);
        page_number_input = parseInt($('#page_number_input').val());

        if (page_number_input <= pages_left) {
            offset = page_number_dropdown * (page_number_input - 1);
            let limit = page_number_dropdown;
            let search_data = $('#search_data').val();
            getAllCategoryList(limit, offset, search_data);
        }
    }
});

//On change of dropdown for rows 
$('#page_number_dropdown').change(function () {
    page_number_dropdown = parseInt($('#page_number_dropdown').val());
    $('#page_number_input').val("1");
    page_number_input = parseInt($('#page_number_input').val());
    pages_left = Math.ceil((total_records / page_number_dropdown));
    $('#pages_left').text(pages_left);
    offset = page_number_input - 1;
    let limit = page_number_dropdown;
    let search_data = $('#search_data').val();
    getAllCategoryList(limit, offset, search_data);
});

//Input for Page Number
$('#page_number_input').change(function () {
    page_number_dropdown = parseInt($('#page_number_dropdown').val());
    page_number_input = parseInt($('#page_number_input').val());
    if (page_number_input <= pages_left) {
        offset = page_number_dropdown * (page_number_input - 1);
        let limit = page_number_dropdown;
        let search_data = $('#search_data').val();
        getAllCategoryList(limit, offset, search_data);
    }
});

//Serch Data Input
$('#search_data').keyup(function () {
    page_number_dropdown = parseInt($('#page_number_dropdown').val());
    page_number_input = parseInt($('#page_number_input').val());
    if (page_number_input <= pages_left) {
        let search_data = $('#search_data').val();
        offset = page_number_dropdown * (page_number_input - 1);
        let limit = page_number_dropdown;
        getAllCategoryList(limit, offset, search_data);
    }
});

// on click of edit button
$(document).on('click', '.edit_category', function () {
    let id = $(this).attr('data-id');
    window.location.href = `/category-add?id=` + id;
});

// on click of view button
$(document).on('click', '.view_category', function () {
    let id = $(this).attr('data-id');
    window.location.href = `/category-add?id=` + id+'&view=true';
});


//Delete Category
$(document).on('click', '.delete_category', function (e) {
    e.preventDefault();
    let id = $(this).attr('data-id');
    let data = {
        id: id,
        is_active: false,
    };

    $.ajax({
        url: '/category-add/delete?'+id, // route path
        type: 'POST',
        data: JSON.stringify(data),
        headers: {
            'Content-Type': "application/json",
        },
        'success': function (data, textStatus, request) {

            if (data.status == 200) {                    
                swal.fire({
                    title: "Deleted",
                    text: "Category Deactivated Sucessfully",
                    icon: "success",
                    button: true,
                }).then((value) => {
                    if (value) {
                        window.location.href = '/category-list';
                    }
                });
            } else {
                swal.fire({
                    title: "Delete",
                    text: data.message,
                    icon: "error",
                    button: true,
                }).then((value) => {
                    if (value) {
                        window.location.href = '/category-list';
                    }
                });
            }

        },
        'error': function (err) {
            console.log('ERROR', JSON.stringify(err));
        }

    });
       
});
