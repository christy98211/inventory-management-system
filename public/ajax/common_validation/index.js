function validateByClassName(className) {
  return new Promise(function(resolve, reject) {
    var validate_flag = true;
    $(`.${className}`).map(function(index) {
      var tagName = this.tagName;
      var dataPlugin = $(this).attr("data-plugin");
      console.log(dataPlugin)
      if ($(this).prop("required") && $(this).is(":visible")) {
        if (this.value.trim().length < 1) {
          //remove first
          $("#validation_" + this.id).remove();
          validate_flag = false;
          if (tagName == "INPUT" || tagName == "TEXTAREA") {
            if (dataPlugin == "tokenfield") {
              $("#" + this.id).css("border", "1px solid #a94442"); 
              $(
                "<small id=validation_" +
                  this.id +
                  ' style="color: #a94442;">This field is required</small>'
              ).insertAfter($(this).parents("div.tokenfield"));
            } else if(dataPlugin == "datepicker"){

              $( "<small id=validation_" + this.id + ' style="color: #a94442;">This field is required</small>' ).insertAfter($(this).parents("div.input-group"));

            } else {
              
              $("#" + this.id).css("border", "1px solid #a94442");
              $(
                "<small id=validation_" +
                  this.id +
                  ' style="color: #a94442;">This field is required</small>'
              ).insertAfter("#" + this.id);
            }
          }

          if (tagName == "SELECT") {
            if (dataPlugin == "selectpicker") {
              $("#" + this.id).css("border", "1px solid #a94442");
              $( "<small id=validation_" + this.id + ' style="color: #a94442;">This field is required</small>' ).insertAfter($(this).parents("div.bootstrap-select"));
            } else {
              $("#" + this.id).css("border", "1px solid #a94442");
              $(
                "<small id=validation_" +
                  this.id +
                  ' style="color: #a94442;">This field is required</small>'
              ).insertAfter("#" + this.id);
            }
          }

          // .delay(3200).fadeOut(300);
        } else {
          $("#validation_" + this.id).remove();
          //replace validation red style tag with null & keep existing style if any
          if($("#" + this.id).attr('style')){
            var validate_red = $("#" + this.id).attr('style');
            var replacedRed = validate_red.replace("border: 1px solid rgb(169, 68, 66)", "");
            $("#" + this.id).attr('style',replacedRed);
          }
          // $("#" + this.id).css("border", "1px solid #ccc");
        }
      }
    });
    resolve(validate_flag);
  });
}

//Remove Required parameter start
$(document).on("change", "select", function() {
  if(this.id){
    $("#validation_" + this.id).remove();
    //replace validation red style tag with null & keep existing style if any
    if($("#" + this.id).attr('style')){
      var validate_red = $("#" + this.id).attr('style');
      var replacedRed = validate_red.replace("border: 1px solid rgb(169, 68, 66)", "");
      $("#" + this.id).attr('style',replacedRed);
    }
  }
    
});

//Remove Required
$(document).on("change", "input", function() {

  if(this.id){
    $("#validation_" + this.id).remove();
    //replace validation red style tag with null & keep existing style if any
    if($("#" + this.id).attr('style')){
      var validate_red = $("#" + this.id).attr('style');
      var replacedRed = validate_red.replace("border: 1px solid rgb(169, 68, 66)", "");
      $("#" + this.id).attr('style',replacedRed);
    }
  }
   
});

//only number validation
$(document).on("keyup", ".onlynumber", function() {
  //if the letter is not digit then display error and don't type anything
  if(this.value){
    
    if(isNaN(this.value)){
      this.value = "";
    }
    if(Math.sign(this.value) == -1){
      this.value = "";
    }
  }
});

//only number validation
$(document).on("change", ".onlynumber", function() {
  //if the letter is not digit then display error and don't type anything
  if(this.value){
    
    if(isNaN(this.value)){
      this.value = "";
    }
    if(Math.sign(this.value) == -1){
      this.value = "";
    }
  }
});

$(document).on("keyup", "input", function() {
  if(this.id){
    $("#validation_" + this.id).remove();
    //replace validation red style tag with null & keep existing style if any
    if($("#" + this.id).attr('style')){
      var validate_red = $("#" + this.id).attr('style');
      var replacedRed = validate_red.replace("border: 1px solid rgb(169, 68, 66)", "");
      $("#" + this.id).attr('style',replacedRed);
    }
  }
});

$(document).on("keyup", "textarea", function() {
    $("#validation_" + this.id).remove();
    //replace validation red style tag with null & keep existing style if any
    if($("#" + this.id).attr('style')){
      var validate_red = $("#" + this.id).attr('style');
      var replacedRed = validate_red.replace("border: 1px solid rgb(169, 68, 66)", "");
      $("#" + this.id).attr('style',replacedRed);
    }
});

//**Remove Required paramter ends */