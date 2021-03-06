/**
 * Theme: Moltran - Responsive Bootstrap 4 Admin Dashboard
 * Author: Coderthemes
 * SweetAlert -
 * Usage: $.SweetAlert.methodname
 */

! function($) {
  "use strict";

  var SweetAlert = function() {};

  //examples
  SweetAlert.prototype.init = function() {



      //Parameter
      $('#sa-params').click(function() {
        var id = $(this).attr("data-id")
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              // swal("This user has been deleted!", {
              //   icon: "success",
              // });
              $.ajax({
                type: "DELETE",
                url: "/users/" + id,
                success: function(result) {
                  window.location.replace("/users");
                }
              });

            } else {
              swal("This user will not be deleted!");
            }
          });
      });

      $('#satags-params').click(function() {
        var id = $(this).attr("data-id")
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this tag!",
            icon: "warning",
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              // swal("This user has been deleted!", {
              //   icon: "success",
              // });
              $.ajax({
                type: "DELETE",
                url: "/tags/" + id,
                success: function(result) {
                  window.location.replace("/tags");
                }
              });

            } else {
              swal("This tag will not be deleted!");
            }
          });
      });

      $('#sachallenge-params').click(function() {
        var id = $(this).attr("data-id")
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this challenge!",
            icon: "warning",
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

              // swal("This user has been deleted!", {
              //   icon: "success",
              // });
              $.ajax({
                type: "DELETE",
                url: "/challenges/" + id,
                success: function(result) {
                  window.location.replace("/challenges");
                }
              });

            } else {
              swal("This challenge will not be deleted!");
            }
          });
      });


    },
    //init
    $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing
function($) {
  "use strict";
  $.SweetAlert.init()
}(window.jQuery);
