<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$status = get_db_status();
echo json_encode($status, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
