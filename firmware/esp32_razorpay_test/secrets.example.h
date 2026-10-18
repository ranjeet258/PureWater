// Copy this file to secrets.h (same folder) and fill in your values.
// secrets.h is gitignored; never commit real credentials.
#pragma once

const char* WIFI_SSID = "your-wifi-name";
const char* WIFI_PASSWORD = "your-wifi-password";
// Use your laptop's LAN IPv4 address, not localhost.
const char* SERVER_BASE_URL = "http://192.168.1.25:3000";
// Must match DEVICE_TOKEN in payment-server/.env
const char* DEVICE_TOKEN = "replace_with_the_same_token_as_payment_server";
