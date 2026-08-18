const photoInput = document.querySelector("#photoInput");
const dropZone = document.querySelector("#dropZone");
const previewArea = document.querySelector("#previewArea");
const previewCanvas = document.querySelector("#previewCanvas");
const removeButton = document.querySelector("#removeButton");
const pdfButton = document.querySelector("#pdfButton");
const installButton = document.querySelector("#installButton");
const languageSelect = document.querySelector("#languageSelect");
const widthInput = document.querySelector("#widthInput");
const heightInput = document.querySelector("#heightInput");
const photoCountInput = document.querySelector("#photoCountInput");
const statusMessage = document.querySelector("#statusMessage");

const CM_TO_PT = 28.3464566929;
const A4 = { width: 595.28, height: 841.89 };
const DEFAULT_PHOTO_CM = { width: 3.5, height: 4.5 };
const DEFAULT_PHOTO_COUNT = 16;
const MAX_PHOTO_COUNT = 200;
const GRID_GAP_PT = 10;
const CANVAS_LONG_SIDE = 1350;
const TRANSLATIONS = {
  it: {
    appTitle: "Generatore Fototessere PDF",
    metaDescription: "Carica una foto e ottieni un PDF A4 con 9 immagini da 3,5 x 4,5 cm. Tutto offline. Facile no?",
    appTitle: "Generatore Fototessere PDF",
    metaDescription: "Carica una foto e ottieni un PDF A4 con 16 immagini da 3,5 x 4,5 cm. Tutto offline. Facile no?",
    eyebrow: "PWA offline",
    description: "Carica una foto e ottieni un PDF A4 con 16 immagini da 3,5 x 4,5 cm. Tutto offline. Facile no?",
    sizeControls: "Dimensioni fototessera",
    widthLabel: "Larghezza cm",
    heightLabel: "Altezza cm",
    photoCountLabel: "Numero foto",
    uploadTitle: "Carica una foto",
    uploadHint: "JPG, PNG o immagine dalla fotocamera",
    previewCanvas: "Anteprima fototessera",
    removeButton: "Elimina",
    pdfButton: "Genera PDF",
    installButton: "Installa app",
    languageLabel: "Lingua",
    offlineUnavailable: "Modalita offline non disponibile in questo browser.",
    appInstalled: "App installata sul dispositivo.",
    alreadyInstalled: "L'app e gia installata su questo dispositivo.",
    installStarted: "Installazione avviata.",
    installCancelled: "Installazione annullata.",
    noPhoto: "Carica una foto prima di generare il PDF.",
    creatingPdf: "Creo il PDF...",
    shareText: "PDF con {count} fototessere {width} x {height} cm.",
    pdfShared: "PDF pronto e condiviso.",
    pdfDownloaded: "PDF scaricato. Puoi aprirlo per stamparlo.",
    pdfError: "Non sono riuscito a generare il PDF. Riprova con un'altra immagine.",
    invalidImage: "Seleziona un file immagine valido.",
    photoLoaded: "Foto caricata. Ritaglio centrale in formato {width} x {height} cm.",
    unreadableImage: "Immagine non leggibile. Prova con un file JPG o PNG.",
    previewUpdated: "Anteprima aggiornata: {width} x {height} cm.",
    photoRemoved: "Foto eliminata. Puoi caricarne una nuova.",
    a4FitError: "Queste dimensioni non entrano in un foglio A4. Riduci larghezza o altezza.",
    invalidPhotoCount: "Inserisci un numero di foto tra 1 e 200.",
    installIos: "Su iPhone/iPad: tocca Condividi e poi Aggiungi alla schermata Home.",
    installAndroid: "Su Android: apri il menu del browser e scegli Installa app o Aggiungi a schermata Home.",
    installGeneric: "Apri il menu del browser e scegli Installa app o Aggiungi a schermata Home.",
  },
  en: {
    appTitle: "Passport Photo PDF Generator",
    metaDescription: "Upload a photo and get an A4 PDF with 16 images sized 3.5 x 4.5 cm. Fully offline. Easy, right?",
    eyebrow: "Offline PWA",
    description: "Upload a photo and get an A4 PDF with 16 images sized 3.5 x 4.5 cm. Fully offline. Easy, right?",
    sizeControls: "Passport photo dimensions",
    widthLabel: "Width cm",
    heightLabel: "Height cm",
    uploadTitle: "Upload a photo",
    uploadHint: "JPG, PNG or camera image",
    previewCanvas: "Passport photo preview",
    removeButton: "Remove",
    pdfButton: "Generate PDF",
    installButton: "Install app",
    languageLabel: "Language",
    offlineUnavailable: "Offline mode is not available in this browser.",
    appInstalled: "App installed on this device.",
    alreadyInstalled: "The app is already installed on this device.",
    installStarted: "Installation started.",
    installCancelled: "Installation cancelled.",
    noPhoto: "Upload a photo before generating the PDF.",
    creatingPdf: "Creating the PDF...",
    shareText: "PDF with 16 passport photos sized {width} x {height} cm.",
    pdfShared: "PDF ready and shared.",
    pdfDownloaded: "PDF downloaded. Open it to print.",
    pdfError: "I could not generate the PDF. Try again with another image.",
    invalidImage: "Select a valid image file.",
    photoLoaded: "Photo uploaded. Center crop set to {width} x {height} cm.",
    unreadableImage: "Image could not be read. Try a JPG or PNG file.",
    previewUpdated: "Preview updated: {width} x {height} cm.",
    photoRemoved: "Photo removed. You can upload a new one.",
    a4FitError: "These dimensions do not fit on an A4 sheet in a 3x3 grid. Reduce width or height.",
    installIos: "On iPhone/iPad: tap Share, then Add to Home Screen.",
    installAndroid: "On Android: open the browser menu and choose Install app or Add to Home screen.",
    installGeneric: "Open the browser menu and choose Install app or Add to Home screen.",
  },
  es: {
    appTitle: "Fotos Carnet PDF Generator",
    metaDescription: "Sube una foto y obtén un PDF A4 con 16 imágenes de 3,5 x 4,5 cm. Todo offline. Fácil, ¿no?",
    eyebrow: "PWA offline",
    description: "Sube una foto y obtén un PDF A4 con 16 imágenes de 3,5 x 4,5 cm. Todo offline. Fácil, ¿no?",
    sizeControls: "Dimensiones de la foto carnet",
    widthLabel: "Ancho cm",
    heightLabel: "Alto cm",
    uploadTitle: "Sube una foto",
    uploadHint: "JPG, PNG o imagen de la cámara",
    previewCanvas: "Vista previa de foto carnet",
    removeButton: "Eliminar",
    pdfButton: "Generar PDF",
    installButton: "Instalar app",
    languageLabel: "Idioma",
    offlineUnavailable: "El modo offline no esta disponible en este navegador.",
    appInstalled: "App instalada en el dispositivo.",
    alreadyInstalled: "La app ya esta instalada en este dispositivo.",
    installStarted: "Instalacion iniciada.",
    installCancelled: "Instalacion cancelada.",
    noPhoto: "Sube una foto antes de generar el PDF.",
    creatingPdf: "Creando el PDF...",
    shareText: "PDF con 16 fotos carnet de {width} x {height} cm.",
    pdfShared: "PDF listo y compartido.",
    pdfDownloaded: "PDF descargado. Abrelo para imprimirlo.",
    pdfError: "No pude generar el PDF. Intentalo con otra imagen.",
    invalidImage: "Selecciona un archivo de imagen valido.",
    photoLoaded: "Foto cargada. Recorte central en formato {width} x {height} cm.",
    unreadableImage: "No se puede leer la imagen. Prueba con un archivo JPG o PNG.",
    previewUpdated: "Vista previa actualizada: {width} x {height} cm.",
    photoRemoved: "Foto eliminada. Puedes subir una nueva.",
    a4FitError: "Estas dimensiones no caben en una hoja A4 con una cuadrícula 3x3. Reduce el ancho o el alto.",
    installIos: "En iPhone/iPad: toca Compartir y luego Añadir a pantalla de inicio.",
    installAndroid: "En Android: abre el menu del navegador y elige Instalar app o Añadir a pantalla de inicio.",
    installGeneric: "Abre el menu del navegador y elige Instalar app o Añadir a pantalla de inicio.",
  },
};

let selectedImage = null;
let installPromptEvent = null;
let currentLanguage = getInitialLanguage();
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

applyTranslations();

if (isStandalone) {
  installButton.hidden = true;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      setStatus(t("offlineUnavailable"));
    });
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPromptEvent = event;
  installButton.hidden = false;
});

window.addEventListener("appinstalled", () => {
  installPromptEvent = null;
  installButton.hidden = true;
  setStatus(t("appInstalled"));
});

photoInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) {
    loadPhoto(file);
  }
});

languageSelect.addEventListener("change", () => {
  currentLanguage = languageSelect.value;
  localStorage.setItem("preferredLanguage", currentLanguage);
  applyTranslations();
});

["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("is-dragging");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("is-dragging");
  });
});

dropZone.addEventListener("drop", (event) => {
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    loadPhoto(file);
  }
});

[widthInput, heightInput].forEach((input) => {
  input.addEventListener("input", () => {
    const size = getPhotoSizeCm();
    updatePreviewSize(size);
    if (selectedImage) {
      drawPreview();
      setStatus(
        t("previewUpdated", {
          width: formatCm(size.width),
          height: formatCm(size.height),
        })
      );
    }
  });
});

removeButton.addEventListener("click", () => {
  clearPhoto();
});

installButton.addEventListener("click", async () => {
  if (isStandalone) {
    installButton.hidden = true;
    setStatus(t("alreadyInstalled"));
    return;
  }

  if (installPromptEvent) {
    installPromptEvent.prompt();
    const result = await installPromptEvent.userChoice;
    installPromptEvent = null;
    installButton.hidden = true;
    setStatus(
      result.outcome === "accepted"
        ? t("installStarted")
        : t("installCancelled")
    );
    return;
  }

  setStatus(getInstallInstructions());
});

pdfButton.addEventListener("click", async () => {
  if (!selectedImage) {
    setStatus(t("noPhoto"));
    return;
  }

  try {
    const size = getPhotoSizeCm();
    const fitError = getA4FitError(size);
    if (fitError) {
      setStatus(fitError);
      return;
    }

    pdfButton.disabled = true;
    setStatus(t("creatingPdf"));
    const photo = createPassportCanvas(selectedImage, ...getOutputCanvasSize(size));
    const jpeg = await canvasToJpegBytes(photo);
    const pdfBytes = createPdf(jpeg.bytes, photo.width, photo.height, size);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const fileName = "fototessere.pdf";
    const file = new File([blob], fileName, { type: "application/pdf" });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: t("appTitle"),
        text: t("shareText", {
          width: formatCm(size.width),
          height: formatCm(size.height),
        }),
        files: [file],
      });
      setStatus(t("pdfShared"));
    } else {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setStatus(t("pdfDownloaded"));
    }
  } catch (error) {
    setStatus(t("pdfError"));
  } finally {
    pdfButton.disabled = false;
  }
});

async function loadPhoto(file) {
  if (!file.type.startsWith("image/")) {
    setStatus(t("invalidImage"));
    return;
  }

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    selectedImage = bitmap;
    updatePreviewSize(getPhotoSizeCm());
    drawPreview();
    dropZone.hidden = true;
    previewArea.hidden = false;
    const size = getPhotoSizeCm();
    setStatus(
      t("photoLoaded", {
        width: formatCm(size.width),
        height: formatCm(size.height),
      })
    );
  } catch (error) {
    setStatus(t("unreadableImage"));
  }
}

function drawPreview() {
  const size = getPhotoSizeCm();
  updatePreviewSize(size);
  const canvas = createPassportCanvas(selectedImage, previewCanvas.width, previewCanvas.height);
  const context = previewCanvas.getContext("2d");
  context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  context.drawImage(canvas, 0, 0);
}

function clearPhoto() {
  selectedImage = null;
  photoInput.value = "";
  const context = previewCanvas.getContext("2d");
  context.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  previewArea.hidden = true;
  dropZone.hidden = false;
  setStatus(t("photoRemoved"));
}

function createPassportCanvas(image, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;

  if (sourceRatio > targetRatio) {
    sw = image.height * targetRatio;
    sx = (image.width - sw) / 2;
  } else {
    sh = image.width / targetRatio;
    sy = (image.height - sh) / 2;
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
  return canvas;
}

function canvasToJpegBytes(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          reject(new Error("JPEG creation failed"));
          return;
        }
        resolve({ bytes: new Uint8Array(await blob.arrayBuffer()) });
      },
      "image/jpeg",
      0.94
    );
  });
}

function createPdf(jpegBytes, imageWidth, imageHeight, photoSizeCm) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;

  const appendText = (text) => appendBytes(encoder.encode(text));
  const appendBytes = (bytes) => {
    chunks.push(bytes);
    length += bytes.length;
  };

  const writeObject = (number, body) => {
    offsets[number] = length;
    appendText(`${number} 0 obj\n${body}\nendobj\n`);
  };

  appendText("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  writeObject(1, "<< /Type /Catalog /Pages 2 0 R >>");
  writeObject(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  writeObject(
    3,
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${A4.width} ${A4.height}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>`
  );

  offsets[4] = length;
  appendText(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`
  );
  appendBytes(jpegBytes);
  appendText("\nendstream\nendobj\n");

  const content = createPdfContentStream(photoSizeCm);
  writeObject(5, `<< /Length ${content.length} >>\nstream\n${content}endstream`);

  const xrefOffset = length;
  appendText(`xref\n0 6\n0000000000 65535 f \n`);
  for (let i = 1; i <= 5; i += 1) {
    appendText(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  appendText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  const output = new Uint8Array(length);
  let position = 0;
  for (const chunk of chunks) {
    output.set(chunk, position);
    position += chunk.length;
  }
  return output;
}

function createPdfContentStream(photoSizeCm) {
  const photoPt = cmToPtSize(photoSizeCm);
  const gridWidth = photoPt.width * 3 + GRID_GAP_PT * 2;
  const gridHeight = photoPt.height * 3 + GRID_GAP_PT * 2;
  const startX = (A4.width - gridWidth) / 2;
  const topY = (A4.height - gridHeight) / 2 + gridHeight;
  const commands = [];

  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const x = startX + col * (photoPt.width + GRID_GAP_PT);
      const y = topY - (row + 1) * photoPt.height - row * GRID_GAP_PT;
      commands.push(
        `q ${photoPt.width.toFixed(3)} 0 0 ${photoPt.height.toFixed(3)} ${x.toFixed(3)} ${y.toFixed(3)} cm /Im1 Do Q\n`
      );
    }
  }

  return commands.join("");
}

function setStatus(message) {
  statusMessage.textContent = message;
}

function t(key, values = {}) {
  const template = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.it[key] || key;
  return Object.entries(values).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    template
  );
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t("appTitle");
  document.querySelector("meta[name='description']")?.setAttribute("content", t("metaDescription"));
  languageSelect.value = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
}

function getInitialLanguage() {
  const stored = localStorage.getItem("preferredLanguage");
  if (stored && TRANSLATIONS[stored]) {
    return stored;
  }

  const browserLanguage = (navigator.language || "it").slice(0, 2).toLowerCase();
  return TRANSLATIONS[browserLanguage] ? browserLanguage : "it";
}

function getPhotoSizeCm() {
  return {
    width: readCmInput(widthInput, DEFAULT_PHOTO_CM.width),
    height: readCmInput(heightInput, DEFAULT_PHOTO_CM.height),
  };
}

function readCmInput(input, fallback) {
  const value = Number.parseFloat(String(input.value).replace(",", "."));
  if (!Number.isFinite(value) || value <= 0) {
    return fallback;
  }
  return value;
}

function cmToPtSize(size) {
  return {
    width: size.width * CM_TO_PT,
    height: size.height * CM_TO_PT,
  };
}

function getOutputCanvasSize(size) {
  const ratio = size.width / size.height;
  if (ratio >= 1) {
    return [CANVAS_LONG_SIDE, Math.round(CANVAS_LONG_SIDE / ratio)];
  }
  return [Math.round(CANVAS_LONG_SIDE * ratio), CANVAS_LONG_SIDE];
}

function updatePreviewSize(size) {
  const [width, height] = getOutputCanvasSize(size);
  if (previewCanvas.width !== width || previewCanvas.height !== height) {
    previewCanvas.width = width;
    previewCanvas.height = height;
  }
  previewCanvas.parentElement.style.setProperty("--photo-ratio", `${size.width} / ${size.height}`);
}

function getA4FitError(size) {
  const photoPt = cmToPtSize(size);
  const gridWidth = photoPt.width * 3 + GRID_GAP_PT * 2;
  const gridHeight = photoPt.height * 3 + GRID_GAP_PT * 2;

  if (gridWidth > A4.width || gridHeight > A4.height) {
    return t("a4FitError");
  }

  return "";
}

function formatCm(value) {
  const locales = {
    it: "it-IT",
    en: "en-US",
    es: "es-ES",
  };

  return value.toLocaleString(locales[currentLanguage] || "it-IT", {
    maximumFractionDigits: 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 1,
  });
}

function getInstallInstructions() {
  const ua = navigator.userAgent || "";
  const isIos = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);

  if (isIos) {
    return t("installIos");
  }

  if (isAndroid) {
    return t("installAndroid");
  }

  return t("installGeneric");
}
