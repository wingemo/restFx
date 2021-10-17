/*
- Adds a new order to a table on the page 
*/
function new_row() {
  return '<tr class="header tableopen" id="' + $("#OrderID").val() + '" ><td>' + $("#OrderID").val() + ' </td><td>' + $("#Day").val() + ' </td><td id="' + $("#OrderID").val() + '" class="price">' + $("#Amount").val() + ' </td><td>' + $("#Currency").val() + ' </td><td><button type="button" id="' + $("#OrderID").val() + '" style="width:100%;" class="send btn btn-primary  btn-block">Trade</button></td></tr>   <tr data-for="' + $("#OrderID").val() + '" style="background-color:#FBF2EA; border-width: 0;display:none; width: 100px"><td style="border: none;"></td>  <td style="border: none;">  <input type="text" placeholder="Currency Pair"  class="form-control pair" aria-label="Small" disabled aria-describedby="inputGroup-sizing-sm" value="' + $("#Currency").val() + 'SEK" ></td><td style="border: none;">  <input type="date" placeholder="Settlement Date" class="date form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="' + $("#Day").val() + '" id="' + $("#OrderID").val() + '"></td><td><select class="form-select tenor" id="' + $("#OrderID").val() + '"> <option selected value="Tenor">SP</option><option value="1M">1M</option><option value="2M">2M</option><option value="3M">3M</option><option value="4M">4M</option><option value="5M">5M</option><option value="6M">6M</option><option value="7M">7M</option><option value="8M">8M</option><option value="9M">9M</option></select></td><td style="border: none;">  <select id="' + $("#OrderID").val() + '"   class="form-select side"><option selected value="SELL">SELL</option><option value="BUY">BUY</option></select></td></tr><tr data-for="' + $("#OrderID").val() + '" style="background-color:#FBF2EA; border-width: 0;display:none; width: 100px"><td></td><td></td><td></td><td><select class="form-select select_amount" id="' + $("#OrderID").val() + '"> <option selected>100%</option> <option value="0.10">10%</option><option value="0.20">20%</option><option value="0.30">30%</option><option value="0.40">40%</option><option value="0.50">50%</option><option value="0.60">60%</option><option value="0.70">70%</option><option value="0.80">80%</option><option value="0.90">90%</option></select></td><td  style="border: none;"><div style="height: 70px; overflow:hidden;"><input id="' + $("#OrderID").val() + '" type="text"  class="form-control total" aria-label="Small" placeholder="Total trade amount" aria-describedby="inputGroup-sizing-sm"></div></td></tr>'
}

/*
- Adds a new order to a table on the page 
*/
function error_message_id() {
  return '<div id="hover"  aria-live="polite"  data-autohide="false"  aria-atomic="true" style="position: relative; min-height: px; z-index: 1000"> <div class="toast" data-autohide="false"  style="margin-right: 40px;position: absolute; top:750px; right: 0;"><div class="toast-header bg-danger" style="color: white"> <strong class="mr-auto">Error Message&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong> </div>  <div class="toast-body">OrderID must be unique</div>  </div></div></div>'
}

/*
- Adds a new order to a table on the page 
*/
function success_message() {
  return '<tr class="answerTable" style="background-color: #50C878; color: white;"><td>' + obj.fxOrder.externalId + '</td><td>' + obj.fxOrder.side + '</td><td>' + obj.fxOrder.amount + '</td><td>' + obj.fxOrder.counterAmount + '</td><td>' + obj.fxOrder.currencyPair + '</td><td>' + obj.fxOrder.executionRate + '</td><td>' + obj.fxOrder.settlementDate + '</td><td>' + obj.orderStatus + '</td></tr><tr  data-for="' + obj.fxOrder.externalId + '" class="answer" style="display:none"></tr>'
}
