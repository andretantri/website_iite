<?php
/**
 * Database Configuration for IITE 2026 CMS
 */

// Auto-load .env configuration if present
$possibleEnvFiles = [
    __DIR__ . '/../../.env',
    dirname(__DIR__) . '/.env',
    __DIR__ . '/.env'
];

foreach ($possibleEnvFiles as $envFile) {
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            if (strpos($line, '=') !== false) {
                list($name, $value) = explode('=', $line, 2);
                $val = trim($value, "\"'\t\n\r\0\x0B ");
                putenv(trim($name) . '=' . $val);
                $_ENV[trim($name)] = $val;
            }
        }
        break;
    }
}

// Database Host
defined('DB_HOST') || define('DB_HOST', getenv('DB_HOST') ?: 'localhost');

// Database Username
defined('DB_USER') || define('DB_USER', getenv('DB_USERNAME') ?: getenv('DB_USER') ?: 'u601210817_iite_website');

// Database Password
defined('DB_PASS') || define('DB_PASS', getenv('DB_PASSWORD') ?: getenv('DB_PASS') ?: '');

// Database Name
defined('DB_NAME') || define('DB_NAME', getenv('DB_DATABASE') ?: getenv('DB_NAME') ?: 'u601210817_iite_website');

// Enable MySQL automatically ONLY if database password or explicit DB_PASS is provided
$hasDbConfig = (!empty(getenv('DB_PASSWORD')) || !empty(getenv('DB_PASS')) || (defined('DB_PASS') && DB_PASS !== ''));
defined('USE_MYSQL') || define('USE_MYSQL', $hasDbConfig);

