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
    $filePath = __DIR__ . '/translations-data.json';
    
    if ($conn) {
        // Automatically create the translations table if it doesn't exist
        $conn->query("CREATE TABLE IF NOT EXISTS translations (id INT PRIMARY KEY, json_data LONGTEXT)");
        
        $result = $conn->query("SELECT json_data FROM translations WHERE id = 1");
        if ($result && $row = $result->fetch_assoc()) {
            return json_decode($row['json_data'], true);
        }
        
        // If MySQL is empty, seed it with the local json file
        if (file_exists($filePath)) {
            $initialData = file_get_contents($filePath);
            $stmt = $conn->prepare("INSERT INTO translations (id, json_data) VALUES (1, ?) ON DUPLICATE KEY UPDATE json_data = ?");
            $stmt->bind_param("ss", $initialData, $initialData);
            $stmt->execute();
            return json_decode($initialData, true);
        }
    }
    
    // Fallback: Read from the local JSON file on the server
    if (file_exists($filePath)) {
        return json_decode(file_get_contents($filePath), true);
    }
    
    return null;
}

// Function to save the translations JSON
function save_translations($data) {
    global $conn;
    $jsonStr = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    $filePath = __DIR__ . '/translations-data.json';
    
    // Always backup by writing to the file
    @file_put_contents($filePath, $jsonStr);
    
    if ($conn) {
        $conn->query("CREATE TABLE IF NOT EXISTS translations (id INT PRIMARY KEY, json_data LONGTEXT)");
        $stmt = $conn->prepare("INSERT INTO translations (id, json_data) VALUES (1, ?) ON DUPLICATE KEY UPDATE json_data = ?");
        $stmt->bind_param("ss", $jsonStr, $jsonStr);
        return $stmt->execute();
    }
    
    return true;
}
