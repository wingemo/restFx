function new_row() {
  return '<tr class="header tableopen" id="' + $("#OrderID").val() + '" ><td>' + $("#OrderID").val() + ' </td><td>' + $("#Day").val() + ' </td><td id="' + $("#OrderID").val() + '" class="price">' + $("#Amount").val() + ' </td><td>' + $("#Currency").val() + ' </td><td><button type="button" id="' + $("#OrderID").val() + '" style="width:100%;" class="send btn btn-primary  btn-block">Trade</button></td></tr>   <tr data-for="' + $("#OrderID").val() + '" style="background-color:#FBF2EA; border-width: 0;display:none; width: 100px"><td style="border: none;"></td>  <td style="border: none;">  <input type="text" placeholder="Currency Pair"  class="form-control pair" aria-label="Small" disabled aria-describedby="inputGroup-sizing-sm" value="' + $("#Currency").val() + 'SEK" ></td><td style="border: none;">  <input type="text" placeholder="Settlement Date" class="date form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="' + $("#Day").val() + '" id="' + $("#OrderID").val() + '"></td><td style="border: none;">  <input id="' + $("#OrderID").val() + '"   placeholder="Side (BUY/SELL)" type="text" class="form-control side"  aria-label="Small" aria-describedby="inputGroup-sizing-sm" ></td><td  style="border: none;"><div style="height: 70px; overflow:hidden;"><input id="' + $("#OrderID").val() + '" type="text"  class="form-control total" aria-label="Small" placeholder="Total trade amount" aria-describedby="inputGroup-sizing-sm"></div></td></tr><tr data-for="' + $("#OrderID").val() + '" style="background-color:#FBF2EA; border-width: 0;display:none; width: 100px"><td></td><td></td><td></td><td><select class="form-select tenor" id="' + $("#OrderID").val() + '"> <option selected value="2">Tenor</option><option value="1">1M</option><option value="2">2M</option><option value="3">3M</option><option value="4">4M</option><option value="5">5M</option><option value="6">6M</option><option value="7">7M</option><option value="8">8M</option><option value="9">9M</option></select></td><td><select class="form-select select_amount" id="' + $("#OrderID").val() + '"> <option selected>Trade amount %</option> <option value="0.10">10%</option><option value="0.20">20%</option><option value="0.30">30%</option><option value="0.40">40%</option><option value="0.50">50%</option><option value="0.60">60%</option><option value="0.70">70%</option><option value="0.80">80%</option><option value="0.90">90%</option></select></td></tr>'
}






















