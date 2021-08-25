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
   /*
   - Adds a new order to a table on the page 
   - Check if an order with the same ID already exists
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
   - Will change the date using tenor
   - Is not completed*
   */
    $("body").on("click", ".tenor", function(e) {
        let tenor = $("#" + this.id + ".tenor").val();
        let date = new Date($("#" + this.id + ".date").val());
        alert(date.toDateString() + tenor);
    });
   /*
   - Delete error messages from the page
   */
    $("body").on("click", "#hover", function(e) {
        $("#hover").remove();
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
        $("[data-for=" + this.id + "]").slideToggle("");
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
        let obj = $("#" + this.id).text();
        obj = obj.split(" ");
        let id = "#" + this.id;
        let date = $("#" + this.id + ".date").val();
        let sum = $("#" + this.id + ".total").val();
        let side = $("#" + this.id + ".side").val();
        obj = model(obj, sum, date, side);
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
            $("#finish").append(success_message());
        }
    });
});
