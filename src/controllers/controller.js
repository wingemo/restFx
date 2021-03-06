/*
   Property of Swedbank AB
   Philip Wingemo, Emil Oad
   Created: 2021-08-25
*/

/* Globala variabler */
var orderIDarray = []; // Array med varje order i

/*
- A page can't be manipulated safely until the document is "ready."
- This function will only run once the page (DOM) is ready for JavaScript.
*/
$(document).ready(function() {
   $( ".header" ).remove();
   for (let i = 0; i < 3; i++) {
      console.log(orderIDarray);
      $("#OrderID").val(Math.floor(Math.random() * 10001));
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      $("#Day").val(today);
      $("#Amount").val(Math.floor(Math.random() * 1001));
      $("#Currency").val("EUR");
      $("#orders").append(new_row());
      $("#" + $("#OrderID").val() + ".total").val($("#Amount").val());
      $("#" + $("#OrderID").val() + ".side").val("SELL");
   }
   $("#OrderID").val("");
   $("#Amount").val("");
   $("#Currency").val("");

    /*
   - Delete error messages from the page
   */
    $("#add").click(function() {
        var inArray = jQuery.inArray($("#OrderID").val(), orderIDarray);
        if (inArray == -1) {
            $("#orders").append(new_row());
            $("#" + $("#OrderID").val() + ".total").val($("#Amount").val());
            $("#" + $("#OrderID").val() + ".side").val("SELL");
        } else {
            $("body").prepend(error_message_id());
            $('.toast').toast('show');
        }
        let tmp = $("#OrderID").val();
        orderIDarray.push(tmp);
    });
   /*
   - Delete error messages from the page
   */
    $("body").on("click", "#hover", function(e) {
        $("#hover").remove();
    });
      /*
   - Delete error messages from the page
   */
    $("body").on("click", function(e) {
       var target = $(e.target );
        if($('#dragg').is(':checked')){
         if (target.is('#dragg')) {
         }else{
            $("#input").draggable({ grid: [ 20, 20 ] }).resizable({helper: "ui-resizable-helper"});
            $("#table1").draggable({ grid: [ 20, 20 ] }).resizable({helper: "ui-resizable-helper"});
            $("#table2").draggable({ grid: [ 20, 20 ] }).resizable({helper: "ui-resizable-helper"});
            if (confirm('Save?')) {
               var newData= document.documentElement.innerHTML;
               $.post("http://3.67.145.166/partner/sandbox/v1/fx/market-order/orders/src/views/save.php", { data: newData} )
                 .done(function( data ) {
                 });
            } else {
              // Do nothing!
            }
         }
        }
    });
    /*
   - Delete error messages from the page
   */
    $("body").on("click", function(e) {
      var target = $(e.target );
      if($('#flexSwitchCheckDefault').is(':checked')){
         if (target.is('#flexSwitchCheckDefault')) {
         }else{
             $(e.target).html(prompt("Text", ""));
            if (confirm('Save?')) {
               var newData= document.documentElement.innerHTML;
               $.post("http://3.67.145.166/partner/sandbox/v1/fx/market-order/orders/src/views/save.php", { data: newData} )
                 .done(function( data ) {
                 });
            } else {
              // Do nothing!
            }
         }
       }
   });
    /*
   - Delete error messages from the page
   */
    $("body").on("click", function(e) {
      var target = $(e.target );
      if($('#SwitchCheckDefault').is(':checked')){
         if (target.is('#SwitchCheckDefault')) {
         }else{
             $(e.target).html(prompt("Text", ""));
            if (confirm('Save?')) {
               var newData= document.documentElement.innerHTML;
               $.post("http://3.67.145.166/partner/sandbox/v1/fx/market-order/orders/src/views/savef.php", { data: newData} )
                 .done(function( data ) {
                 });
            } else {
              // Do nothing!
            }
         }
       }
   });
   /*
   - Changes the value of the amount to be executed
   - Retrieve the value from a dropdown
   */
    $("body").on("click", ".select_amount", function() {
        var price = parseFloat($("#" + this.id + ".price").html());
        var select = parseFloat($("#" + this.id + ".select_amount").val());
        var intAmount = price * select;
        $("#" + this.id + ".total").val(intAmount);
        if (isNaN(select)) {
            $("#" + this.id + ".total").val(price);
        }
    });
   /*
   - Displays more information about an order
   - Activated by the user clicking on the row in the table
   */
    $("body").on("click", ".header", function(e) {
      var target = $( e.target );
      if ( target.is( "button" ) ) {
      }else{
         $("[data-for=" + this.id + "]").toggle(0);
      }
    });
   /*
   - Changes the mouse pointer when the computer mouse is over a table
   */
    $("table").hover(function() {
        $(this).css('cursor', 'pointer');
    });
   /*
   - Sends an order to the model
   - Adds a new row to the table for approved orders
   - Displays a error message if the order did not pass through
   - Changes the button to red if the order went through
   */
    $("body").on("click", ".send", function() {
        if(!($("#button" + this.id).hasClass("btn-primary"))){
           let obj = $("#" + this.id).text();
           obj = obj.split(" ");
           let id = "#" + this.id;
           let date = $("#" + this.id + ".date").val();
           let sum = $("#" + this.id + ".total").val();
           let side = $("#" + this.id + ".side").val();
           let tenor = $("#" + this.id + ".tenor").val();
           obj = model(obj, sum, date, side, tenor);
           console.log(obj);
           if (obj.tppMessages) {
               $("body").prepend('<div id="hover"  aria-live="polite"  data-autohide="false"  aria-atomic="true" style="position: relative; min-height: px; z-index: 1000"> <div class="toast" data-autohide="false"  style="margin-right: 40px;position: absolute; top:750px; right: 0;"><div class="toast-header bg-danger" style="color: white"> <strong class="mr-auto">Error Message&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong> </div>  <div class="toast-body">' + obj.tppMessages[0].text + ' </div>  </div></div></div>');
               $('.toast').toast('show');
               $("#finish").append('<tr class="bg-danger" style=" color: white;"><td>NULL</td><td></td><td></td><td></td><td></td><td></td><td></td><td>' + obj.tppMessages[0].category + '</td></tr>');
           } else if (obj.fxOrder.message) {
               $("body").prepend('<div id="hover"  aria-live="polite"  data-autohide="false"  aria-atomic="true" style="position: relative; min-height: px; z-index: 1000"> <div class="toast" data-autohide="false"  style="margin-right: 40px;position: absolute; top:700px; right: 0;"><div class="toast-header bg-danger" style="color: white"> <strong class="mr-auto">Error Message&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong> </div>  <div class="toast-body">' + obj.fxOrder.message + ' </div>  </div></div></div>');
               $('.toast').toast('show');
               $("#finish").append('<tr class="bg-danger" style="color: white;"><td>' + obj.fxOrder.externalId + '</td><td></td><td></td><td></td><td></td><td></td><td><td>' + obj.orderStatus + '</td></tr>');
           } else {
               $(id + ".send").removeClass("btn-primary");
               $(id + ".send").addClass("btn-danger");
               $("#finish").append('<tr class="answerTable" style="background-color: #50C878; color: white;"><td>' + obj.fxOrder.externalId + '</td><td>' + obj.fxOrder.side + '</td><td>' + obj.fxOrder.amount + '</td><td>' + obj.fxOrder.counterAmount + '</td><td>' + obj.fxOrder.currencyPair + '</td><td>' + obj.fxOrder.executionRate + '</td><td>' + obj.fxOrder.settlementDate + '</td><td>' + obj.orderStatus + '</td></tr><tr  data-for="' + obj.fxOrder.externalId + '" class="answer" style="display:none"></tr>');
          }
        }
    });
});
