
/**
* Theme: Moltran - Responsive Bootstrap 4 Admin Dashboard
* Author: Coderthemes
* Form Validator
*/

!function($) {
    "use strict";

    var FormValidator = function() {
        this.$userForm = $("#userForm");
    };

    //init
    FormValidator.prototype.init = function() {
        //validator plugin

        // validate signup form on keyup and submit
        this.$userForm.validate({
            rules: {
                name: "required",
                aboutme: "optional"
            },
            messages: {
                name: "Please enter your firstname"
            }
        });


    },
    //init
    $.FormValidator = new FormValidator, $.FormValidator.Constructor = FormValidator
}(window.jQuery),


//initializing
function($) {
    "use strict";
    $.FormValidator.init()
}(window.jQuery);
