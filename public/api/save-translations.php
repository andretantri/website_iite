<?php
ob_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_clean();
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Only POST requests are allowed.']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    $result = save_translations($data);
    $isSuccess = is_array($result) ? !empty($result['success']) : !empty($result);
    $storage = is_array($result) ? ($result['storage'] ?? 'unknown') : 'file';
    $message = is_array($result) ? ($result['message'] ?? 'Translations saved successfully!') : 'Translations saved successfully!';
    $warning = is_array($result) ? ($result['warning'] ?? null) : null;

    ob_clean();
    header('Content-Type: application/json');
    if ($isSuccess) {
        $response = [
            'success' => true,
            'storage' => $storage,
            'message' => $message
        ];
        if ($warning) $response['warning'] = $warning;
        echo json_encode($response);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'storage' => $storage,
            'error' => 'Failed to write translation changes to database or file system.'
        ]);
    }
} else {
    ob_clean();
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Invalid or empty JSON payload.']);
}
