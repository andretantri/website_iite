<?php
require_once __DIR__ . '/db.php';

$data = get_translations();

if ($data) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false, 
        'error' => 'Database/File empty or not found on server.'
    ]);
}
