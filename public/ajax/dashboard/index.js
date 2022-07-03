function getCountItems() {
    $.ajax({
        url: `/items-list/find-count`,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          if (data.status == 200) {
              console.log(data.data)
              $("#items").text(data.data)
         }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

function getCountSales() {
    $.ajax({
        url: `/sales-list/find-count`,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          if (data.status == 200) {
              console.log(data.data)
              $("#sales").text(data.data)
         }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

function getCountStocks() {
    $.ajax({
        url: `/items-list/find-all-items`,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          if (data.status == 200) {
              console.log(data.data)
              let stocks = 0;
              for(let i = 0; i < data.data.length; i++){
                  let price = parseInt(data.data[i].rate);
                  let quantity = data.data[i].quantity;
                  let amount = price*quantity
                 stocks+=amount 
              }
              $("#stocks").text(stocks)

         }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};


function getAllItemsWithLowQunatity() {
    $.ajax({
        url: `/items-list/find-all-items-less-than-twenty`,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          if (data.status == 200) {
              console.log(data.data)
              let tr = '';
              let data_rows = data.data;
              $.each(data_rows, function (i, item) {
                  tr += `<tr>
                  <th><span class="co-name">${item.product_id}</span></th>
                  <td>${item.product_name}</td>
                  <td>${item.product_category ? item.product_category.name : 'NA' }</td>
                  <td>${item.quantity}</td> 
              </tr>`;
              });
              $('#listing-table').append(tr);

         }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};


function getCountCustomers() {
    $.ajax({
        url: `/customers-list/find-count`,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (data) {
          if (data.status == 200) {
              console.log(data.data)
              $("#customers").text(data.data)
         }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
            console.log('ERROR: ' + jqXHR.status + textStatus);
        },
    });
};

$(document).ready(function () {
  getCountItems()
  getCountSales()
  getCountCustomers()
  getCountStocks()
  getAllItemsWithLowQunatity()

});
