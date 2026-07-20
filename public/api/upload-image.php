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

// Target candidate locations for uploads
$candidates = [
    ['dir' => dirname(__DIR__) . '/uploads', 'prefix' => '/uploads/'],
    ['dir' => __DIR__ . '/uploads', 'prefix' => '/api/uploads/'],
];

$uploadsDir = null;
$webPathPrefix = '/uploads/';

foreach ($candidates as $cand) {
    $dir = $cand['dir'];
    if (!file_exists($dir)) {
        @mkdir($dir, 0777, true);
    }
    if (file_exists($dir)) {
        @chmod($dir, 0777);
        if (is_writable($dir)) {
            $uploadsDir = $dir;
            $webPathPrefix = $cand['prefix'];
            break;
        }
    }
}

if (!$uploadsDir) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'Server hosting menolak pembuatan file di folder uploads. Silakan buka cPanel File Manager -> klik kanan folder public/uploads -> Change Permissions ke 777.'
    ]);
    exit;
}

// Generate unique clean name
$fileName = preg_replace('/[^a-zA-Z0-9.-]/', '_', basename($file['name']));
$cleanName = time() . '_' . $fileName;
$targetPath = $uploadsDir . '/' . $cleanName;

if (@move_uploaded_file($file['tmp_name'], $targetPath)) {
    @chmod($targetPath, 0644);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'url' => $webPathPrefix . $cleanName,
        'message' => 'Image uploaded successfully!'
    ]);
} else {
    $err = error_get_last();
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false, 
        'error' => 'Gagal memindahkan file ke ' . $uploadsDir . '. Detail error PHP: ' . ($err['message'] ?? 'Buka chmod 777 pada folder uploads di hosting.')
    ]);
}
