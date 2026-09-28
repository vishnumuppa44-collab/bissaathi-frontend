
"use strict";
 
/* =========================================================
   1. APPLICATION STATE
   ========================================================= */
 
let selectedLanguage = "hi";
let chatLanguage = null;      // language the chat was last initialised in
let chatRunId = 0;            // lets us cancel stale greeting timeouts
 
 
/* =========================================================
   2. TRANSLATIONS
   ========================================================= */
 
const translations = {
  en: {
    continueSub: "",
    greeting: [
      "Namaste! I am BIS Saathi.",
      "I can help you with BIS services and Indian Standards.",
      "Which service would you like?"
    ],
    openingPrefix: "Opening ",
    openingSuffix: ".",
    fallback:
      "Please choose a service from 1 to 4, or type Search, Verify, Complaints, or Manufacturer."
  },
 
  hi: {
    continueSub: "आगे बढ़ें",
    greeting: [
      "नमस्ते! मैं BIS Saathi हूँ।",
      "मैं आपको BIS सेवाओं और भारतीय मानकों के बारे में मदद कर सकता हूँ।",
      "बताइए, आप कौन सी सेवा चाहते हैं?"
    ],
    openingPrefix: "ठीक है, ",
    openingSuffix: " खोल रहा हूँ।",
    fallback:
      "कृपया 1 से 4 में से कोई सेवा चुनें, या Search, Verify, Complaints, Manufacturer लिखें।"
  },
 
  ta: {
    continueSub: "தொடரவும்",
    greeting: [
      "வணக்கம்! நான் BIS Saathi.",
      "BIS சேவைகள் மற்றும் இந்திய தரநிலைகள் குறித்து நான் உங்களுக்கு உதவ முடியும்.",
      "நீங்கள் எந்த சேவையை விரும்புகிறீர்கள்?"
    ],
    openingPrefix: "சரி, ",
    openingSuffix: " திறக்கிறேன்.",
    fallback:
      "தயவுசெய்து 1 முதல் 4 வரை ஒரு சேவையைத் தேர்ந்தெடுக்கவும்."
  },
 
  bn: {
    continueSub: "চালিয়ে যান",
    greeting: [
      "নমস্তে! আমি BIS Saathi।",
      "আমি আপনাকে BIS পরিষেবা এবং ভারতীয় মানদণ্ড সম্পর্কে সাহায্য করতে পারি।",
      "আপনি কোন পরিষেবা চান?"
    ],
    openingPrefix: "ঠিক আছে, ",
    openingSuffix: " খুলছি।",
    fallback:
      "অনুগ্রহ করে 1 থেকে 4 এর মধ্যে একটি পরিষেবা নির্বাচন করুন।"
  },
 
  te: {
    continueSub: "కొనసాగించండి",
    greeting: [
      "నమస్తే! నేను BIS Saathi.",
      "BIS సేవలు మరియు భారతీయ ప్రమాణాల గురించి నేను మీకు సహాయం చేయగలను.",
      "మీకు ఏ సేవ కావాలి?"
    ],
    openingPrefix: "సరే, ",
    openingSuffix: " తెరుస్తున్నాను.",
    fallback:
      "దయచేసి 1 నుండి 4 వరకు ఒక సేవను ఎంచుకోండి."
  },
 
  mr: {
    continueSub: "पुढे जा",
    greeting: [
      "नमस्ते! मी BIS Saathi आहे.",
      "मी तुम्हाला BIS सेवा आणि भारतीय मानकांबद्दल मदत करू शकतो.",
      "तुम्हाला कोणती सेवा हवी आहे?"
    ],
    openingPrefix: "ठीक आहे, ",
    openingSuffix: " उघडत आहे.",
    fallback:
      "कृपया 1 ते 4 मधून एक सेवा निवडा."
  },
 
  gu: {
    continueSub: "આગળ વધો",
    greeting: [
      "નમસ્તે! હું BIS Saathi છું.",
      "હું તમને BIS સેવાઓ અને ભારતીય ધોરણો વિશે મદદ કરી શકું છું.",
      "તમને કઈ સેવા જોઈએ છે?"
    ],
    openingPrefix: "ઠીક છે, ",
    openingSuffix: " ખોલી રહ્યો છું.",
    fallback:
      "કૃપા કરીને 1 થી 4 માંથી એક સેવા પસંદ કરો."
  },
 
  kn: {
    continueSub: "ಮುಂದುವರಿಸಿ",
    greeting: [
      "ನಮಸ್ತೆ! ನಾನು BIS Saathi.",
      "BIS ಸೇವೆಗಳು ಮತ್ತು ಭಾರತೀಯ ಗುಣಮಟ್ಟಗಳ ಬಗ್ಗೆ ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.",
      "ನಿಮಗೆ ಯಾವ ಸೇವೆ ಬೇಕು?"
    ],
    openingPrefix: "ಸರಿ, ",
    openingSuffix: " ತೆರೆಯುತ್ತಿದ್ದೇನೆ.",
    fallback:
      "ದಯವಿಟ್ಟು 1 ರಿಂದ 4 ರವರೆಗೆ ಒಂದು ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ."
  }
};
 
 
/* =========================================================
   3. SERVICE DATA
   ========================================================= */
 
const serviceMap = {
  search: {
    view: "view-search",
    name: {
      en: "IS-Code Search",
      hi: "आईएस-कोड खोज",
      ta: "IS-குறியீடு தேடல்",
      bn: "IS-কোড অনুসন্ধান",
      te: "IS-కోడ్ శోధన",
      mr: "IS-कोड शोध",
      gu: "IS-કોડ શોધ",
      kn: "IS-ಕೋಡ್ ಹುಡುಕಾಟ"
    }
  },
 
  verify: {
    view: "view-verify",
    name: {
      en: "Verify ISI & Hallmarks",
      hi: "ISI और हॉलमार्क सत्यापन",
      ta: "ISI மற்றும் ஹால்மார்க் சரிபார்ப்பு",
      bn: "ISI ও হলমার্ক যাচাই",
      te: "ISI మరియు హాల్‌మార్క్ ధృవీకరణ",
      mr: "ISI आणि हॉलमार्क पडताळणी",
      gu: "ISI અને હોલમાર્ક ચકાસણી",
      kn: "ISI ಮತ್ತು ಹಾಲ್‌ಮಾರ್ಕ್ ಪರಿಶೀಲನೆ"
    }
  },
 
  complaints: {
    view: "view-complaints",
    name: {
      en: "Consumer Complaints",
      hi: "उपभोक्ता शिकायतें",
      ta: "நுகர்வோர் புகார்கள்",
      bn: "ভোক্তা অভিযোগ",
      te: "వినియోగదారు ఫిర్యాదులు",
      mr: "ग्राहक तक्रारी",
      gu: "ગ્રાહક ફરિયાદો",
      kn: "ಗ್ರಾಹಕ ದೂರುಗಳು"
    }
  },
 
  manufacturer: {
    view: "view-manufacturer",
    name: {
      en: "Manufacturer Help",
      hi: "निर्माता सहायता",
      ta: "உற்பத்தியாளர் உதவி",
      bn: "প্রস্তুতকারক সহায়তা",
      te: "తయారీదారు సహాయం",
      mr: "उत्पादक मदत",
      gu: "ઉત્પાદક સહાય",
      kn: "ತಯಾರಕರ ಸಹಾಯ"
    }
  }
};
 
// Whole-word matching is used for these, so "led" no longer matches
// "installed", "bar" no longer matches "barrier", and so on.
const isCodeDB = [
  {
    keywords: ["led", "bulb", "light", "lamp"],
    code: "IS 16102 (Part 2)",
    title: "LED Lamps — Performance Requirements",
    category: "Electrical and Lighting"
  },
  {
    keywords: ["helmet"],
    code: "IS 4151",
    title: "Protective Helmets for Two-Wheeler Riders",
    category: "Safety Equipment"
  },
  {
    keywords: ["cement"],
    code: "IS 269",
    title: "Ordinary Portland Cement — Specification",
    category: "Construction Materials"
  },
  {
    keywords: ["water", "drinking water", "bottle"],
    code: "IS 14543",
    title: "Packaged Drinking Water — Specification",
    category: "Food and Beverage"
  },
  {
    keywords: ["toy"],
    code: "IS 9873",
    title: "Safety of Toys",
    category: "Consumer Products"
  },
  {
    keywords: ["cable", "wire"],
    code: "IS 694",
    title: "PVC Insulated Cables for Electrical Wiring",
    category: "Electrical and Lighting"
  },
  {
    keywords: ["pressure cooker", "cooker"],
    code: "IS 2347",
    title: "Aluminium Pressure Cookers",
    category: "Household Appliances"
  },
  {
    // NOTE: please double-check this entry against the official BIS
    // catalogue; IS 15298 is, as far as I know, the PPE / safety footwear
    // standard rather than a general footwear standard.
    keywords: ["footwear", "shoe"],
    code: "IS 15298",
    title: "Footwear — General Requirements",
    category: "Consumer Products"
  },
  {
    keywords: ["switch", "socket", "plug"],
    code: "IS 3854",
    title: "Switches for Household Electrical Installations",
    category: "Electrical and Lighting"
  },
  {
    keywords: ["steel", "tmt", "bar"],
    code: "IS 1786",
    title: "High Strength Deformed Steel Bars",
    category: "Construction Materials"
  }
];
 
const schemeSteps = {
  "ISI Mark (Scheme I)": [
    "Identify the applicable Indian Standard for your product.",
    "Apply to the nearest BIS branch office with the required application and test reports.",
    "BIS reviews the documents and schedules a factory audit where applicable.",
    "Product samples are tested through an appropriate laboratory process.",
    "After successful review, a licence to use the ISI Mark may be granted."
  ],
 
  "CRS (Scheme II)": [
    "Check whether your electronics or IT product falls under the Compulsory Registration Order.",
    "Get the product tested at a BIS-recognised laboratory.",
    "Submit the registration application through the required BIS process.",
    "BIS reviews the application and associated test report.",
    "After approval, register and affix the Standard Mark before sale."
  ],
 
  FMCS: [
    "Confirm that the product category is covered under the Foreign Manufacturers Certification Scheme.",
    "Submit an application with the required documents and test reports.",
    "BIS may arrange a factory inspection at the overseas manufacturing unit.",
    "BIS evaluates the inspection and testing information.",
    "After successful review, a licence may be granted to the foreign manufacturer."
  ],
 
  "ECO Mark": [
    "Check the applicable Indian Standard and environmental criteria for the product category.",
    "Prepare product and environmental test reports.",
    "Apply to BIS using the applicable process.",
    "BIS verifies compliance with quality and environmental requirements.",
    "After approval, the product may receive ECO Mark certification with the applicable quality standard."
  ]
};
 
const modalContent = {
  about: {
    title: "About Us",
    body:
      "BIS Saathi is a frontend prototype designed to help consumers and manufacturers navigate BIS services, Indian Standards, certification schemes, and complaint guidance."
  },
 
  privacy: {
    title: "Privacy Policy",
    body:
      "This demo does not send or store your data. If you later connect a backend, add a real privacy policy and protect all user information."
  },
 
  contact: {
    title: "Contact",
    body:
      "For official BIS information, use the official BIS website or contact the relevant BIS office. This page is a project prototype and not an official verification portal."
  }
};
 
 
/* =========================================================
   4. DOM ELEMENTS
   Assigned in cacheDom() AFTER the page has loaded, so the
   script works no matter where the <script> tag is placed.
   ========================================================= */
 
let chatBox;
let chatInput;
let searchBox;
let searchInput;
let modalOverlay;
 
function cacheDom() {
  chatBox = document.getElementById("chat-box");
  chatInput = document.getElementById("chat-input");
  searchBox = document.getElementById("search-chat-box");
  searchInput = document.getElementById("search-input");
  modalOverlay = document.getElementById("modal-overlay");
}
 
 
/* =========================================================
   5. COMMON FUNCTIONS
   ========================================================= */
 
function getTranslation() {
  return translations[selectedLanguage] || translations.en;
}
 
function showView(viewId) {
  const selectedView = document.getElementById(viewId);
 
  if (!selectedView) {
    return; // don't hide every view if the target id is wrong
  }
 
  // Only ONE tab is ever visible: hide all, then show the selected one.
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("show");
    view.style.display = "none";
  });
 
  selectedView.classList.add("show");
  selectedView.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
 
// The language tab is the .view that contains the language cards,
// so this works whatever id your HTML gave it.
function getLanguageViewId() {
  const card = document.querySelector(".lang-card");
  const view = card ? card.closest(".view") : null;
  return view ? view.id : "view-language";
}
 
function addMessage(role, text, container = chatBox) {
  const message = document.createElement("div");
 
  message.className = `msg ${role}`;
  message.textContent = text;
  // Makes the "\n" line breaks in search results actually visible.
  message.style.whiteSpace = "pre-line";
 
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}
 
// Enter should not send while an Indian-language IME is still composing text.
function isPlainEnter(event) {
  return event.key === "Enter" && !event.isComposing && event.keyCode !== 229;
}
 
 
/* =========================================================
   6. LANGUAGE FUNCTIONS
   ========================================================= */
 
function updateContinueLabel() {
  const continueSub = document.getElementById("continue-sub");
 
  if (!continueSub) {
    return;
  }
 
  const translatedText = getTranslation().continueSub;
 
  if (translatedText === "") {
    continueSub.style.display = "none";
    return;
  }
 
  continueSub.style.display = "inline";
  continueSub.textContent = `/ ${translatedText}`;
}
 
function setupLanguageCards() {
  const languageCards = document.querySelectorAll(".lang-card");
 
  // Keep the state in sync with what the page shows on load.
  const preselected = document.querySelector(".lang-card.selected");
 
  if (preselected && preselected.dataset.lang) {
    selectedLanguage = preselected.dataset.lang;
  } else {
    languageCards.forEach((card) => {
      if (card.dataset.lang === selectedLanguage) {
        card.classList.add("selected");
      }
    });
  }
 
  languageCards.forEach((card) => {
    card.addEventListener("click", () => {
      languageCards.forEach((item) => {
        item.classList.remove("selected");
      });
 
      card.classList.add("selected");
      selectedLanguage = card.dataset.lang;
      updateContinueLabel();
    });
  });
}
 
 
/* =========================================================
   7. CHAT FUNCTIONS
   ========================================================= */
 
function getServiceName(service) {
  return service.name[selectedLanguage] || service.name.en;
}
 
function openService(serviceKey) {
  const service = serviceMap[serviceKey];
 
  if (!service) {
    return;
  }
 
  const translation = getTranslation();
 
  addMessage(
    "assistant",
    `${translation.openingPrefix}${getServiceName(service)}${translation.openingSuffix}`
  );
 
  setTimeout(() => {
    showView(service.view);
  }, 700);
}
 
function renderQuickReplies() {
  const wrapper = document.createElement("div");
  wrapper.className = "quick-replies";
 
  Object.keys(serviceMap).forEach((serviceKey, index) => {
    const button = document.createElement("button");
    const service = serviceMap[serviceKey];
 
    button.type = "button";
    button.className = "quick-reply-btn";
    button.textContent = `${index + 1}. ${getServiceName(service)}`;
 
    button.addEventListener("click", () => {
      const buttons = wrapper.querySelectorAll("button");
 
      // Disable only briefly to stop double-clicks. Previously the buttons
      // stayed disabled forever, so after pressing Back you could not
      // choose another service with them.
      buttons.forEach((item) => {
        item.disabled = true;
      });
 
      addMessage("user", button.textContent);
 
      setTimeout(() => {
        openService(serviceKey);
      }, 300);
 
      setTimeout(() => {
        buttons.forEach((item) => {
          item.disabled = false;
        });
      }, 1200);
    });
 
    wrapper.appendChild(button);
  });
 
  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}
 
function initializeChat() {
  chatRunId += 1;
  const runId = chatRunId;
 
  chatLanguage = selectedLanguage;
  chatBox.innerHTML = "";
 
  const greeting = getTranslation().greeting;
 
  greeting.forEach((line, index) => {
    setTimeout(() => {
      if (runId !== chatRunId) {
        return; // a newer chat was started; drop this stale line
      }
      addMessage("assistant", line);
    }, index * 300);
  });
 
  setTimeout(() => {
    if (runId !== chatRunId) {
      return;
    }
    renderQuickReplies();
  }, greeting.length * 300);
}
 
// Whole-word matching, so "isi" no longer matches "decision" or "visit".
const serviceIntents = [
  { key: "verify", pattern: /\b(verify|verification|hallmarks?|isi|huid)\b/ },
  { key: "search", pattern: /\b(search|is[\s-]?code|standards?)\b/ },
  { key: "complaints", pattern: /\b(complaints?|consumer)\b/ },
  { key: "manufacturer", pattern: /\b(manufacturers?|certification|scheme)\b/ }
];
 
function matchService(text) {
  // 1. Number shortcuts: 1-4
  if (/^[1-4]$/.test(text)) {
    return Object.keys(serviceMap)[Number(text) - 1];
  }
 
  // 2. English keywords
  for (const intent of serviceIntents) {
    if (intent.pattern.test(text)) {
      return intent.key;
    }
  }
 
  // 3. Service names in any supported language (e.g. typed Hindi/Tamil names)
  for (const serviceKey of Object.keys(serviceMap)) {
    const names = Object.values(serviceMap[serviceKey].name);
 
    if (names.some((name) => text.includes(name.toLowerCase()))) {
      return serviceKey;
    }
  }
 
  return null;
}
 
function handleUserMessage(messageText) {
  const text = messageText.toLowerCase().trim();
  const serviceKey = matchService(text);
 
  if (serviceKey) {
    openService(serviceKey);
    return;
  }
 
  addMessage("assistant", getTranslation().fallback);
}
 
function sendChatMessage() {
  const text = chatInput.value.trim();
 
  if (!text) {
    return;
  }
 
  addMessage("user", text);
  chatInput.value = "";
 
  setTimeout(() => {
    handleUserMessage(text);
  }, 300);
}
 
 
/* =========================================================
   8. IS-CODE SEARCH
   ========================================================= */
 
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
 
function findIsCode(userText) {
  const searchText = userText.toLowerCase();
 
  return isCodeDB.find((entry) => {
    return entry.keywords.some((keyword) => {
      // whole word, allowing a plural "s" (toy/toys, bar/bars, shoe/shoes)
      const pattern = new RegExp(`\\b${escapeRegExp(keyword)}(?:s|es)?\\b`);
      return pattern.test(searchText);
    });
  });
}
 
function sendSearchMessage() {
  const text = searchInput.value.trim();
 
  if (!text) {
    return;
  }
 
  addMessage("user", text, searchBox);
  searchInput.value = "";
 
  setTimeout(() => {
    const match = findIsCode(text);
 
    if (match) {
      addMessage(
        "assistant",
        `Illustrative Indian Standard match:\n\n` +
        `Code: ${match.code}\n` +
        `Title: ${match.title}\n` +
        `Category: ${match.category}\n\n` +
        `Important: Confirm the exact applicable standard using official BIS resources before manufacturing or certification.`,
        searchBox
      );
 
      return;
    }
 
    addMessage(
      "assistant",
      "No illustrative match was found. Try keywords such as LED bulb, helmet, cement, cable, toy, steel, pressure cooker, or drinking water bottle.",
      searchBox
    );
  }, 400);
}
 
 
/* =========================================================
   9. VERIFY FEATURE
   ========================================================= */
 
function verifyLicense() {
  const input = document.getElementById("verify-input");
  const resultBox = document.getElementById("verify-result");
  const value = input.value.trim();
 
  resultBox.classList.remove("error");
  resultBox.style.display = "block";
 
  if (!value) {
    resultBox.classList.add("error");
    resultBox.innerHTML =
      '<div class="title">Please enter a licence number or HUID.</div>';
    return;
  }
 
  resultBox.innerHTML =
    '<div class="title">Demo verification result</div>' +
    `<div style="margin-top: 6px;">You entered: <strong>${escapeHtml(value)}</strong></div>` +
    '<div style="margin-top: 6px;">This frontend prototype cannot validate official BIS or hallmark records. Connect this page to an authorised backend or official verification source for real results.</div>';
}
 
 
/* =========================================================
   10. COMPLAINT FEATURE
   ========================================================= */
 
function submitComplaint(event) {
  event.preventDefault();
 
  const product = document.getElementById("complaint-product").value.trim();
  const issue = document.getElementById("complaint-issue").value;
  const description = document.getElementById("complaint-desc").value.trim();
  const resultBox = document.getElementById("complaint-result");
 
  if (!product || !description) {
    resultBox.classList.add("error");
    resultBox.style.display = "block";
    resultBox.innerHTML =
      '<div class="title">Please enter the product name and complaint description.</div>';
    return;
  }
 
  const trackingId = `BIS-CMP-${Math.floor(100000 + Math.random() * 900000)}`;
 
  resultBox.classList.remove("error");
  resultBox.style.display = "block";
 
  resultBox.innerHTML =
    '<div class="title">✅ Demo complaint created</div>' +
    `<div style="margin-top: 6px;">Tracking ID: <strong>${trackingId}</strong></div>` +
    `<div style="margin-top: 6px;">Product: ${escapeHtml(product)}</div>` +
    `<div>Issue: ${escapeHtml(issue)}</div>` +
    '<div style="margin-top: 8px;">This is only a frontend demo. No complaint has been submitted to BIS.</div>';
 
  document.getElementById("complaint-form").reset();
}
 
 
/* =========================================================
   11. MANUFACTURER SCHEMES
   ========================================================= */
 
function setupSchemeCards() {
  const schemeCards = document.querySelectorAll(".scheme-card");
  const detailBox = document.getElementById("scheme-detail");
 
  schemeCards.forEach((card) => {
    card.addEventListener("click", () => {
      schemeCards.forEach((item) => {
        item.classList.remove("selected");
      });
 
      card.classList.add("selected");
 
      const schemeName = card.dataset.scheme;
      const steps = schemeSteps[schemeName] || [];
 
      const stepsHtml = steps
        .map((step) => `<li>${escapeHtml(step)}</li>`)
        .join("");
 
      detailBox.innerHTML =
        `<div class="title">${escapeHtml(schemeName)} — Step-by-step process</div>` +
        `<ol>${stepsHtml}</ol>`;
 
      detailBox.style.display = "block";
    });
  });
}
 
 
/* =========================================================
   12. MODAL FUNCTIONS
   ========================================================= */
 
function openModal(key) {
  const content = modalContent[key];
 
  if (!content) {
    return;
  }
 
  document.getElementById("modal-title").textContent = content.title;
  document.getElementById("modal-body").textContent = content.body;
 
  modalOverlay.classList.add("show");
}
 
function closeModal() {
  modalOverlay.classList.remove("show");
}
 
 
/* =========================================================
   13. SECURITY HELPER
   Prevents user-entered HTML from being executed.
   ========================================================= */
 
function escapeHtml(value) {
  const temporaryElement = document.createElement("div");
  temporaryElement.textContent = value;
  return temporaryElement.innerHTML;
}
 
 
/* =========================================================
   14. EVENT LISTENERS
   ========================================================= */
 
function setupEventListeners() {
  document.getElementById("continue-btn").addEventListener("click", () => {
    showView("view-chat");
 
    // Start a fresh chat the first time AND whenever the language changed
    // since the chat was last built (previously it stayed in the old language).
    if (chatLanguage !== selectedLanguage) {
      initializeChat();
    }
  });
 
  document.getElementById("chat-send").addEventListener("click", sendChatMessage);
 
  chatInput.addEventListener("keydown", (event) => {
    if (isPlainEnter(event)) {
      event.preventDefault();
      sendChatMessage();
    }
  });
 
  document.getElementById("search-send").addEventListener("click", sendSearchMessage);
 
  searchInput.addEventListener("keydown", (event) => {
    if (isPlainEnter(event)) {
      event.preventDefault();
      sendSearchMessage();
    }
  });
 
  document.getElementById("verify-btn").addEventListener("click", verifyLicense);
 
  document
    .getElementById("complaint-form")
    .addEventListener("submit", submitComplaint);
 
  document.getElementById("mic-btn").addEventListener("click", () => {
    alert("Voice input is not connected yet. You can add it later using the Web Speech API.");
  });
 
  document.querySelectorAll(".back-btn").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.back);
    });
  });
 
  document.getElementById("footer-about").addEventListener("click", () => {
    openModal("about");
  });
 
  document.getElementById("footer-privacy").addEventListener("click", () => {
    openModal("privacy");
  });
 
  document.getElementById("footer-contact").addEventListener("click", () => {
    openModal("contact");
  });
 
  document.getElementById("modal-close").addEventListener("click", closeModal);
 
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
 
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}
 
 
/* =========================================================
   15. START APPLICATION
   ========================================================= */
 
function startApp() {
  cacheDom();
  setupLanguageCards();
  updateContinueLabel();
  setupSchemeCards();
  setupEventListeners();
 
  // Flow: 1) language tab only -> 2) chat bot asks which service
  //       -> 3) the service tab the user picked.
  showView(getLanguageViewId());
}
 
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}