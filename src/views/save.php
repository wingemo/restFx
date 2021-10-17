<?php
$stringa=$_POST['data'];
$ourFileName = "swedbank.html";
if (file_exists($ourFileName)) {
  print 'lol';
}
$ourFileHandle = fopen($ourFileName, 'w') or die("can't open file");
fwrite($ourFileHandle,$stringa);
fclose($ourFileHandle);
