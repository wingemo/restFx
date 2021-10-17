<?php
$stringa=$_POST['data'];
$ourFileName = "/htdocs/partner/sandbox/v1/fx/market-order/orders/src/views/swedbank.html";
$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
fwrite($ourFileHandle,$stringa);
fclose($ourFileHandle);

