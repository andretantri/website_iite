<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
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

// Comprehensive list of target candidates for cPanel / VPS hosting structures
$baseDir = __DIR__;
$parentDir = dirname(__DIR__);
$rootDir = dirname($parentDir);

$candidates = [
    ['dir' => $parentDir . '/uploads', 'prefix' => '/uploads/'],
    ['dir' => $baseDir . '/uploads', 'prefix' => '/api/uploads/'],
    ['dir' => $rootDir . '/public/uploads', 'prefix' => '/uploads/'],
    ['dir' => $rootDir . '/dist/uploads', 'prefix' => '/uploads/'],
    ['dir' => $rootDir . '/public/api/uploads', 'prefix' => '/api/uploads/'],
    ['dir' => $rootDir . '/dist/api/uploads', 'prefix' => '/api/uploads/'],
    ['dir' => $rootDir . '/uploads', 'prefix' => '/uploads/']
];

$uploadsDir = null;
$webPathPrefix = '/uploads/';
$attemptedDirs = [];

foreach ($candidates as $cand) {
    $dir = $cand['dir'];
    $attemptedDirs[] = $dir;
    
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
        'error' => 'Gagal membuat/menulisi folder uploads di server.',
        'attempted_directories' => $attemptedDirs,
        'help' => 'Jalankan `chmod 777 public/uploads public/api/uploads dist/uploads` di terminal server.'
    ]);
    exit;
}

// Generate unique clean name
$fileName = preg_replace('/[^a-zA-Z0-9.-]/', '_', basename($file['name']));
$cleanName = time() . '_' . $fileName;
$targetPath = $uploadsDir . '/' . $cleanName;

if (@move_uploaded_file($file['tmp_name'], $targetPath)) {
    @chmod($targetPath, 0644);
    
    $fileUrl = $webPathPrefix . $cleanName;
    $recordedInDb = false;
    $dbMessage = null;

    if (isset($conn) && $conn) {
        try {
            $conn->query("CREATE TABLE IF NOT EXISTS media_uploads (
                id INT AUTO_INCREMENT PRIMARY KEY,
                original_name VARCHAR(255) NOT NULL,
                file_name VARCHAR(255) NOT NULL,
                file_path VARCHAR(255) NOT NULL,
                file_size INT NOT NULL,
                mime_type VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )");

            $origName = basename($file['name']);
            $fileSize = (int)($file['size'] ?? filesize($targetPath));
            $mimeType = $file['type'] ?? 'application/octet-stream';

            $stmt = $conn->prepare("INSERT INTO media_uploads (original_name, file_name, file_path, file_size, mime_type) VALUES (?, ?, ?, ?, ?)");
            if ($stmt) {
                $stmt->bind_param("sssis", $origName, $cleanName, $fileUrl, $fileSize, $mimeType);
                $stmt->execute();
                $recordedInDb = true;
                $dbMessage = 'Recorded to MySQL table media_uploads';
            }
        } catch (Exception $ex) {
            $dbMessage = 'MySQL record warning: ' . $ex->getMessage();
        }
    } else {
        $dbMessage = 'MySQL not connected; file saved only to server disk';
    }

    header('Content-Type: application/json');
    echo json_encode([
        'success' => true,
        'url' => $fileUrl,
        'original_name' => basename($file['name']),
        'file_name' => $cleanName,
        'recorded_in_db' => $recordedInDb,
        'storage' => $recordedInDb ? 'mysql_and_disk' : 'disk_only',
        'message' => 'Image uploaded successfully!',
        'db_info' => $dbMessage
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
