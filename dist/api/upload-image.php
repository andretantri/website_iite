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

// Target locations for uploads
$primaryUploadsDir = dirname(__DIR__) . '/uploads';
$fallbackUploadsDir = __DIR__ . '/uploads';

$uploadsDir = null;
$webPathPrefix = '/uploads/';

if (!file_exists($primaryUploadsDir)) {
    if (@mkdir($primaryUploadsDir, 0777, true)) {
        $uploadsDir = $primaryUploadsDir;
    }
} else if (is_writable($primaryUploadsDir)) {
    $uploadsDir = $primaryUploadsDir;
}

if (!$uploadsDir) {
    if (!file_exists($fallbackUploadsDir)) {
        @mkdir($fallbackUploadsDir, 0777, true);
    }
    if (file_exists($fallbackUploadsDir) && is_writable($fallbackUploadsDir)) {
        $uploadsDir = $fallbackUploadsDir;
        $webPathPrefix = '/api/uploads/';
    }
}

if (!$uploadsDir || !is_writable($uploadsDir)) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'Folder uploads gagal dibuat / ditulisi. Mohon berikan izin chmod 777 atau 755 pada folder public / dist di server hosting Anda.'
    ]);
    exit;
}

// Generate unique clean name
$fileName = preg_replace('/[^a-zA-Z0-9.-]/', '_', basename($file['name']));
$cleanName = time() . '_' . $fileName;
$targetPath = $uploadsDir . '/' . $cleanName;

if (@move_uploaded_file($file['tmp_name'], $targetPath)) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'url' => $webPathPrefix . $cleanName,
        'message' => 'Image uploaded successfully!'
    ]);
} else {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false, 
        'error' => 'Gagal memindahkan file ke ' . $uploadsDir . '. Mohon periksa izin penulisan (write permission) folder di hosting.'
    ]);
}
