# Payment server (ESP32 + Razorpay test-mode demo)

This project uses Razorpay **Test Checkout** in a browser, a Node/Express backend, and an ESP32-WROOM-32. After the backend verifies the Checkout signature, the ESP32 polls for a one-time test authorization and blinks the built-in LED.

## Important
- This is Razorpay Standard Checkout in Test Mode, **not a printed static UPI QR integration**.
- Test mode must not collect real money.
- Orders/queue are stored in memory; restarting Node clears them.
- Local HTTP is used only for a trusted local-network demo. Do not expose this server publicly or use this code for real dispensing.
- For production: HTTPS, persistent database, webhook signature validation, payment status reconciliation, idempotency, strong device authentication, and safety interlocks are required.
- This sample only blinks an LED; do not connect a water valve/compressor yet.

## Requirements
Node.js 18+, Arduino IDE, ESP32 board package by Espressif, ArduinoJson library, Razorpay TEST Key ID and Key Secret.

## Backend setup
1. In `payment-server/` run `npm install`.
2. Copy `.env.example` to `.env` and fill in TEST credentials and a long random `DEVICE_TOKEN`.
   Windows PowerShell: `Copy-Item .env.example .env` then `notepad .env`.
3. Run `npm start`.
4. Open `http://localhost:3000` in your laptop browser.

Never share `.env` or commit it to Git. Keep the Key Secret only on the backend.

## Test payment
Click “Pay ₹5 in Test Mode” and follow Razorpay's current test checkout instructions. Do not use real payment details. On successful test checkout, the backend verifies the signature and queues a one-time authorization.

## ESP32 setup
1. Install ArduinoJson using Arduino IDE Library Manager.
2. Open `firmware/esp32_razorpay_test/esp32_razorpay_test.ino` (from the repo root).
3. Copy `secrets.example.h` to `secrets.h` in the same folder and fill in Wi-Fi SSID/password, `SERVER_BASE_URL`, and `DEVICE_TOKEN` (same value as in `.env`). Use the laptop's LAN IP (e.g. `http://192.168.1.25:3000`), not `localhost`.
4. Laptop and ESP32 must share the same Wi-Fi. Allow Node through Windows Firewall for private networks if needed.
5. Upload the sketch; open Serial Monitor at 115200 baud.

## Troubleshooting
- Order creation error: verify TEST Key ID/Secret in `.env`, then restart Node.
- ESP32 cannot reach server: use laptop LAN IP, same Wi-Fi, check Windows Firewall.
- No LED: confirm your board uses GPIO 2 for its built-in LED.
- This checkout test does not prove static printed QR payment matching. Before choosing static QR for automatic dispensing, confirm your provider supports transaction-level payment notifications and mapping to one dispense order.
