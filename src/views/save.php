<?php
$stringa=$_POST['data'];
$ourFileName = "swedbank.html";
$ourFileHandle = fopen($ourFileName, 'w');
fwrite($ourFileHandle,$stringa);
fclose($ourFileHandle);
