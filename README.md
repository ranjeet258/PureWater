# PureWater

PureWater is a QR-payment chilled-water vending machine (a "water ATM"). A customer pays from their
phone, the backend verifies the payment, and an ESP32 controller in the machine is told to dispense.

This private repository holds everything for the project: the public marketing website, the
payment backend, the ESP32 firmware and the project documents.

> **Status: prototype.** The payment flow runs in Razorpay **test mode** only, and the ESP32 blinks
> an LED instead of driving a valve or pump. See [Production gaps](#production-gaps) before
> connecting real hardware or taking real money.

## Repository layout

```
PureWater/
├── website/          Marketing site (Next.js, TypeScript, Tailwind) – deployed on Vercel
├── payment-server/   Node/Express backend: creates Razorpay orders, verifies payments,
│                     queues one-time dispense authorisations for the device
├── firmware/
│   └── esp32_razorpay_test/   Arduino sketch for ESP32-WROOM-32 (polls the payment server)
└── docs/             Detailed project report and reference material (PDF)
```

| Folder | Details |
| --- | --- |
| [`website/`](website/README.md) | Running locally, contact-form email (Resend), Vercel deployment |
| [`payment-server/`](payment-server/README.md) | Razorpay test setup, ESP32 flashing, troubleshooting |
| [`firmware/esp32_razorpay_test/`](firmware/esp32_razorpay_test/) | Sketch, plus `secrets.example.h` for credentials |
| [`docs/`](docs/) | `qr-water-atm-detailed-project-report.pdf`, `reference-only.pdf` |

## How the payment flow works

```
 Customer browser          payment-server                 ESP32 (in machine)
 ────────────────          ──────────────                 ──────────────────
 1. Click "Pay"   ───────► POST /api/create-order
                           (Razorpay order created)
 2. Razorpay Checkout
    completes      ──────► POST /api/verify-payment
                           HMAC signature checked;
                           authorisation queued
                                                 ◄─────── 3. GET /api/device/next  (every 2 s,
                                                             Bearer DEVICE_TOKEN)
                           returns { orderId }   ───────► 4. Dispense (LED blink for now)
                                                 ◄─────── 5. POST /api/device/ack
```

Each verified order yields exactly one authorisation. The device must present the shared
`DEVICE_TOKEN` to fetch or acknowledge it.

## Quick start

Requirements: Node.js 18+, Arduino IDE with the Espressif ESP32 board package and the
ArduinoJson library, and a Razorpay account with **test** API keys.

**Website**

```bash
cd website
npm install
cp .env.example .env.local     # fill in values
npm run dev                    # http://localhost:3000
```

**Payment server**

```bash
cd payment-server
npm install
cp .env.example .env           # Razorpay TEST keys + a long random DEVICE_TOKEN
npm start                      # http://localhost:3000
```

Both default to port 3000. To run them together, set `PORT=3001` in `payment-server/.env`
(and use that port in the firmware's `SERVER_BASE_URL`).

Generate a device token with:
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**Firmware**

1. In `firmware/esp32_razorpay_test/`, copy `secrets.example.h` to `secrets.h`.
2. Fill in Wi-Fi credentials, `SERVER_BASE_URL` (your laptop's LAN IP, e.g.
   `http://192.168.1.25:3000`, never `localhost`) and the same `DEVICE_TOKEN` as the server.
3. Open `esp32_razorpay_test.ino` in Arduino IDE, upload, and watch Serial Monitor at 115200 baud.

The laptop and ESP32 must be on the same network. On Windows, allow Node through the firewall
for private networks.

## Configuration and secrets

Only `*.example` files are committed. The real files are gitignored:

| File | Holds |
| --- | --- |
| `website/.env.local` | `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |
| `payment-server/.env` | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `DEVICE_TOKEN`, `PORT`, `AMOUNT_PAISE` |
| `firmware/esp32_razorpay_test/secrets.h` | `WIFI_SSID`, `WIFI_PASSWORD`, `SERVER_BASE_URL`, `DEVICE_TOKEN` |

Even though the repo is private, keep secrets out of Git: they would stay in the history and
reach everyone who is ever given access. If a secret is committed by mistake, rotate it.

## Deployment

- **Website:** Vercel project with **Root Directory** set to `website`. See
  [website/README.md](website/README.md#deploy-to-vercel).
- **Payment server:** local-network demo only for now. Don't expose it to the internet as-is.
- **Firmware:** flashed over USB from Arduino IDE.

## Production gaps

Work needed before the machine handles real money or water:

- [ ] Razorpay live mode with **webhook** signature validation and payment reconciliation
- [ ] Persistent database for orders and the dispense queue (the queue is in memory and is lost on restart)
- [ ] HTTPS for the server, and TLS on the device
- [ ] Per-device credentials instead of one shared token, plus idempotent dispense handling
- [ ] Hardware: relay/valve control, flow sensing, safety interlocks and fault reporting
- [ ] Confirm whether a printed static UPI QR can map each payment to one dispense, or keep
      using per-order dynamic checkout
- [ ] Final Privacy Policy and Terms on the website (current versions are placeholder drafts)

## Contact

Ranjeet Gupta – r258kgupta@gmail.com
