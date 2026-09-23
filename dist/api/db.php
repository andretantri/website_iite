<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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

// Function to get current database connection and storage status
function get_db_status() {
    global $conn, $db_error;
    $use_mysql = defined('USE_MYSQL') && USE_MYSQL;

    if ($conn && !$conn->connect_error) {
        return [
            'connected' => true,
            'storage' => 'mysql',
            'host' => DB_HOST,
            'database' => DB_NAME,
            'message' => 'Connected to MySQL database (' . DB_NAME . ')'
        ];
    }

    $reason = 'MySQL is disabled or DB_PASSWORD is not set in .env';
    if ($use_mysql && $db_error) {
        $reason = 'MySQL Connection Error: ' . $db_error;
    }

    return [
        'connected' => false,
        'storage' => 'json_file',
        'host' => DB_HOST,
        'database' => DB_NAME,
        'reason' => $reason,
        'message' => 'Running on JSON file storage fallback'
    ];
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
        if ($stmt) {
            $stmt->bind_param("ss", $jsonStr, $jsonStr);
            $exec = $stmt->execute();
            if ($exec) {
                return [
                    'success' => true,
                    'storage' => 'mysql',
                    'message' => 'Translations successfully saved to MySQL database!'
                ];
            }
        }
        return [
            'success' => $writtenAny,
            'storage' => 'json_file',
            'warning' => 'Failed to write to MySQL: ' . ($conn->error ?: 'query failed'),
            'message' => 'Saved to JSON file fallback (MySQL write failed).'
        ];
    }
    
    return [
        'success' => $writtenAny,
        'storage' => 'json_file',
        'message' => 'Saved to persistent JSON file (MySQL is not connected).'
    ];
}
