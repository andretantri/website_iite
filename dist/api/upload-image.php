<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Only POST requests are allowed.']);
    exit;
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'No image file found in the request.']);
    exit;
}

$file = $_FILES['image'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'error' => 'Upload error code: ' . $file['error']]);
    exit;
}

// Create uploads directory if not exists (moves up one directory from 'api' to root dist/public folder)
$uploadsDir = dirname(__DIR__) . '/uploads';
if (!file_exists($uploadsDir)) {
    @mkdir($uploadsDir, 0755, true);
}

// Generate unique clean name
$fileName = preg_replace('/[^a-zA-Z0-9.-]/', '_', basename($file['name']));
$cleanName = time() . '_' . $fileName;
$targetPath = $uploadsDir . '/' . $cleanName;

if (@move_uploaded_file($file['tmp_name'], $targetPath)) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'url' => '/uploads/' . $cleanName,
        'message' => 'Image uploaded successfully!'
    ]);
} else {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false, 
        'error' => 'Failed to move uploaded file. Check folder write permissions on server.'
    ]);
}
