<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$ip = $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$today = date('Y-m-d');
$ipHash = hash('sha256', $ip . '_' . $today);

$tracked = false;
$storage = 'none';

if (isset($conn) && $conn) {
    try {
        $conn->query("CREATE TABLE IF NOT EXISTS visitor_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            visit_date DATE NOT NULL,
            ip_hash VARCHAR(64) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_daily_visit (visit_date, ip_hash)
        )");

        $stmt = $conn->prepare("INSERT IGNORE INTO visitor_logs (visit_date, ip_hash) VALUES (?, ?)");
        if ($stmt) {
            $stmt->bind_param("ss", $today, $ipHash);
            $stmt->execute();
            $tracked = true;
            $storage = 'mysql';
        }
    } catch (Exception $e) {
        // Fall back to JSON file on error
    }
}

// Fallback or mirror to JSON file
if (!$tracked) {
    $statsFile = __DIR__ . '/visitor-stats.json';
    $stats = [
        'todayDate' => $today,
        'todayCount' => 0,
        'yesterdayCount' => 0,
        'totalCount' => 0,
        'todayIps' => []
    ];

    if (file_exists($statsFile)) {
        $content = @file_get_contents($statsFile);
        $decoded = json_decode($content, true);
        if ($decoded && is_array($decoded)) {
            $stats = array_merge($stats, $decoded);
        }
    }

    if ($stats['todayDate'] !== $today) {
        $stats['yesterdayCount'] = $stats['todayCount'];
        $stats['todayCount'] = 0;
        $stats['todayDate'] = $today;
        $stats['todayIps'] = [];
    }

    if (!in_array($ipHash, $stats['todayIps'])) {
        $stats['todayIps'][] = $ipHash;
        $stats['todayCount']++;
        $stats['totalCount']++;
        @file_put_contents($statsFile, json_encode($stats, JSON_PRETTY_PRINT));
        $tracked = true;
    }
    $storage = 'json_file';
}

echo json_encode([
    'success' => true,
    'tracked' => $tracked,
    'storage' => $storage
]);
