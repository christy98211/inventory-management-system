
 /* Description: - When clicked on signIn button Check for Authentication*/
$('#sign_in').on('click', function(e) {
    e.preventDefault()
    var username = $('#username').val();
    var password = $('#userpassword').val();
    if(password && username){
        var dataString = {
            username: username,
            password: password
        }
        $.ajax({
            url: '/authenticate_user',
            type: 'POST',
            data: JSON.stringify(dataString),
            headers: {
                'Content-Type': "application/json",
            },
            success: function (data) {
                console.log("success")
                console.log(data)
                if(data.status == 200) {
                    console.log("inside")
                    window.location.href = '/dashboard';
                }
                else {  
                    alert('Invalid Credentials !');
                }
            }, 
            error: (error) => {
                console.log(error)
            },
        });
    }else{
        alert('Please fill all fields');
    }
   
})
