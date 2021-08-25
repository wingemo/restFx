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
            $("#orders").append('<tr class="header tableopen" id="' + $("#OrderID").val() + '" ><td>' + $("#OrderID").val() + ' </td><td>' + $("#Day").val() + ' </td><td id="' + $("#OrderID").val() + '" class="price">' + $("#Amount").val() + ' </td><td>' + $("#Currency").val() + ' </td><td><button type="button" id="' + $("#OrderID").val() + '" style="width:100%;" class="send btn btn-primary  btn-block">Trade</button></td></tr>   <tr data-for="' + $("#OrderID").val() + '" style="background-color:#FBF2EA; border-width: 0;display:none; width: 100px"><td style="border: none;"></td>  <td style="border: none;">  <input type="text" placeholder="Currency Pair"  class="form-control pair" aria-label="Small" disabled aria-describedby="inputGroup-sizing-sm" value="' + $("#Currency").val() + 'SEK" ></td><td style="border: none;">  <input type="text" placeholder="Settlement Date" class="date form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="' + $("#Day").val() + '" id="' + $("#OrderID").val() + '"></td><td style="border: none;">  <input id="' + $("#OrderID").val() + '"   placeholder="Side (BUY/SELL)" type="text" class="form-control side"  aria-label="Small" aria-describedby="inputGroup-sizing-sm" ></td><td  style="border: none;"><div style="height: 70px; overflow:hidden;"><input id="' + $("#OrderID").val() + '" type="text"  class="form-control total" aria-label="Small" placeholder="Total trade amount" aria-describedby="inputGroup-sizing-sm"></div></td></tr><tr data-for="' + $("#OrderID").val() + '" style="background-color:#FBF2EA; border-width: 0;display:none; width: 100px"><td></td><td></td><td></td><td><select class="form-select tenor" id="' + $("#OrderID").val() + '"> <option selected value="2">Tenor</option><option value="1">1M</option><option value="2">2M</option><option value="3">3M</option><option value="4">4M</option><option value="5">5M</option><option value="6">6M</option><option value="7">7M</option><option value="8">8M</option><option value="9">9M</option></select></td><td><select class="form-select select_amount" id="' + $("#OrderID").val() + '"> <option selected>Trade amount %</option> <option value="0.10">10%</option><option value="0.20">20%</option><option value="0.30">30%</option><option value="0.40">40%</option><option value="0.50">50%</option><option value="0.60">60%</option><option value="0.70">70%</option><option value="0.80">80%</option><option value="0.90">90%</option></select></td></tr>');
            $("#" + $("#OrderID").val() + ".total").val($("#Amount").val());
            $("#" + $("#OrderID").val() + ".side").val("SELL");
        } else {
            $("body").prepend('<div id="hover"  aria-live="polite"  data-autohide="false"  aria-atomic="true" style="position: relative; min-height: px; z-index: 1000"> <div class="toast" data-autohide="false"  style="margin-right: 40px;position: absolute; top:750px; right: 0;"><div class="toast-header bg-danger" style="color: white"> <strong class="mr-auto">Error Message&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong> </div>  <div class="toast-body">OrderID must be unique</div>  </div></div></div>');
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
   - Kollar vÃ¤rden frÃ¥n formulÃ¤r.
   - Initierar berÃ¤kningar och skriver ut resultat.
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
            $("#finish").append('<tr class="answerTable" style="background-color: #50C878; color: white;"><td>' + obj.fxOrder.externalId + '</td><td>' + obj.fxOrder.side + '</td><td>' + obj.fxOrder.amount + '</td><td>' + obj.fxOrder.counterAmount + '</td><td>' + obj.fxOrder.currencyPair + '</td><td>' + obj.fxOrder.executionRate + '</td><td>' + obj.fxOrder.settlementDate + '</td><td>' + obj.orderStatus + '</td></tr><tr  data-for="' + obj.fxOrder.externalId + '" class="answer" style="display:none"></tr>');
        }
    });
});
