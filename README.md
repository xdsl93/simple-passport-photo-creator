# Simple Passport Photo Creator

A lightweight, zero-dependency Progressive Web App (PWA) to turn any photo into a printable, perfectly sized A4 sheet of passport and ID photos directly in your browser.

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-146c63?style=flat-square&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Offline First](https://img.shields.io/badge/Offline-First-success?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-blue?style=flat-square)](#technology-stack)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JS%20%7C%20HTML5%20%7C%20CSS3-orange?style=flat-square)](#technology-stack)

---

## ✨ Features

- **🔒 100% Client-Side & Privacy-First**: All image processing and PDF creation happen directly on your device. Your photos are never uploaded to any server or external service.
- **⚡ Offline-Ready PWA**: Powered by a Service Worker with caching (`sw.js`). Works seamlessly offline and can be installed as a standalone app on iOS, Android, macOS, Windows, and Linux.
- **📐 Customizable Photo Dimensions**: Defaults to standard European passport/ID size (**3.5 × 4.5 cm**), with full support for custom width and height.
- **🔢 Flexible Photo Count**: Specify how many photos you want on the document (from 1 up to 200 copies, default 16).
- **📄 Smart A4 Grid Layout**: Automatically calculates the optimal column and row layout for standard A4 paper, automatically distributing photos across multiple pages if needed.
- **✂️ Real-Time High-Resolution Preview**: Automatically performs a centered aspect ratio crop and shows an instant canvas preview.
- **🖨️ Native Binary PDF Generator**: Generates standard PDF-1.4 documents without third-party dependencies (e.g. no heavy external PDF libraries). Directly writes JPEG streams and PDF objects.
- **📲 Mobile Web Share & Download**: Uses the native Web Share API on supported devices (phones and tablets) to quickly share or print, falling back to instant file download.
- **🌍 Multilingual Support (i18n)**: Available in English, Italian, and Spanish, with automatic browser language detection and language switcher.

---

## 🚀 Quick Start / Local Development

Because this project is built entirely with standard web technologies, there are **no build steps, bundlers, or `node_modules` dependencies**.

### Option 1: Using Python
```bash
# Clone the repository
git clone https://github.com/xdsl93/simple-passport-photo-creator.git
cd simple-passport-photo-creator

# Run a simple local HTTP server
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Using Node.js / `npx`
```bash
npx serve .
```

### Option 3: VS Code / IDE
Use an extension like **Live Server** to serve the root directory.

> **Note:** A local HTTP server is required for the Service Worker (`sw.js`) and PWA installation to function properly (browsers restrict Service Workers on the `file://` protocol).

---

## 📖 How to Use

1. **Upload Photo**: Click to select an image (JPG, PNG, or camera capture) or drag and drop it into the upload area.
2. **Configure Dimensions & Count**:
   - Set the required photo width and height in centimeters (default: `3.5 cm` × `4.5 cm`).
   - Specify the number of photos to print (default: `16`).
3. **Review Preview**: Check the cropped preview canvas in real time.
4. **Generate PDF**: Click **"Generate PDF"** (or **"Genera PDF"**) to download or share the generated A4 PDF file ready for printing.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic markup, responsive viewport, PWA manifest tags.
- **Vanilla CSS**: Clean, responsive layout with CSS variables and modern UI design.
- **Vanilla JavaScript (ES6+)**:
  - `Canvas API` & `createImageBitmap` for image loading, scaling, and high-quality center cropping.
  - Native binary `PDF-1.4` stream writer implementing catalog, page references, XObjects (`/DCTDecode`), content streams, and xref tables from scratch.
  - `Service Worker API` for offline caching and network-first retrieval.
  - `Web Share API` for native mobile sharing.

---

## 📁 Project Structure

```text
simple-passport-photo-creator/
├── assets/
│   ├── icon.svg             # Application SVG vector icon
│   ├── icon-192.png         # PWA icon (192x192)
│   └── icon-512.png         # PWA icon (512x512)
├── app.js                   # Application logic, i18n, canvas rendering & PDF generator
├── index.html               # Main HTML markup and UI structure
├── manifest.webmanifest     # PWA Web App Manifest
├── styles.css               # Styling and responsive design
├── sw.js                    # Service Worker for offline capability
└── README.md                # Project documentation
```

---

## 📱 Installation (PWA)

- **Android / Chrome / Edge**: Click the **"Install app"** button in the footer or select **Install** from your browser's menu.
- **iOS / Safari**: Tap the **Share** button (box with arrow) and select **"Add to Home Screen"**.

---

## 📄 License

This project is open-source. Feel free to use, modify, and distribute it.
