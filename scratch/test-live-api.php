<?php
$url = 'https://hooricoo.com/wp-json/wc/v3/products';
$ck = 'ck_cf7820700ad30677feac6da7eca0b112fe8fb463';
$cs = 'cs_66e4835fecc9ec261d5d8b695e227fc58465ed89';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, $ck . ":" . $cs);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For local testing flexibility

$response = curl_exec($ch);
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Status Code: " . $status_code . "\n";
if ($status_code == 200) {
    echo "Connection to hooricoo.com Successful!\n";
    $data = json_decode($response, true);
    echo "Found " . count($data) . " products.\n";
} else {
    echo "Connection Failed. Status: " . $status_code . "\n";
    echo "Response Snippet: " . substr($response, 0, 200) . "\n";
}
