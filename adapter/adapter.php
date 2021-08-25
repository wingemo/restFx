<?php

$data = array(
    "amount" => (int)$_POST['amount'],
    "amountCurrency" => $_POST['amountCurrency'],
    "currencyPair" => $_POST['currencyPair'],
    "externalId" => $_POST['externalId'],
    "meansOfPayment" => $_POST['meansOfPayment'],
    "settlementDate" => $_POST['settlementDate'],
    "side" => $_POST['side'],
    "timeout" => 1000,
);

$postdata = json_encode($data);
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://psd2.api.swedbank.com/partner/sandbox/v1/fx/market-order/orders?app-id=l77541fe6427284935b875fca91eb87cdd",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => $postdata,
    CURLOPT_HTTPHEADER => array(
        "accept: */*",
        "X-Request-ID: xxxx",
        "Content-Type: application/json;charset=utf-8"
    ) ,
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;
