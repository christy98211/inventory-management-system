// Custom Thumbnails height & width validations start
// $(document).on("change","#custom_thumbnail_16_9",function(){
$(document).on("change",".custom_thumbnail_16_9",function(){
    var _this_id = this.id;
    var drEvent = $('#'+_this_id).dropify();
    drEvent = drEvent.data('dropify');
    var fi = document.getElementById(_this_id);
    
    if (fi.files.length > 0) { 
        var validate_flag = true;
        for (var i = 0; i < fi.files.length; i++) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.

            reader.onload = function (e) {
                var img = new Image();      
                img.src = e.target.result;

                img.onload = function () {
                    var width = this.width;
                    var height = this.height;
                    
                    //1600X900
                    validate_flag = (validate_flag == true && (width*height == 1440000) ? true: false);
                    if(validate_flag == false){
                        swal({
                            title: "Error",
                            text: "Image resolution should be 1600X900",//"Image resolution should be atleast of 1920X1080 or 600X450",
                            icon: "error",
                            button: true,
                        })
                        drEvent.resetPreview();
                        drEvent.clearElement();
                        return false;
                    }
                }
            };
            reader.readAsDataURL(fi.files.item(i))
        }; 
    }
});

// $(document).on("change","#custom_thumbnail_16_7",function(){
$(document).on("change",".custom_thumbnail_16_7",function(){
    var _this_id = this.id;
    var drEvent = $('#'+_this_id).dropify();
    drEvent = drEvent.data('dropify');
    var fi = document.getElementById(_this_id);
    
    if (fi.files.length > 0) { 
        var validate_flag = true;
        for (var i = 0; i < fi.files.length; i++) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.

            reader.onload = function (e) {
                var img = new Image();      
                img.src = e.target.result;

                img.onload = function () {
                    var width = this.width;
                    var height = this.height;
                    
                    //1600X900
                    validate_flag = (validate_flag == true && (width*height == 1120000) ? true: false);
                    if(validate_flag == false){
                        swal({
                            title: "Error",
                            text: "Image resolution should be 1600 X 700",//"Image resolution should be atleast of 1920X1080 or 600X450",
                            icon: "error",
                            button: true,
                        })
                        drEvent.resetPreview();
                        drEvent.clearElement();
                        return false;
                    }
                }
            };
            reader.readAsDataURL(fi.files.item(i))
        }; 
    }
});

// $("#thumbnail_8_8").on('change', function () {
$(document).on("change",".custom_thumbnail_8_8, .thumbnail_8_8",function(){

    var validate_flag = true;
    var _this_id = this.id;
    var drEvent = $('#' + _this_id).dropify();
    drEvent = drEvent.data('dropify');
    var fi = document.getElementById(_this_id);
    if (fi.files.length > 0) {
        image_update_flag = true;
        for (var i = 0; i < fi.files.length; i++) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.
            reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    var width = this.width;
                    var height = this.height;

                    //1920X1080 2) 2560X1440
                    validate_flag = (validate_flag == true && (width == 800 && height == 800) ? true : false);
                    if (validate_flag == false) {
                        swal({
                            title: "Error",
                            text: "Dimension must be of 800 x 800",  //800 x 480 OLD
                            icon: "error",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                drEvent.resetPreview();
                                drEvent.clearElement();
                            }
                        })
                        return false;
                    }
                }
            };
            reader.readAsDataURL(fi.files.item(i))
        };
    }
});


$(document).on("change",".custom_thumbnail_8_6, .thumbnail_8_6",function(){

    var validate_flag = true;
    var _this_id = this.id;
    var drEvent = $('#' + _this_id).dropify();
    drEvent = drEvent.data('dropify');
    var fi = document.getElementById(_this_id);
    if (fi.files.length > 0) {
        image_update_flag = true;
        for (var i = 0; i < fi.files.length; i++) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.
            reader.onload = function (e) {
                var img = new Image();
                img.src = e.target.result;

                img.onload = function () {
                    var width = this.width;
                    var height = this.height;
                    //1920X1080 2) 2560X1440
                    validate_flag = (validate_flag == true && (width == 800 && height == 600) ? true : false);
                    if (validate_flag == false) {
                        swal({
                            title: "Error",
                            text: "Dimension must be of 800 x 600",  //800 x 680 OLD
                            icon: "error",
                            button: true,
                        }).then((value) => {
                            if (value) {
                                drEvent.resetPreview();
                                drEvent.clearElement();
                            }
                        })
                        return false;
                    }
                }
            };
            reader.readAsDataURL(fi.files.item(i))
        };
    }
});

// $(document).on("change","#custom_thumbnail_4_3",function(){
$(document).on("change",".custom_thumbnail_4_3, .thumbnail_4_3",function(){
    var _this_id = this.id;
    var drEvent = $('#'+_this_id).dropify();
    drEvent = drEvent.data('dropify');
    var fi = document.getElementById(_this_id);
    
    if (fi.files.length > 0) { 
        var validate_flag = true;
        for (var i = 0; i < fi.files.length; i++) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.

            reader.onload = function (e) {
                var img = new Image();      
                img.src = e.target.result;

                img.onload = function () {
                    var width = this.width;
                    var height = this.height;
                    
                    //400X300 
                    validate_flag = (validate_flag == true && (width*height == 120000) ? true: false);
                    if(validate_flag == false){
                        swal({
                            title: "Error",
                            text: "Image resolution should be 400X300",//"Image resolution should be atleast of 400X300 or 600X450",
                            icon: "error",
                            button: true,
                        })
                        drEvent.resetPreview();
                        drEvent.clearElement();
                        return false;
                    }
                }
            };
            reader.readAsDataURL(fi.files.item(i))
        };
    }
});

// $(document).on("change","#custom_thumbnail_4_5",function(){
$(document).on("change",".custom_thumbnail_4_5, .thumbnails_4_5, .thumbnail_4_5",function(){
    var _this_id = this.id;
    var drEvent = $('#'+_this_id).dropify();
    drEvent = drEvent.data('dropify');
    var fi = document.getElementById(_this_id);
    
    if (fi.files.length > 0) { 
        var validate_flag = true;
        for (var i = 0; i < fi.files.length; i++) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.

            reader.onload = function (e) {
                var img = new Image();      
                img.src = e.target.result;

                img.onload = function () {
                    var width = this.width;
                    var height = this.height;
                    
                    //400X500 2) 600X750
                    validate_flag = (validate_flag == true && (width*height == 200000) ? true: false);
                    if(validate_flag == false){
                        swal({
                            title: "Error",
                            text: "Image resolution should be 400X500",//"Image resolution should be atleast of 400X500 or 600X750",
                            icon: "error",
                            button: true,
                        })
                        drEvent.resetPreview();
                        drEvent.clearElement();
                        return false;
                    }
                }
            };
            reader.readAsDataURL(fi.files.item(i))
        };
        
    }
});
// Custom Thumbnails height & width validations end

// VALIDATE THUMBNAILS BY CLASSNAME
$(document).on("change",".validate_thumbnail_res",function(){
    
    var resolution = "";
    var resolution_size = $(this).attr('resolution_size');
    switch (resolution_size){
        case "400X500":
        resolution = 200000;
        break;

        case "400X300":
        resolution = 120000;
        break;

        case "1600X900":
        resolution = 1440000;
        break;

        case "1600X700":
        resolution = 1120000;
        break;
    }
    var _this_id = this.id;
    var drEvent = $('#'+_this_id).dropify();
    drEvent = drEvent.data('dropify');
    var fi = document.getElementById(_this_id);
    
    if (fi.files.length > 0) { 
        var validate_flag = true;
        for (var i = 0; i < fi.files.length; i++) {
            var reader = new FileReader(); // CREATE AN NEW INSTANCE.

            reader.onload = function (e) {
                var img = new Image();      
                img.src = e.target.result;

                img.onload = function () {
                    var width = this.width;
                    var height = this.height;
                    
                    //400X500 2) 600X750
                    validate_flag = (validate_flag == true && (width*height == resolution) ? true: false);
                    if(validate_flag == false){
                        swal({
                            title: "Error",
                            text: "Image resolution should be "+resolution_size,//"Image resolution should be atleast of 400X500 or 600X750",
                            icon: "error",
                            button: true,
                        })
                        drEvent.resetPreview();
                        drEvent.clearElement();
                        return false;
                    }
                }
            };
            reader.readAsDataURL(fi.files.item(i))
        };
        
    }
});