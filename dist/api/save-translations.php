<?php
ob_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_clean();
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Only POST requests are allowed.']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    $success = save_translations($data);
    ob_clean();
    header('Content-Type: application/json');
    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Translations saved successfully!']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to write translation changes to database.']);
    }
} else {
    ob_clean();
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Invalid or empty JSON payload.']);
}
