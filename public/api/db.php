<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/config.php';

$conn = null;
$db_error = null;

if (defined('USE_MYSQL') && USE_MYSQL) {
    // Suppress error warnings so we can handle connection gracefully
    $conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        $db_error = $conn->connect_error;
        $conn = null;
    }
}

// Function to fetch the translations JSON
function get_translations() {
    global $conn;
    
    $baseDir = __DIR__;
    $parentDir = dirname(__DIR__);
    $rootDir = dirname($parentDir);

    // Check persistent locations in order of priority
    $paths = [
        $baseDir . '/translations-data.json',
        $parentDir . '/api/translations-data.json',
        $parentDir . '/translations-data.json',
        $rootDir . '/public/api/translations-data.json',
        $rootDir . '/dist/api/translations-data.json',
        $rootDir . '/src/translations-data.json',
        '/tmp/iite_translations.json'
    ];
    
    if ($conn) {
        $conn->query("CREATE TABLE IF NOT EXISTS translations (id INT PRIMARY KEY, json_data LONGTEXT)");
        
        $result = $conn->query("SELECT json_data FROM translations WHERE id = 1");
        if ($result && $row = $result->fetch_assoc()) {
            $parsed = json_decode($row['json_data'], true);
            if ($parsed) return $parsed;
        }
        
        // If MySQL is empty, seed it with the available json file
        foreach ($paths as $filePath) {
            if (file_exists($filePath)) {
                $initialData = @file_get_contents($filePath);
                if ($initialData) {
                    $stmt = $conn->prepare("INSERT INTO translations (id, json_data) VALUES (1, ?) ON DUPLICATE KEY UPDATE json_data = ?");
                    $stmt->bind_param("ss", $initialData, $initialData);
                    $stmt->execute();
                    return json_decode($initialData, true);
                }
            }
        }
    }
    
    // Fallback: Read from the first existing persistent JSON file
    foreach ($paths as $filePath) {
        if (file_exists($filePath)) {
            $content = @file_get_contents($filePath);
            if ($content) {
                $parsed = json_decode($content, true);
                if ($parsed) return $parsed;
            }
        }
    }
    
    return null;
}

// Function to save the translations JSON
function save_translations($data) {
    global $conn;
    $jsonStr = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    
    $baseDir = __DIR__;
    $parentDir = dirname(__DIR__);
    $rootDir = dirname($parentDir);

    $paths = [
        $baseDir . '/translations-data.json',
        $parentDir . '/api/translations-data.json',
        $parentDir . '/translations-data.json',
        $rootDir . '/public/api/translations-data.json',
        $rootDir . '/dist/api/translations-data.json',
        $rootDir . '/src/translations-data.json',
        '/tmp/iite_translations.json'
    ];
    
    $writtenAny = false;
    foreach ($paths as $filePath) {
        $dir = dirname($filePath);
        if (!file_exists($dir)) {
            @mkdir($dir, 0777, true);
        }
        if (@file_put_contents($filePath, $jsonStr) !== false) {
            $writtenAny = true;
        }
    }
    
    if ($conn) {
        $conn->query("CREATE TABLE IF NOT EXISTS translations (id INT PRIMARY KEY, json_data LONGTEXT)");
        $stmt = $conn->prepare("INSERT INTO translations (id, json_data) VALUES (1, ?) ON DUPLICATE KEY UPDATE json_data = ?");
        $stmt->bind_param("ss", $jsonStr, $jsonStr);
        return $stmt->execute();
    }
    
    return $writtenAny;
}
