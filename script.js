"use strict";

/* =========================================================
   1. APPLICATION STATE
   ========================================================= */

let selectedLanguage = "hi";
let chatLanguage = null;
let chatRunId = 0;


/* =========================================================
   2. TRANSLATIONS – CHAT
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
    fallback: "Please choose a service from 1 to 4, or type Search, Verify, Complaints, or Manufacturer."
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
    fallback: "कृपया 1 से 4 में से कोई सेवा चुनें, या Search, Verify, Complaints, Manufacturer लिखें।"
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
    fallback: "தயவுசெய்து 1 முதல் 4 வரை ஒரு சேவையைத் தேர்ந்தெடுக்கவும்."
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
    fallback: "অনুগ্রহ করে 1 থেকে 4 এর মধ্যে একটি পরিষেবা নির্বাচন করুন।"
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
    fallback: "దయచేసి 1 నుండి 4 వరకు ఒక సేవను ఎంచుకోండి."
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
    fallback: "कृपया 1 ते 4 मधून एक सेवा निवडा."
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
    fallback: "કૃપા કરીને 1 થી 4 માંથી એક સેવા પસંદ કરો."
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
    fallback: "ದಯವಿಟ್ಟು 1 ರಿಂದ 4 ರವರೆಗೆ ಒಂದು ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ."
  }
};


/* =========================================================
   3. TRANSLATIONS – UI TEXT SHOWN AFTER A SERVICE IS OPENED
   ========================================================= */

const ui = {
  en: {
    searchHeader: "Illustrative Indian Standard match:",
    code: "Code",
    title: "Title",
    category: "Category",
    searchImportant: "Important: Confirm the exact applicable standard using official BIS resources before manufacturing or certification.",
    searchNone: "No illustrative match was found. Try keywords such as LED bulb, helmet, cement, cable, toy, steel, pressure cooker, or drinking water bottle.",
    verifyEmpty: "Please enter a licence number or HUID.",
    verifyTitle: "Demo verification result",
    verifyEntered: "You entered:",
    verifyNote: "This frontend prototype cannot validate official BIS or hallmark records. Connect this page to an authorised backend or official verification source for real results.",
    complaintEmpty: "Please enter the product name and complaint description.",
    complaintCreated: "✅ Demo complaint created",
    tracking: "Tracking ID:",
    product: "Product:",
    issue: "Issue:",
    complaintNote: "This is only a frontend demo. No complaint has been submitted to BIS.",
    stepsTitle: "Step-by-step process",
    about: "About Us",
    privacy: "Privacy Policy",
    contact: "Contact",
    aboutBody: "BIS Saathi is a frontend prototype designed to help consumers and manufacturers navigate BIS services, Indian Standards, certification schemes, and complaint guidance.",
    privacyBody: "This demo does not send or store your data. If you later connect a backend, add a real privacy policy and protect all user information.",
    contactBody: "For official BIS information, use the official BIS website or contact the relevant BIS office. This page is a project prototype and not an official verification portal.",
    back: "Back",
    send: "Send",
    searchPlaceholder: "Type a product, e.g. LED bulb",
    verifyPlaceholder: "Enter licence number or HUID",
    verifyBtn: "Verify",
    submit: "Submit complaint",
    voiceMsg: "Voice input is not connected yet. You can add it later using the Web Speech API."
  },
  hi: {
    searchHeader: "संबंधित भारतीय मानक (उदाहरण):",
    code: "कोड",
    title: "शीर्षक",
    category: "श्रेणी",
    searchImportant: "महत्वपूर्ण: निर्माण या प्रमाणन से पहले आधिकारिक BIS स्रोतों से सटीक लागू मानक की पुष्टि अवश्य करें।",
    searchNone: "कोई उदाहरण मिलान नहीं मिला। LED bulb, helmet, cement, cable, toy, steel, pressure cooker या drinking water bottle जैसे शब्द आज़माएँ।",
    verifyEmpty: "कृपया लाइसेंस नंबर या HUID दर्ज करें।",
    verifyTitle: "डेमो सत्यापन परिणाम",
    verifyEntered: "आपने दर्ज किया:",
    verifyNote: "यह फ्रंटएंड प्रोटोटाइप आधिकारिक BIS या हॉलमार्क रिकॉर्ड की पुष्टि नहीं कर सकता। वास्तविक परिणामों के लिए इसे किसी अधिकृत बैकएंड या आधिकारिक सत्यापन स्रोत से जोड़ें।",
    complaintEmpty: "कृपया उत्पाद का नाम और शिकायत का विवरण दर्ज करें।",
    complaintCreated: "✅ डेमो शिकायत बनाई गई",
    tracking: "ट्रैकिंग ID:",
    product: "उत्पाद:",
    issue: "समस्या:",
    complaintNote: "यह केवल फ्रंटएंड डेमो है। BIS को कोई शिकायत जमा नहीं की गई है।",
    stepsTitle: "चरण-दर-चरण प्रक्रिया",
    about: "हमारे बारे में",
    privacy: "गोपनीयता नीति",
    contact: "संपर्क",
    aboutBody: "BIS Saathi एक फ्रंटएंड प्रोटोटाइप है, जो उपभोक्ताओं और निर्माताओं को BIS सेवाओं, भारतीय मानकों, प्रमाणन योजनाओं और शिकायत मार्गदर्शन में मदद करने के लिए बनाया गया है।",
    privacyBody: "यह डेमो आपका डेटा न भेजता है और न सहेजता है। यदि आप बाद में बैकएंड जोड़ें, तो वास्तविक गोपनीयता नीति जोड़ें और सभी उपयोगकर्ता जानकारी की सुरक्षा करें।",
    contactBody: "आधिकारिक BIS जानकारी के लिए BIS की आधिकारिक वेबसाइट देखें या संबंधित BIS कार्यालय से संपर्क करें। यह पेज एक प्रोजेक्ट प्रोटोटाइप है, आधिकारिक सत्यापन पोर्टल नहीं।",
    back: "वापस",
    send: "भेजें",
    searchPlaceholder: "उत्पाद लिखें, जैसे LED bulb",
    verifyPlaceholder: "लाइसेंस नंबर या HUID दर्ज करें",
    verifyBtn: "सत्यापित करें",
    submit: "शिकायत दर्ज करें",
    voiceMsg: "वॉइस इनपुट अभी जुड़ा नहीं है। इसे बाद में Web Speech API से जोड़ा जा सकता है।"
  },
  ta: {
    searchHeader: "தொடர்புடைய இந்திய தரநிலை (எடுத்துக்காட்டு):",
    code: "குறியீடு",
    title: "தலைப்பு",
    category: "வகை",
    searchImportant: "முக்கியம்: உற்பத்தி அல்லது சான்றிதழுக்கு முன் அதிகாரப்பூர்வ BIS ஆதாரங்களில் சரியான தரநிலையை உறுதிப்படுத்துங்கள்.",
    searchNone: "எடுத்துக்காட்டு பொருத்தம் எதுவும் கிடைக்கவில்லை. LED bulb, helmet, cement, cable, toy, steel, pressure cooker அல்லது drinking water bottle போன்ற சொற்களை முயற்சிக்கவும்.",
    verifyEmpty: "உரிம எண் அல்லது HUID ஐ உள்ளிடவும்.",
    verifyTitle: "டெமோ சரிபார்ப்பு முடிவு",
    verifyEntered: "நீங்கள் உள்ளிட்டது:",
    verifyNote: "இந்த முன்முனை மாதிரி அதிகாரப்பூர்வ BIS அல்லது ஹால்மார்க் பதிவுகளைச் சரிபார்க்க முடியாது. உண்மையான முடிவுகளுக்கு அங்கீகரிக்கப்பட்ட பின்முனை அல்லது அதிகாரப்பூர்வ ஆதாரத்துடன் இணைக்கவும்.",
    complaintEmpty: "தயாரிப்பு பெயர் மற்றும் புகார் விவரத்தை உள்ளிடவும்.",
    complaintCreated: "✅ டெமோ புகார் உருவாக்கப்பட்டது",
    tracking: "கண்காணிப்பு ID:",
    product: "தயாரிப்பு:",
    issue: "சிக்கல்:",
    complaintNote: "இது முன்முனை டெமோ மட்டுமே. BIS-க்கு எந்த புகாரும் சமர்ப்பிக்கப்படவில்லை.",
    stepsTitle: "படிப்படியான செயல்முறை",
    about: "எங்களைப் பற்றி",
    privacy: "தனியுரிமைக் கொள்கை",
    contact: "தொடர்பு",
    aboutBody: "BIS Saathi என்பது நுகர்வோர் மற்றும் உற்பத்தியாளர்கள் BIS சேவைகள், இந்திய தரநிலைகள், சான்றிதழ் திட்டங்கள் மற்றும் புகார் வழிகாட்டுதலைப் புரிந்துகொள்ள உதவும் முன்முனை மாதிரி.",
    privacyBody: "இந்த டெமோ உங்கள் தரவை அனுப்பவோ சேமிக்கவோ செய்யாது. பின்னர் பின்முனையை இணைத்தால், உண்மையான தனியுரிமைக் கொள்கையைச் சேர்த்து பயனர் தகவலைப் பாதுகாக்கவும்.",
    contactBody: "அதிகாரப்பூர்வ BIS தகவலுக்கு BIS இணையதளத்தைப் பயன்படுத்தவும் அல்லது தொடர்புடைய BIS அலுவலகத்தைத் தொடர்பு கொள்ளவும். இந்தப் பக்கம் ஒரு திட்ட மாதிரி மட்டுமே, அதிகாரப்பூர்வ சரிபார்ப்பு தளம் அல்ல.",
    back: "பின்செல்",
    send: "அனுப்பு",
    searchPlaceholder: "பொருளை உள்ளிடவும், எ.கா. LED bulb",
    verifyPlaceholder: "உரிம எண் அல்லது HUID உள்ளிடவும்",
    verifyBtn: "சரிபார்",
    submit: "புகாரைச் சமர்ப்பி",
    voiceMsg: "குரல் உள்ளீடு இன்னும் இணைக்கப்படவில்லை. பின்னர் Web Speech API மூலம் சேர்க்கலாம்."
  },
  bn: {
    searchHeader: "প্রাসঙ্গিক ভারতীয় মান (উদাহরণ):",
    code: "কোড",
    title: "শিরোনাম",
    category: "বিভাগ",
    searchImportant: "গুরুত্বপূর্ণ: উৎপাদন বা সার্টিফিকেশনের আগে সরকারি BIS সূত্রে সঠিক প্রযোজ্য মান নিশ্চিত করুন।",
    searchNone: "কোনো উদাহরণ মিল পাওয়া যায়নি। LED bulb, helmet, cement, cable, toy, steel, pressure cooker বা drinking water bottle-এর মতো শব্দ চেষ্টা করুন।",
    verifyEmpty: "অনুগ্রহ করে লাইসেন্স নম্বর বা HUID লিখুন।",
    verifyTitle: "ডেমো যাচাইকরণের ফলাফল",
    verifyEntered: "আপনি লিখেছেন:",
    verifyNote: "এই ফ্রন্টএন্ড প্রোটোটাইপ সরকারি BIS বা হলমার্ক রেকর্ড যাচাই করতে পারে না। প্রকৃত ফলাফলের জন্য অনুমোদিত ব্যাকএন্ড বা সরকারি উৎসের সঙ্গে যুক্ত করুন।",
    complaintEmpty: "অনুগ্রহ করে পণ্যের নাম ও অভিযোগের বিবরণ লিখুন।",
    complaintCreated: "✅ ডেমো অভিযোগ তৈরি হয়েছে",
    tracking: "ট্র্যাকিং ID:",
    product: "পণ্য:",
    issue: "সমস্যা:",
    complaintNote: "এটি শুধুমাত্র একটি ফ্রন্টএন্ড ডেমো। BIS-এ কোনো অভিযোগ জমা দেওয়া হয়নি।",
    stepsTitle: "ধাপে ধাপে প্রক্রিয়া",
    about: "আমাদের সম্পর্কে",
    privacy: "গোপনীয়তা নীতি",
    contact: "যোগাযোগ",
    aboutBody: "BIS Saathi একটি ফ্রন্টএন্ড প্রোটোটাইপ, যা ভোক্তা ও প্রস্তুতকারকদের BIS পরিষেবা, ভারতীয় মান, সার্টিফিকেশন স্কিম এবং অভিযোগ নির্দেশনা বুঝতে সাহায্য করে।",
    privacyBody: "এই ডেমো আপনার তথ্য পাঠায় বা সংরক্ষণ করে না। পরে ব্যাকএন্ড যুক্ত করলে প্রকৃত গোপনীয়তা নীতি যোগ করুন এবং ব্যবহারকারীর সব তথ্য সুরক্ষিত রাখুন।",
    contactBody: "সরকারি BIS তথ্যের জন্য BIS-এর অফিসিয়াল ওয়েবসাইট ব্যবহার করুন বা সংশ্লিষ্ট BIS অফিসে যোগাযোগ করুন। এই পৃষ্ঠা একটি প্রকল্প প্রোটোটাইপ, সরকারি যাচাই পোর্টাল নয়।",
    back: "পিছনে",
    send: "পাঠান",
    searchPlaceholder: "পণ্য লিখুন, যেমন LED bulb",
    verifyPlaceholder: "লাইসেন্স নম্বর বা HUID লিখুন",
    verifyBtn: "যাচাই করুন",
    submit: "অভিযোগ জমা দিন",
    voiceMsg: "ভয়েস ইনপুট এখনও যুক্ত হয়নি। পরে Web Speech API দিয়ে যোগ করা যাবে।"
  },
  te: {
    searchHeader: "సంబంధిత భారతీయ ప్రమాణం (ఉదాహరణ):",
    code: "కోడ్",
    title: "శీర్షిక",
    category: "వర్గం",
    searchImportant: "ముఖ్యం: తయారీ లేదా ధృవీకరణకు ముందు అధికారిక BIS వనరులలో సరైన ప్రమాణాన్ని నిర్ధారించుకోండి.",
    searchNone: "ఉదాహరణ సరిపోలిక ఏదీ దొరకలేదు. LED bulb, helmet, cement, cable, toy, steel, pressure cooker లేదా drinking water bottle వంటి పదాలను ప్రయత్నించండి.",
    verifyEmpty: "దయచేసి లైసెన్స్ నంబర్ లేదా HUID నమోదు చేయండి.",
    verifyTitle: "డెమో ధృవీకరణ ఫలితం",
    verifyEntered: "మీరు నమోదు చేసింది:",
    verifyNote: "ఈ ఫ్రంట్‌ఎండ్ ప్రోటోటైప్ అధికారిక BIS లేదా హాల్‌మార్క్ రికార్డులను ధృవీకరించలేదు. నిజమైన ఫలితాల కోసం అధీకృత బ్యాకెండ్ లేదా అధికారిక వనరుకు అనుసంధానించండి.",
    complaintEmpty: "దయచేసి ఉత్పత్తి పేరు మరియు ఫిర్యాదు వివరణ నమోదు చేయండి.",
    complaintCreated: "✅ డెమో ఫిర్యాదు సృష్టించబడింది",
    tracking: "ట్రాకింగ్ ID:",
    product: "ఉత్పత్తి:",
    issue: "సమస్య:",
    complaintNote: "ఇది కేవలం ఫ్రంట్‌ఎండ్ డెమో. BIS కి ఎలాంటి ఫిర్యాదు సమర్పించబడలేదు.",
    stepsTitle: "దశలవారీ ప్రక్రియ",
    about: "మా గురించి",
    privacy: "గోప్యతా విధానం",
    contact: "సంప్రదించండి",
    aboutBody: "BIS Saathi అనేది వినియోగదారులు మరియు తయారీదారులకు BIS సేవలు, భారతీయ ప్రమాణాలు, ధృవీకరణ పథకాలు మరియు ఫిర్యాదు మార్గదర్శకత్వంలో సహాయపడే ఫ్రంట్‌ఎండ్ ప్రోటోటైప్.",
    privacyBody: "ఈ డెమో మీ డేటాను పంపదు లేదా నిల్వ చేయదు. తర్వాత బ్యాకెండ్ అనుసంధానిస్తే, నిజమైన గోప్యతా విధానాన్ని జోడించి వినియోగదారు సమాచారాన్ని రక్షించండి.",
    contactBody: "అధికారిక BIS సమాచారం కోసం BIS అధికారిక వెబ్‌సైట్‌ను ఉపయోగించండి లేదా సంబంధిత BIS కార్యాలయాన్ని సంప్రదించండి. ఈ పేజీ ప్రాజెక్ట్ ప్రోటోటైప్ మాత్రమే, అధికారిక ధృవీకరణ పోర్టల్ కాదు.",
    back: "వెనుకకు",
    send: "పంపు",
    searchPlaceholder: "ఉత్పత్తిని నమోదు చేయండి, ఉదా. LED bulb",
    verifyPlaceholder: "లైసెన్స్ నంబర్ లేదా HUID నమోదు చేయండి",
    verifyBtn: "ధృవీకరించు",
    submit: "ఫిర్యాదు సమర్పించు",
    voiceMsg: "వాయిస్ ఇన్‌పుట్ ఇంకా అనుసంధానించబడలేదు. తర్వాత Web Speech API తో జోడించవచ్చు."
  },
  mr: {
    searchHeader: "संबंधित भारतीय मानक (उदाहरण):",
    code: "कोड",
    title: "शीर्षक",
    category: "श्रेणी",
    searchImportant: "महत्त्वाचे: उत्पादन किंवा प्रमाणनापूर्वी अधिकृत BIS स्रोतांवरून अचूक लागू मानकाची खात्री करा.",
    searchNone: "कोणताही उदाहरण जुळणारा निकाल सापडला नाही. LED bulb, helmet, cement, cable, toy, steel, pressure cooker किंवा drinking water bottle असे शब्द वापरून पहा.",
    verifyEmpty: "कृपया परवाना क्रमांक किंवा HUID प्रविष्ट करा.",
    verifyTitle: "डेमो पडताळणी निकाल",
    verifyEntered: "तुम्ही प्रविष्ट केले:",
    verifyNote: "हा फ्रंटएंड प्रोटोटाइप अधिकृत BIS किंवा हॉलमार्क नोंदींची पडताळणी करू शकत नाही. खऱ्या निकालांसाठी अधिकृत बॅकएंड किंवा अधिकृत स्रोताशी जोडा.",
    complaintEmpty: "कृपया उत्पादनाचे नाव आणि तक्रारीचे वर्णन प्रविष्ट करा.",
    complaintCreated: "✅ डेमो तक्रार तयार झाली",
    tracking: "ट्रॅकिंग ID:",
    product: "उत्पादन:",
    issue: "समस्या:",
    complaintNote: "हा फक्त फ्रंटएंड डेमो आहे. BIS कडे कोणतीही तक्रार सादर केलेली नाही.",
    stepsTitle: "टप्प्याटप्प्याने प्रक्रिया",
    about: "आमच्याबद्दल",
    privacy: "गोपनीयता धोरण",
    contact: "संपर्क",
    aboutBody: "BIS Saathi हा फ्रंटएंड प्रोटोटाइप आहे, जो ग्राहक आणि उत्पादकांना BIS सेवा, भारतीय मानके, प्रमाणन योजना आणि तक्रार मार्गदर्शनात मदत करतो.",
    privacyBody: "हा डेमो तुमचा डेटा पाठवत नाही किंवा साठवत नाही. नंतर बॅकएंड जोडल्यास खरे गोपनीयता धोरण जोडा आणि सर्व वापरकर्त्यांची माहिती सुरक्षित ठेवा.",
    contactBody: "अधिकृत BIS माहितीसाठी BIS ची अधिकृत वेबसाइट वापरा किंवा संबंधित BIS कार्यालयाशी संपर्क साधा. हे पृष्ठ प्रकल्प प्रोटोटाइप आहे, अधिकृत पडताळणी पोर्टल नाही.",
    back: "मागे",
    send: "पाठवा",
    searchPlaceholder: "उत्पादन लिहा, उदा. LED bulb",
    verifyPlaceholder: "परवाना क्रमांक किंवा HUID प्रविष्ट करा",
    verifyBtn: "पडताळणी करा",
    submit: "तक्रार नोंदवा",
    voiceMsg: "व्हॉइस इनपुट अजून जोडलेले नाही. नंतर Web Speech API ने जोडता येईल."
  },
  gu: {
    searchHeader: "સંબંધિત ભારતીય ધોરણ (ઉદાહરણ):",
    code: "કોડ",
    title: "શીર્ષક",
    category: "શ્રેણી",
    searchImportant: "મહત્વપૂર્ણ: ઉત્પાદન અથવા પ્રમાણન પહેલાં સત્તાવાર BIS સ્રોતોથી સાચા લાગુ ધોરણની ખાતરી કરો.",
    searchNone: "કોઈ ઉદાહરણ મેળ મળ્યો નથી. LED bulb, helmet, cement, cable, toy, steel, pressure cooker અથવા drinking water bottle જેવા શબ્દો અજમાવો.",
    verifyEmpty: "કૃપા કરીને લાઇસન્સ નંબર અથવા HUID દાખલ કરો.",
    verifyTitle: "ડેમો ચકાસણી પરિણામ",
    verifyEntered: "તમે દાખલ કર્યું:",
    verifyNote: "આ ફ્રન્ટએન્ડ પ્રોટોટાઇપ સત્તાવાર BIS અથવા હોલમાર્ક રેકોર્ડ ચકાસી શકતો નથી. સાચા પરિણામો માટે અધિકૃત બેકએન્ડ અથવા સત્તાવાર સ્રોત સાથે જોડો.",
    complaintEmpty: "કૃપા કરીને ઉત્પાદનનું નામ અને ફરિયાદનું વર્ણન દાખલ કરો.",
    complaintCreated: "✅ ડેમો ફરિયાદ બનાવવામાં આવી",
    tracking: "ટ્રેકિંગ ID:",
    product: "ઉત્પાદન:",
    issue: "સમસ્યા:",
    complaintNote: "આ માત્ર ફ્રન્ટએન્ડ ડેમો છે. BIS ને કોઈ ફરિયાદ સબમિટ કરવામાં આવી નથી.",
    stepsTitle: "પગલાં-દર-પગલાં પ્રક્રિયા",
    about: "અમારા વિશે",
    privacy: "ગોપનીયતા નીતિ",
    contact: "સંપર્ક",
    aboutBody: "BIS Saathi એક ફ્રન્ટએન્ડ પ્રોટોટાઇપ છે, જે ગ્રાહકો અને ઉત્પાદકોને BIS સેવાઓ, ભારતીય ધોરણો, પ્રમાણન યોજનાઓ અને ફરિયાદ માર્ગદર્શનમાં મદદ કરે છે.",
    privacyBody: "આ ડેમો તમારો ડેટા મોકલતો કે સંગ્રહતો નથી. પછી બેકએન્ડ જોડો તો સાચી ગોપનીયતા નીતિ ઉમેરો અને બધા વપરાશકર્તાઓની માહિતી સુરક્ષિત રાખો.",
    contactBody: "સત્તાવાર BIS માહિતી માટે BIS ની સત્તાવાર વેબસાઇટ વાપરો અથવા સંબંધિત BIS કચેરીનો સંપર્ક કરો. આ પેજ પ્રોજેક્ટ પ્રોટોટાઇપ છે, સત્તાવાર ચકાસણી પોર્ટલ નથી.",
    back: "પાછળ",
    send: "મોકલો",
    searchPlaceholder: "ઉત્પાદન લખો, જેમ કે LED bulb",
    verifyPlaceholder: "લાઇસન્સ નંબર અથવા HUID દાખલ કરો",
    verifyBtn: "ચકાસો",
    submit: "ફરિયાદ નોંધાવો",
    voiceMsg: "વૉઇસ ઇનપુટ હજુ જોડાયેલ નથી. પછી Web Speech API થી ઉમેરી શકાય."
  },
  kn: {
    searchHeader: "ಸಂಬಂಧಿತ ಭಾರತೀಯ ಮಾನದಂಡ (ಉದಾಹರಣೆ):",
    code: "ಕೋಡ್",
    title: "ಶೀರ್ಷಿಕೆ",
    category: "ವರ್ಗ",
    searchImportant: "ಮುಖ್ಯ: ಉತ್ಪಾದನೆ ಅಥವಾ ಪ್ರಮಾಣೀಕರಣಕ್ಕೆ ಮೊದಲು ಅಧಿಕೃತ BIS ಮೂಲಗಳಲ್ಲಿ ಸರಿಯಾದ ಮಾನದಂಡವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    searchNone: "ಯಾವುದೇ ಉದಾಹರಣೆ ಹೊಂದಾಣಿಕೆ ಸಿಗಲಿಲ್ಲ. LED bulb, helmet, cement, cable, toy, steel, pressure cooker ಅಥವಾ drinking water bottle ಮುಂತಾದ ಪದಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
    verifyEmpty: "ದಯವಿಟ್ಟು ಪರವಾನಗಿ ಸಂಖ್ಯೆ ಅಥವಾ HUID ನಮೂದಿಸಿ.",
    verifyTitle: "ಡೆಮೊ ಪರಿಶೀಲನೆ ಫಲಿತಾಂಶ",
    verifyEntered: "ನೀವು ನಮೂದಿಸಿದ್ದು:",
    verifyNote: "ಈ ಫ್ರಂಟ್‌ಎಂಡ್ ಪ್ರೋಟೋಟೈಪ್ ಅಧಿಕೃತ BIS ಅಥವಾ ಹಾಲ್‌ಮಾರ್ಕ್ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ನಿಜವಾದ ಫಲಿತಾಂಶಕ್ಕಾಗಿ ಅಧಿಕೃತ ಬ್ಯಾಕೆಂಡ್ ಅಥವಾ ಅಧಿಕೃತ ಮೂಲಕ್ಕೆ ಸಂಪರ್ಕಿಸಿ.",
    complaintEmpty: "ದಯವಿಟ್ಟು ಉತ್ಪನ್ನದ ಹೆಸರು ಮತ್ತು ದೂರಿನ ವಿವರಣೆ ನಮೂದಿಸಿ.",
    complaintCreated: "✅ ಡೆಮೊ ದೂರು ರಚಿಸಲಾಗಿದೆ",
    tracking: "ಟ್ರ್ಯಾಕಿಂಗ್ ID:",
    product: "ಉತ್ಪನ್ನ:",
    issue: "ಸಮಸ್ಯೆ:",
    complaintNote: "ಇದು ಕೇವಲ ಫ್ರಂಟ್‌ಎಂಡ್ ಡೆಮೊ. BIS ಗೆ ಯಾವುದೇ ದೂರು ಸಲ್ಲಿಸಲಾಗಿಲ್ಲ.",
    stepsTitle: "ಹಂತ ಹಂತದ ಪ್ರಕ್ರಿಯೆ",
    about: "ನಮ್ಮ ಬಗ್ಗೆ",
    privacy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    contact: "ಸಂಪರ್ಕ",
    aboutBody: "BIS Saathi ಎಂಬುದು ಗ್ರಾಹಕರು ಮತ್ತು ತಯಾರಕರಿಗೆ BIS ಸೇವೆಗಳು, ಭಾರತೀಯ ಮಾನದಂಡಗಳು, ಪ್ರಮಾಣೀಕರಣ ಯೋಜನೆಗಳು ಮತ್ತು ದೂರು ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಸಹಾಯ ಮಾಡುವ ಫ್ರಂಟ್‌ಎಂಡ್ ಪ್ರೋಟೋಟೈಪ್.",
    privacyBody: "ಈ ಡೆಮೊ ನಿಮ್ಮ ಡೇಟಾವನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ ಅಥವಾ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ. ನಂತರ ಬ್ಯಾಕೆಂಡ್ ಸಂಪರ್ಕಿಸಿದರೆ, ನಿಜವಾದ ಗೌಪ್ಯತಾ ನೀತಿ ಸೇರಿಸಿ ಮತ್ತು ಬಳಕೆದಾರರ ಮಾಹಿತಿಯನ್ನು ರಕ್ಷಿಸಿ.",
    contactBody: "ಅಧಿಕೃತ BIS ಮಾಹಿತಿಗಾಗಿ BIS ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಬಳಸಿ ಅಥವಾ ಸಂಬಂಧಿತ BIS ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ. ಈ ಪುಟ ಯೋಜನೆಯ ಪ್ರೋಟೋಟೈಪ್ ಮಾತ್ರ, ಅಧಿಕೃತ ಪರಿಶೀಲನಾ ಪೋರ್ಟಲ್ ಅಲ್ಲ.",
    back: "ಹಿಂದೆ",
    send: "ಕಳುಹಿಸಿ",
    searchPlaceholder: "ಉತ್ಪನ್ನ ಬರೆಯಿರಿ, ಉದಾ. LED bulb",
    verifyPlaceholder: "ಪರವಾನಗಿ ಸಂಖ್ಯೆ ಅಥವಾ HUID ನಮೂದಿಸಿ",
    verifyBtn: "ಪರಿಶೀಲಿಸಿ",
    submit: "ದೂರು ಸಲ್ಲಿಸಿ",
    voiceMsg: "ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಇನ್ನೂ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ. ನಂತರ Web Speech API ಮೂಲಕ ಸೇರಿಸಬಹುದು."
  }
};

const categoryNames = {
  "Electrical and Lighting": {
    en: "Electrical and Lighting", hi: "विद्युत और प्रकाश", ta: "மின்சாரம் மற்றும் விளக்கு",
    bn: "বৈদ্যুতিক ও আলো", te: "విద్యుత్ మరియు లైటింగ్", mr: "विद्युत आणि प्रकाश",
    gu: "વિદ્યુત અને લાઇટિંગ", kn: "ವಿದ್ಯುತ್ ಮತ್ತು ಬೆಳಕು"
  },
  "Safety Equipment": {
    en: "Safety Equipment", hi: "सुरक्षा उपकरण", ta: "பாதுகாப்பு உபகரணம்",
    bn: "নিরাপত্তা সরঞ্জাম", te: "భద్రతా పరికరాలు", mr: "सुरक्षा उपकरणे",
    gu: "સલામતી સાધનો", kn: "ಸುರಕ್ಷತಾ ಸಾಧನಗಳು"
  },
  "Construction Materials": {
    en: "Construction Materials", hi: "निर्माण सामग्री", ta: "கட்டுமானப் பொருட்கள்",
    bn: "নির্মাণ সামগ্রী", te: "నిర్మాణ సామగ్రి", mr: "बांधकाम साहित्य",
    gu: "બાંધકામ સામગ્રી", kn: "ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿಗಳು"
  },
  "Food and Beverage": {
    en: "Food and Beverage", hi: "खाद्य और पेय", ta: "உணவு மற்றும் பானம்",
    bn: "খাদ্য ও পানীয়", te: "ఆహారం మరియు పానీయాలు", mr: "अन्न आणि पेय",
    gu: "ખોરાક અને પીણાં", kn: "ಆಹಾರ ಮತ್ತು ಪಾನೀಯ"
  },
  "Consumer Products": {
    en: "Consumer Products", hi: "उपभोक्ता उत्पाद", ta: "நுகர்வோர் பொருட்கள்",
    bn: "ভোক্তা পণ্য", te: "వినియోగదారు ఉత్పత్తులు", mr: "ग्राहक उत्पादने",
    gu: "ગ્રાહક ઉત્પાદનો", kn: "ಗ್ರಾಹಕ ಉತ್ಪನ್ನಗಳು"
  },
  "Household Appliances": {
    en: "Household Appliances", hi: "घरेलू उपकरण", ta: "வீட்டு உபகரணங்கள்",
    bn: "গৃহস্থালি যন্ত্রপাতি", te: "గృహోపకరణాలు", mr: "घरगुती उपकरणे",
    gu: "ઘરગથ્થુ ઉપકરણો", kn: "ಗೃಹೋಪಯೋಗಿ ಉಪಕರಣಗಳು"
  }
};


/* =========================================================
   4. SERVICE DATA
   ========================================================= */

const serviceMap = {
  search: {
    view: "view-search",
    name: {
      en: "IS-Code Search", hi: "आईएस-कोड खोज", ta: "IS-குறியீடு தேடல்",
      bn: "IS-কোড অনুসন্ধান", te: "IS-కోడ్ శోధన", mr: "IS-कोड शोध",
      gu: "IS-કોડ શોધ", kn: "IS-ಕೋಡ್ ಹುಡುಕಾಟ"
    }
  },
  verify: {
    view: "view-verify",
    name: {
      en: "Verify ISI & Hallmarks", hi: "ISI और हॉलमार्क सत्यापन", ta: "ISI மற்றும் ஹால்மார்க் சரிபார்ப்பு",
      bn: "ISI ও হলমার্ক যাচাই", te: "ISI మరియు హాల్‌మార్క్ ధృవీకరణ", mr: "ISI आणि हॉलमार्क पडताळणी",
      gu: "ISI અને હોલમાર્ક ચકાસણી", kn: "ISI ಮತ್ತು ಹಾಲ್‌ಮಾರ್ಕ್ ಪರಿಶೀಲನೆ"
    }
  },
  complaints: {
    view: "view-complaints",
    name: {
      en: "Consumer Complaints", hi: "उपभोक्ता शिकायतें", ta: "நுகர்வோர் புகார்கள்",
      bn: "ভোক্তা অভিযোগ", te: "వినియోగదారు ఫిర్యాదులు", mr: "ग्राहक तक्रारी",
      gu: "ગ્રાહક ફરિયાદો", kn: "ಗ್ರಾಹಕ ದೂರುಗಳು"
    }
  },
  manufacturer: {
    view: "view-manufacturer",
    name: {
      en: "Manufacturer Help", hi: "निर्माता सहायता", ta: "உற்பத்தியாளர் உதவி",
      bn: "প্রস্তুতকারক সহায়তা", te: "తయారీదారు సహాయం", mr: "उत्पादक मदत",
      gu: "ઉત્પાદક સહાય", kn: "ತಯಾರಕರ ಸಹಾಯ"
    }
  }
};

const isCodeDB = [
  { keywords: ["led", "bulb", "light", "lamp"], code: "IS 16102 (Part 2)", title: "LED Lamps — Performance Requirements", category: "Electrical and Lighting" },
  { keywords: ["helmet"], code: "IS 4151", title: "Protective Helmets for Two-Wheeler Riders", category: "Safety Equipment" },
  { keywords: ["cement"], code: "IS 269", title: "Ordinary Portland Cement — Specification", category: "Construction Materials" },
  { keywords: ["water", "drinking water", "bottle"], code: "IS 14543", title: "Packaged Drinking Water — Specification", category: "Food and Beverage" },
  { keywords: ["toy"], code: "IS 9873", title: "Safety of Toys", category: "Consumer Products" },
  { keywords: ["cable", "wire"], code: "IS 694", title: "PVC Insulated Cables for Electrical Wiring", category: "Electrical and Lighting" },
  { keywords: ["pressure cooker", "cooker"], code: "IS 2347", title: "Aluminium Pressure Cookers", category: "Household Appliances" },
  // NOTE: please double-check this entry against the official BIS catalogue.
  { keywords: ["footwear", "shoe"], code: "IS 15298", title: "Footwear — General Requirements", category: "Consumer Products" },
  { keywords: ["switch", "socket", "plug"], code: "IS 3854", title: "Switches for Household Electrical Installations", category: "Electrical and Lighting" },
  { keywords: ["steel", "tmt", "bar"], code: "IS 1786", title: "High Strength Deformed Steel Bars", category: "Construction Materials" }
];

const schemeSteps = {
  "ISI Mark (Scheme I)": {
    en: [
      "Identify the applicable Indian Standard for your product.",
      "Apply to the nearest BIS branch office with the required application and test reports.",
      "BIS reviews the documents and schedules a factory audit where applicable.",
      "Product samples are tested through an appropriate laboratory process.",
      "After successful review, a licence to use the ISI Mark may be granted."
    ],
    hi: [
      "अपने उत्पाद के लिए लागू भारतीय मानक की पहचान करें।",
      "आवश्यक आवेदन और परीक्षण रिपोर्ट के साथ निकटतम BIS शाखा कार्यालय में आवेदन करें।",
      "BIS दस्तावेज़ों की समीक्षा करता है और जहाँ लागू हो, फ़ैक्टरी ऑडिट की तिथि तय करता है।",
      "उत्पाद के नमूनों का उपयुक्त प्रयोगशाला प्रक्रिया से परीक्षण किया जाता है।",
      "सफल समीक्षा के बाद ISI मार्क के उपयोग का लाइसेंस दिया जा सकता है।"
    ],
    ta: [
      "உங்கள் தயாரிப்புக்குப் பொருந்தும் இந்திய தரநிலையை அடையாளம் காணுங்கள்.",
      "தேவையான விண்ணப்பம் மற்றும் சோதனை அறிக்கைகளுடன் அருகிலுள்ள BIS கிளை அலுவலகத்தில் விண்ணப்பிக்கவும்.",
      "BIS ஆவணங்களை ஆய்வு செய்து, பொருந்தும் இடங்களில் தொழிற்சாலை தணிக்கையை திட்டமிடும்.",
      "தயாரிப்பு மாதிரிகள் பொருத்தமான ஆய்வக செயல்முறையில் சோதிக்கப்படும்.",
      "வெற்றிகரமான ஆய்வுக்குப் பிறகு ISI குறியைப் பயன்படுத்த உரிமம் வழங்கப்படலாம்."
    ],
    bn: [
      "আপনার পণ্যের জন্য প্রযোজ্য ভারতীয় মান শনাক্ত করুন।",
      "প্রয়োজনীয় আবেদন ও পরীক্ষার রিপোর্টসহ নিকটতম BIS শাখা অফিসে আবেদন করুন।",
      "BIS নথি পর্যালোচনা করে এবং প্রযোজ্য ক্ষেত্রে কারখানা অডিটের সময়সূচি ঠিক করে।",
      "পণ্যের নমুনা উপযুক্ত পরীক্ষাগার প্রক্রিয়ায় পরীক্ষা করা হয়।",
      "সফল পর্যালোচনার পর ISI চিহ্ন ব্যবহারের লাইসেন্স দেওয়া হতে পারে।"
    ],
    te: [
      "మీ ఉత్పత్తికి వర్తించే భారతీయ ప్రమాణాన్ని గుర్తించండి.",
      "అవసరమైన దరఖాస్తు మరియు పరీక్ష నివేదికలతో సమీప BIS శాఖ కార్యాలయంలో దరఖాస్తు చేయండి.",
      "BIS పత్రాలను సమీక్షించి, వర్తించే చోట ఫ్యాక్టరీ ఆడిట్‌ను షెడ్యూల్ చేస్తుంది.",
      "ఉత్పత్తి నమూనాలను తగిన ప్రయోగశాల ప్రక్రియ ద్వారా పరీక్షిస్తారు.",
      "విజయవంతమైన సమీక్ష తర్వాత ISI మార్క్ వినియోగానికి లైసెన్స్ మంజూరు కావచ్చు."
    ],
    mr: [
      "तुमच्या उत्पादनासाठी लागू भारतीय मानक ओळखा.",
      "आवश्यक अर्ज आणि चाचणी अहवालांसह जवळच्या BIS शाखा कार्यालयात अर्ज करा.",
      "BIS कागदपत्रांचे पुनरावलोकन करते आणि लागू असल्यास कारखाना ऑडिट ठरवते.",
      "उत्पादनाच्या नमुन्यांची योग्य प्रयोगशाळा प्रक्रियेतून चाचणी केली जाते.",
      "यशस्वी पुनरावलोकनानंतर ISI मार्क वापरण्याचा परवाना दिला जाऊ शकतो."
    ],
    gu: [
      "તમારા ઉત્પાદન માટે લાગુ ભારતીય ધોરણ ઓળખો.",
      "જરૂરી અરજી અને ટેસ્ટ રિપોર્ટ સાથે નજીકની BIS શાખા કચેરીમાં અરજી કરો.",
      "BIS દસ્તાવેજોની સમીક્ષા કરે છે અને જ્યાં લાગુ હોય ત્યાં ફેક્ટરી ઓડિટ ગોઠવે છે.",
      "ઉત્પાદનના નમૂનાઓની યોગ્ય પ્રયોગશાળા પ્રક્રિયા દ્વારા ચકાસણી થાય છે.",
      "સફળ સમીક્ષા પછી ISI માર્ક વાપરવાનું લાઇસન્સ આપવામાં આવી શકે છે."
    ],
    kn: [
      "ನಿಮ್ಮ ಉತ್ಪನ್ನಕ್ಕೆ ಅನ್ವಯಿಸುವ ಭಾರತೀಯ ಮಾನದಂಡವನ್ನು ಗುರುತಿಸಿ.",
      "ಅಗತ್ಯ ಅರ್ಜಿ ಮತ್ತು ಪರೀಕ್ಷಾ ವರದಿಗಳೊಂದಿಗೆ ಹತ್ತಿರದ BIS ಶಾಖಾ ಕಚೇರಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      "BIS ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಅನ್ವಯಿಸಿದರೆ ಕಾರ್ಖಾನೆ ಲೆಕ್ಕಪರಿಶೋಧನೆಯನ್ನು ನಿಗದಿಪಡಿಸುತ್ತದೆ.",
      "ಉತ್ಪನ್ನದ ಮಾದರಿಗಳನ್ನು ಸೂಕ್ತ ಪ್ರಯೋಗಾಲಯ ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ಪರೀಕ್ಷಿಸಲಾಗುತ್ತದೆ.",
      "ಯಶಸ್ವಿ ಪರಿಶೀಲನೆಯ ನಂತರ ISI ಮಾರ್ಕ್ ಬಳಸಲು ಪರವಾನಗಿ ನೀಡಬಹುದು."
    ]
  },

  "CRS (Scheme II)": {
    en: [
      "Check whether your electronics or IT product falls under the Compulsory Registration Order.",
      "Get the product tested at a BIS-recognised laboratory.",
      "Submit the registration application through the required BIS process.",
      "BIS reviews the application and associated test report.",
      "After approval, register and affix the Standard Mark before sale."
    ],
    hi: [
      "जाँचें कि आपका इलेक्ट्रॉनिक या IT उत्पाद अनिवार्य पंजीकरण आदेश के अंतर्गत आता है या नहीं।",
      "उत्पाद का BIS-मान्यता प्राप्त प्रयोगशाला में परीक्षण कराएँ।",
      "आवश्यक BIS प्रक्रिया के माध्यम से पंजीकरण आवेदन जमा करें।",
      "BIS आवेदन और संबंधित परीक्षण रिपोर्ट की समीक्षा करता है।",
      "स्वीकृति के बाद बिक्री से पहले पंजीकरण करें और मानक चिह्न लगाएँ।"
    ],
    ta: [
      "உங்கள் மின்னணு அல்லது IT தயாரிப்பு கட்டாயப் பதிவு ஆணையின் கீழ் வருகிறதா என்று சரிபார்க்கவும்.",
      "தயாரிப்பை BIS அங்கீகாரம் பெற்ற ஆய்வகத்தில் சோதிக்கவும்.",
      "தேவையான BIS செயல்முறை மூலம் பதிவு விண்ணப்பத்தைச் சமர்ப்பிக்கவும்.",
      "BIS விண்ணப்பம் மற்றும் தொடர்புடைய சோதனை அறிக்கையை ஆய்வு செய்யும்.",
      "ஒப்புதலுக்குப் பிறகு, விற்பனைக்கு முன் பதிவு செய்து தரநிலைக் குறியை ஒட்டவும்."
    ],
    bn: [
      "আপনার ইলেকট্রনিক্স বা IT পণ্য বাধ্যতামূলক নিবন্ধন আদেশের আওতায় পড়ে কিনা যাচাই করুন।",
      "পণ্যটি BIS-স্বীকৃত পরীক্ষাগারে পরীক্ষা করান।",
      "প্রয়োজনীয় BIS প্রক্রিয়ার মাধ্যমে নিবন্ধন আবেদন জমা দিন।",
      "BIS আবেদন ও সংশ্লিষ্ট পরীক্ষার রিপোর্ট পর্যালোচনা করে।",
      "অনুমোদনের পর বিক্রয়ের আগে নিবন্ধন করুন এবং স্ট্যান্ডার্ড মার্ক লাগান।"
    ],
    te: [
      "మీ ఎలక్ట్రానిక్స్ లేదా IT ఉత్పత్తి తప్పనిసరి రిజిస్ట్రేషన్ ఆర్డర్ పరిధిలోకి వస్తుందో లేదో తనిఖీ చేయండి.",
      "ఉత్పత్తిని BIS గుర్తింపు పొందిన ప్రయోగశాలలో పరీక్షింపజేయండి.",
      "అవసరమైన BIS ప్రక్రియ ద్వారా రిజిస్ట్రేషన్ దరఖాస్తును సమర్పించండి.",
      "BIS దరఖాస్తు మరియు సంబంధిత పరీక్ష నివేదికను సమీక్షిస్తుంది.",
      "ఆమోదం తర్వాత అమ్మకానికి ముందు రిజిస్టర్ చేసి స్టాండర్డ్ మార్క్ అతికించండి."
    ],
    mr: [
      "तुमचे इलेक्ट्रॉनिक्स किंवा IT उत्पादन अनिवार्य नोंदणी आदेशाच्या कक्षेत येते का ते तपासा.",
      "उत्पादनाची BIS-मान्यताप्राप्त प्रयोगशाळेत चाचणी करून घ्या.",
      "आवश्यक BIS प्रक्रियेद्वारे नोंदणी अर्ज सादर करा.",
      "BIS अर्ज आणि संबंधित चाचणी अहवालाचे पुनरावलोकन करते.",
      "मंजुरीनंतर विक्रीपूर्वी नोंदणी करा आणि मानक चिन्ह लावा."
    ],
    gu: [
      "તપાસો કે તમારું ઇલેક્ટ્રોનિક્સ અથવા IT ઉત્પાદન ફરજિયાત નોંધણી આદેશ હેઠળ આવે છે કે નહીં.",
      "ઉત્પાદનનું BIS-માન્ય પ્રયોગશાળામાં પરીક્ષણ કરાવો.",
      "જરૂરી BIS પ્રક્રિયા દ્વારા નોંધણી અરજી સબમિટ કરો.",
      "BIS અરજી અને સંબંધિત ટેસ્ટ રિપોર્ટની સમીક્ષા કરે છે.",
      "મંજૂરી પછી વેચાણ પહેલાં નોંધણી કરો અને સ્ટાન્ડર્ડ માર્ક લગાવો."
    ],
    kn: [
      "ನಿಮ್ಮ ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಅಥವಾ IT ಉತ್ಪನ್ನ ಕಡ್ಡಾಯ ನೋಂದಣಿ ಆದೇಶದ ವ್ಯಾಪ್ತಿಗೆ ಬರುತ್ತದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
      "ಉತ್ಪನ್ನವನ್ನು BIS ಮಾನ್ಯತೆ ಪಡೆದ ಪ್ರಯೋಗಾಲಯದಲ್ಲಿ ಪರೀಕ್ಷಿಸಿ.",
      "ಅಗತ್ಯ BIS ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ ನೋಂದಣಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      "BIS ಅರ್ಜಿ ಮತ್ತು ಸಂಬಂಧಿತ ಪರೀಕ್ಷಾ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.",
      "ಅನುಮೋದನೆಯ ನಂತರ ಮಾರಾಟಕ್ಕೆ ಮೊದಲು ನೋಂದಾಯಿಸಿ ಮತ್ತು ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಮಾರ್ಕ್ ಅಂಟಿಸಿ."
    ]
  },

  FMCS: {
    en: [
      "Confirm that the product category is covered under the Foreign Manufacturers Certification Scheme.",
      "Submit an application with the required documents and test reports.",
      "BIS may arrange a factory inspection at the overseas manufacturing unit.",
      "BIS evaluates the inspection and testing information.",
      "After successful review, a licence may be granted to the foreign manufacturer."
    ],
    hi: [
      "पुष्टि करें कि उत्पाद श्रेणी विदेशी निर्माता प्रमाणन योजना के अंतर्गत आती है।",
      "आवश्यक दस्तावेज़ों और परीक्षण रिपोर्ट के साथ आवेदन जमा करें।",
      "BIS विदेश स्थित निर्माण इकाई का फ़ैक्टरी निरीक्षण करा सकता है।",
      "BIS निरीक्षण और परीक्षण की जानकारी का मूल्यांकन करता है।",
      "सफल समीक्षा के बाद विदेशी निर्माता को लाइसेंस दिया जा सकता है।"
    ],
    ta: [
      "தயாரிப்பு வகை வெளிநாட்டு உற்பத்தியாளர் சான்றிதழ் திட்டத்தின் கீழ் உள்ளதா என்பதை உறுதிப்படுத்தவும்.",
      "தேவையான ஆவணங்கள் மற்றும் சோதனை அறிக்கைகளுடன் விண்ணப்பத்தைச் சமர்ப்பிக்கவும்.",
      "BIS வெளிநாட்டு உற்பத்தி அலகில் தொழிற்சாலை ஆய்வை ஏற்பாடு செய்யலாம்.",
      "BIS ஆய்வு மற்றும் சோதனைத் தகவல்களை மதிப்பீடு செய்யும்.",
      "வெற்றிகரமான ஆய்வுக்குப் பிறகு வெளிநாட்டு உற்பத்தியாளருக்கு உரிமம் வழங்கப்படலாம்."
    ],
    bn: [
      "নিশ্চিত করুন যে পণ্যের বিভাগটি বিদেশি প্রস্তুতকারক সার্টিফিকেশন স্কিমের আওতায় আছে।",
      "প্রয়োজনীয় নথি ও পরীক্ষার রিপোর্টসহ আবেদন জমা দিন।",
      "BIS বিদেশে অবস্থিত উৎপাদন ইউনিটে কারখানা পরিদর্শনের ব্যবস্থা করতে পারে।",
      "BIS পরিদর্শন ও পরীক্ষার তথ্য মূল্যায়ন করে।",
      "সফল পর্যালোচনার পর বিদেশি প্রস্তুতকারককে লাইসেন্স দেওয়া হতে পারে।"
    ],
    te: [
      "ఉత్పత్తి వర్గం విదేశీ తయారీదారుల ధృవీకరణ పథకం పరిధిలో ఉందో నిర్ధారించుకోండి.",
      "అవసరమైన పత్రాలు మరియు పరీక్ష నివేదికలతో దరఖాస్తు సమర్పించండి.",
      "BIS విదేశీ తయారీ యూనిట్‌లో ఫ్యాక్టరీ తనిఖీని ఏర్పాటు చేయవచ్చు.",
      "BIS తనిఖీ మరియు పరీక్ష సమాచారాన్ని మూల్యాంకనం చేస్తుంది.",
      "విజయవంతమైన సమీక్ష తర్వాత విదేశీ తయారీదారుకు లైసెన్స్ మంజూరు కావచ్చు."
    ],
    mr: [
      "उत्पादन श्रेणी परदेशी उत्पादक प्रमाणन योजनेअंतर्गत येते याची खात्री करा.",
      "आवश्यक कागदपत्रे आणि चाचणी अहवालांसह अर्ज सादर करा.",
      "BIS परदेशातील उत्पादन युनिटमध्ये कारखाना तपासणीची व्यवस्था करू शकते.",
      "BIS तपासणी आणि चाचणी माहितीचे मूल्यमापन करते.",
      "यशस्वी पुनरावलोकनानंतर परदेशी उत्पादकाला परवाना दिला जाऊ शकतो."
    ],
    gu: [
      "ખાતરી કરો કે ઉત્પાદન શ્રેણી વિદેશી ઉત્પાદક પ્રમાણન યોજના હેઠળ આવે છે.",
      "જરૂરી દસ્તાવેજો અને ટેસ્ટ રિપોર્ટ સાથે અરજી સબમિટ કરો.",
      "BIS વિદેશમાં આવેલા ઉત્પાદન એકમમાં ફેક્ટરી નિરીક્ષણની વ્યવસ્થા કરી શકે છે.",
      "BIS નિરીક્ષણ અને પરીક્ષણની માહિતીનું મૂલ્યાંકન કરે છે.",
      "સફળ સમીક્ષા પછી વિદેશી ઉત્પાદકને લાઇસન્સ આપવામાં આવી શકે છે."
    ],
    kn: [
      "ಉತ್ಪನ್ನ ವರ್ಗವು ವಿದೇಶಿ ತಯಾರಕರ ಪ್ರಮಾಣೀಕರಣ ಯೋಜನೆಯ ವ್ಯಾಪ್ತಿಯಲ್ಲಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      "ಅಗತ್ಯ ದಾಖಲೆಗಳು ಮತ್ತು ಪರೀಕ್ಷಾ ವರದಿಗಳೊಂದಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      "BIS ವಿದೇಶದ ತಯಾರಿಕಾ ಘಟಕದಲ್ಲಿ ಕಾರ್ಖಾನೆ ತಪಾಸಣೆಯನ್ನು ಏರ್ಪಡಿಸಬಹುದು.",
      "BIS ತಪಾಸಣೆ ಮತ್ತು ಪರೀಕ್ಷಾ ಮಾಹಿತಿಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ.",
      "ಯಶಸ್ವಿ ಪರಿಶೀಲನೆಯ ನಂತರ ವಿದೇಶಿ ತಯಾರಕರಿಗೆ ಪರವಾನಗಿ ನೀಡಬಹುದು."
    ]
  },

  "ECO Mark": {
    en: [
      "Check the applicable Indian Standard and environmental criteria for the product category.",
      "Prepare product and environmental test reports.",
      "Apply to BIS using the applicable process.",
      "BIS verifies compliance with quality and environmental requirements.",
      "After approval, the product may receive ECO Mark certification with the applicable quality standard."
    ],
    hi: [
      "उत्पाद श्रेणी के लिए लागू भारतीय मानक और पर्यावरणीय मानदंड देखें।",
      "उत्पाद और पर्यावरणीय परीक्षण रिपोर्ट तैयार करें।",
      "लागू प्रक्रिया के अनुसार BIS में आवेदन करें।",
      "BIS गुणवत्ता और पर्यावरणीय आवश्यकताओं के अनुपालन की जाँच करता है।",
      "स्वीकृति के बाद उत्पाद को लागू गुणवत्ता मानक के साथ ECO Mark प्रमाणन मिल सकता है।"
    ],
    ta: [
      "தயாரிப்பு வகைக்குப் பொருந்தும் இந்திய தரநிலை மற்றும் சுற்றுச்சூழல் அளவுகோல்களைச் சரிபார்க்கவும்.",
      "தயாரிப்பு மற்றும் சுற்றுச்சூழல் சோதனை அறிக்கைகளைத் தயாரிக்கவும்.",
      "பொருந்தும் செயல்முறையைப் பயன்படுத்தி BIS-இல் விண்ணப்பிக்கவும்.",
      "BIS தரம் மற்றும் சுற்றுச்சூழல் தேவைகளுடன் இணக்கத்தைச் சரிபார்க்கும்.",
      "ஒப்புதலுக்குப் பிறகு, பொருந்தும் தர நிலையுடன் தயாரிப்புக்கு ECO Mark சான்றிதழ் கிடைக்கலாம்."
    ],
    bn: [
      "পণ্যের বিভাগের জন্য প্রযোজ্য ভারতীয় মান ও পরিবেশগত মানদণ্ড দেখুন।",
      "পণ্য ও পরিবেশগত পরীক্ষার রিপোর্ট প্রস্তুত করুন।",
      "প্রযোজ্য প্রক্রিয়া অনুযায়ী BIS-এ আবেদন করুন।",
      "BIS গুণমান ও পরিবেশগত প্রয়োজনীয়তার সঙ্গে সামঞ্জস্য যাচাই করে।",
      "অনুমোদনের পর পণ্যটি প্রযোজ্য গুণমান মান সহ ECO Mark সার্টিফিকেশন পেতে পারে।"
    ],
    te: [
      "ఉత్పత్తి వర్గానికి వర్తించే భారతీయ ప్రమాణం మరియు పర్యావరణ ప్రమాణాలను తనిఖీ చేయండి.",
      "ఉత్పత్తి మరియు పర్యావరణ పరీక్ష నివేదికలను సిద్ధం చేయండి.",
      "వర్తించే ప్రక్రియ ద్వారా BIS కి దరఖాస్తు చేయండి.",
      "BIS నాణ్యత మరియు పర్యావరణ అవసరాల అనుసరణను ధృవీకరిస్తుంది.",
      "ఆమోదం తర్వాత ఉత్పత్తికి వర్తించే నాణ్యతా ప్రమాణంతో ECO Mark ధృవీకరణ లభించవచ్చు."
    ],
    mr: [
      "उत्पादन श्रेणीसाठी लागू भारतीय मानक आणि पर्यावरणीय निकष तपासा.",
      "उत्पादन आणि पर्यावरणीय चाचणी अहवाल तयार करा.",
      "लागू प्रक्रियेनुसार BIS कडे अर्ज करा.",
      "BIS गुणवत्ता आणि पर्यावरणीय आवश्यकतांच्या पूर्ततेची पडताळणी करते.",
      "मंजुरीनंतर उत्पादनाला लागू गुणवत्ता मानकासह ECO Mark प्रमाणन मिळू शकते."
    ],
    gu: [
      "ઉત્પાદન શ્રેણી માટે લાગુ ભારતીય ધોરણ અને પર્યાવરણીય માપદંડો તપાસો.",
      "ઉત્પાદન અને પર્યાવરણીય ટેસ્ટ રિપોર્ટ તૈયાર કરો.",
      "લાગુ પ્રક્રિયા દ્વારા BIS માં અરજી કરો.",
      "BIS ગુણવત્તા અને પર્યાવરણીય જરૂરિયાતોના પાલનની ચકાસણી કરે છે.",
      "મંજૂરી પછી ઉત્પાદનને લાગુ ગુણવત્તા ધોરણ સાથે ECO Mark પ્રમાણન મળી શકે છે."
    ],
    kn: [
      "ಉತ್ಪನ್ನ ವರ್ಗಕ್ಕೆ ಅನ್ವಯಿಸುವ ಭಾರತೀಯ ಮಾನದಂಡ ಮತ್ತು ಪರಿಸರ ಮಾನದಂಡಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
      "ಉತ್ಪನ್ನ ಮತ್ತು ಪರಿಸರ ಪರೀಕ್ಷಾ ವರದಿಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ.",
      "ಅನ್ವಯಿಸುವ ಪ್ರಕ್ರಿಯೆಯ ಮೂಲಕ BIS ಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
      "BIS ಗುಣಮಟ್ಟ ಮತ್ತು ಪರಿಸರ ಅಗತ್ಯಗಳ ಅನುಸರಣೆಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.",
      "ಅನುಮೋದನೆಯ ನಂತರ ಉತ್ಪನ್ನಕ್ಕೆ ಅನ್ವಯಿಸುವ ಗುಣಮಟ್ಟ ಮಾನದಂಡದೊಂದಿಗೆ ECO Mark ಪ್ರಮಾಣೀಕರಣ ಸಿಗಬಹುದು."
    ]
  }
};


/* =========================================================
   5. DOM ELEMENTS
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
   6. COMMON FUNCTIONS
   ========================================================= */

function getTranslation() {
  return translations[selectedLanguage] || translations.en;
}

// Translated UI string for the selected language, falling back to English.
function t(key) {
  const table = ui[selectedLanguage] || ui.en;
  return table[key] !== undefined ? table[key] : ui.en[key];
}

function showView(viewId) {
  const selectedView = document.getElementById(viewId);

  if (!selectedView) {
    return;
  }

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("show");
  });

  selectedView.classList.add("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getLanguageViewId() {
  const card = document.querySelector(".lang-card");
  const view = card ? card.closest(".view") : null;
  return view ? view.id : "view-language";
}

function addMessage(role, text, container = chatBox) {
  const message = document.createElement("div");

  message.className = `msg ${role}`;
  message.textContent = text;
  message.style.whiteSpace = "pre-line";

  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function isPlainEnter(event) {
  return event.key === "Enter" && !event.isComposing && event.keyCode !== 229;
}

function escapeHtml(value) {
  const temporaryElement = document.createElement("div");
  temporaryElement.textContent = value;
  return temporaryElement.innerHTML;
}


/* =========================================================
   7. LANGUAGE FUNCTIONS
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

// Translates static page text. Any element in index.html with
//   data-i18n="key"              -> its text is replaced
//   data-i18n-placeholder="key"  -> its placeholder is replaced
// is updated whenever the language changes.
function applyStaticText() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  document.documentElement.lang = selectedLanguage;
}

function setupLanguageCards() {
  const languageCards = document.querySelectorAll(".lang-card");
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
      applyStaticText();
    });
  });
}


/* =========================================================
   8. CHAT FUNCTIONS
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

  // Old search messages were in the previous language; start clean.
  if (searchBox) {
    searchBox.innerHTML = "";
  }

  const greeting = getTranslation().greeting;

  greeting.forEach((line, index) => {
    setTimeout(() => {
      if (runId !== chatRunId) {
        return;
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

const serviceIntents = [
  { key: "verify", pattern: /\b(verify|verification|hallmarks?|isi|huid)\b/ },
  { key: "search", pattern: /\b(search|is[\s-]?code|standards?)\b/ },
  { key: "complaints", pattern: /\b(complaints?|consumer)\b/ },
  { key: "manufacturer", pattern: /\b(manufacturers?|certification|scheme)\b/ }
];

function matchService(text) {
  if (/^[1-4]$/.test(text)) {
    return Object.keys(serviceMap)[Number(text) - 1];
  }

  for (const intent of serviceIntents) {
    if (intent.pattern.test(text)) {
      return intent.key;
    }
  }

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
   9. IS-CODE SEARCH
   ========================================================= */

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findIsCode(userText) {
  const searchText = userText.toLowerCase();

  return isCodeDB.find((entry) => {
    return entry.keywords.some((keyword) => {
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
      const categoryText =
        (categoryNames[match.category] &&
          (categoryNames[match.category][selectedLanguage] || categoryNames[match.category].en)) ||
        match.category;

      addMessage(
        "assistant",
        `${t("searchHeader")}\n\n` +
        `${t("code")}: ${match.code}\n` +
        `${t("title")}: ${match.title}\n` +
        `${t("category")}: ${categoryText}\n\n` +
        `${t("searchImportant")}`,
        searchBox
      );

      return;
    }

    addMessage("assistant", t("searchNone"), searchBox);
  }, 400);
}


/* =========================================================
   10. VERIFY FEATURE
   ========================================================= */

function verifyLicense() {
  const input = document.getElementById("verify-input");
  const resultBox = document.getElementById("verify-result");
  const value = input.value.trim();

  resultBox.classList.remove("error");
  resultBox.style.display = "block";

  if (!value) {
    resultBox.classList.add("error");
    resultBox.innerHTML = `<div class="title">${escapeHtml(t("verifyEmpty"))}</div>`;
    return;
  }

  resultBox.innerHTML =
    `<div class="title">${escapeHtml(t("verifyTitle"))}</div>` +
    `<div style="margin-top: 6px;">${escapeHtml(t("verifyEntered"))} <strong>${escapeHtml(value)}</strong></div>` +
    `<div style="margin-top: 6px;">${escapeHtml(t("verifyNote"))}</div>`;
}


/* =========================================================
   11. COMPLAINT FEATURE
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
    resultBox.innerHTML = `<div class="title">${escapeHtml(t("complaintEmpty"))}</div>`;
    return;
  }

  const trackingId = `BIS-CMP-${Math.floor(100000 + Math.random() * 900000)}`;

  resultBox.classList.remove("error");
  resultBox.style.display = "block";

  resultBox.innerHTML =
    `<div class="title">${escapeHtml(t("complaintCreated"))}</div>` +
    `<div style="margin-top: 6px;">${escapeHtml(t("tracking"))} <strong>${trackingId}</strong></div>` +
    `<div style="margin-top: 6px;">${escapeHtml(t("product"))} ${escapeHtml(product)}</div>` +
    `<div>${escapeHtml(t("issue"))} ${escapeHtml(issue)}</div>` +
    `<div style="margin-top: 8px;">${escapeHtml(t("complaintNote"))}</div>`;

  document.getElementById("complaint-form").reset();
}


/* =========================================================
   12. MANUFACTURER SCHEMES
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
      const byLang = schemeSteps[schemeName] || {};
      const steps = byLang[selectedLanguage] || byLang.en || [];

      const stepsHtml = steps
        .map((step) => `<li>${escapeHtml(step)}</li>`)
        .join("");

      detailBox.innerHTML =
        `<div class="title">${escapeHtml(schemeName)} — ${escapeHtml(t("stepsTitle"))}</div>` +
        `<ol>${stepsHtml}</ol>`;

      detailBox.style.display = "block";
    });
  });
}


/* =========================================================
   13. MODAL FUNCTIONS
   ========================================================= */

function openModal(key) {
  if (!["about", "privacy", "contact"].includes(key)) {
    return;
  }

  document.getElementById("modal-title").textContent = t(key);
  document.getElementById("modal-body").textContent = t(`${key}Body`);

  modalOverlay.classList.add("show");
}

function closeModal() {
  modalOverlay.classList.remove("show");
}


/* =========================================================
   14. EVENT LISTENERS
   ========================================================= */

function setupEventListeners() {
  document.getElementById("continue-btn").addEventListener("click", () => {
    applyStaticText();
    showView("view-chat");

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
    alert(t("voiceMsg"));
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
  applyStaticText();
  setupSchemeCards();
  setupEventListeners();

  showView(getLanguageViewId());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}