<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, OPTIONS');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$todayCount = 0;
$yesterdayCount = 0;
$totalCount = 0;
$storage = 'json_file';

if (isset($conn) && $conn) {
    try {
        $conn->query("CREATE TABLE IF NOT EXISTS visitor_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            visit_date DATE NOT NULL,
            ip_hash VARCHAR(64) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_daily_visit (visit_date, ip_hash)
        )");

        $resToday = $conn->query("SELECT COUNT(*) as cnt FROM visitor_logs WHERE visit_date = CURDATE()");
        if ($resToday && $row = $resToday->fetch_assoc()) {
            $todayCount = (int)$row['cnt'];
        }

        $resYest = $conn->query("SELECT COUNT(*) as cnt FROM visitor_logs WHERE visit_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY)");
        if ($resYest && $row = $resYest->fetch_assoc()) {
            $yesterdayCount = (int)$row['cnt'];
        }

        $resTotal = $conn->query("SELECT COUNT(*) as cnt FROM visitor_logs");
        if ($resTotal && $row = $resTotal->fetch_assoc()) {
            $totalCount = (int)$row['cnt'];
        }

        $storage = 'mysql';
    } catch (Exception $e) {
        $storage = 'json_file';
    }
}

if ($storage === 'json_file') {
    $today = date('Y-m-d');
    $statsFile = __DIR__ . '/visitor-stats.json';
    if (file_exists($statsFile)) {
        $content = @file_get_contents($statsFile);
        $stats = json_decode($content, true) ?: [];
        if (($stats['todayDate'] ?? '') === $today) {
            $todayCount = (int)($stats['todayCount'] ?? 0);
            $yesterdayCount = (int)($stats['yesterdayCount'] ?? 0);
        } else {
            $todayCount = 0;
            $yesterdayCount = (int)($stats['todayCount'] ?? 0);
        }
        $totalCount = (int)($stats['totalCount'] ?? $todayCount);
    }
}

// Calculate percentage change compared to yesterday
$percentChange = null;
if ($yesterdayCount > 0) {
    $percentChange = round((($todayCount - $yesterdayCount) / $yesterdayCount) * 100, 1);
}

echo json_encode([
    'today' => $todayCount,
    'yesterday' => $yesterdayCount,
    'percentChange' => $percentChange,
    'total' => $totalCount,
    'storage' => $storage
], JSON_PRETTY_PRINT);
