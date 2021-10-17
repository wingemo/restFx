<?php
$stringa=$_POST['data'];
$ourFileName = "fortnox.html";
$ourFileHandle = fopen($ourFileName, 'w+') or die("Unable to open file!");
fwrite($ourFileHandle,$stringa);
fclose($ourFileHandle);
