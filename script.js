// Current language state
let currentLanguage = localStorage.getItem('bis_language') || 'hi';

// Function to translate all elements on page
function applyTranslations(language) {
  // Update all elements with data-key attribute
  document.querySelectorAll('[data-key]').forEach(element => {
    const key = element.getAttribute('data-key');
    if (translations[language] && translations[language][key]) {
      // For input/textarea placeholders
      if (element.hasAttribute('data-placeholder')) {
        element.placeholder = translations[language][key];
      } else {
        element.textContent = translations[language][key];
      }
    }
  });

  // Update placeholder attributes for inputs with data-placeholder
  document.querySelectorAll('[data-placeholder]').forEach(element => {
    const key = element.getAttribute('data-placeholder');
    if (translations[language] && translations[language][key]) {
      element.placeholder = translations[language][key];
    }
  });

  // Update option texts in select elements
  document.querySelectorAll('option[data-key]').forEach(option => {
    const key = option.getAttribute('data-key');
    if (translations[language] && translations[language][key]) {
      option.textContent = translations[language][key];
    }
  });

  // Update button texts that have data-key
  document.querySelectorAll('button[data-key]').forEach(button => {
    const key = button.getAttribute('data-key');
    if (translations[language] && translations[language][key]) {
      button.textContent = translations[language][key];
    }
  });

  // Store language preference
  currentLanguage = language;
  localStorage.setItem('bis_language', language);
}

// Language selection
document.querySelectorAll('.lang-card').forEach(card => {
  card.addEventListener('click', function() {
    document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    
    const selectedLang = this.getAttribute('data-lang');
    const continueBtn = document.getElementById('continue-btn');
    
    // Update continue button subtitle
    const continueSub = document.getElementById('continue-sub');
    if (translations[selectedLang] && translations[selectedLang]['continue-sub']) {
      continueSub.textContent = translations[selectedLang]['continue-sub'];
    }
  });
});

// Continue button - switch to chat and apply translations
document.getElementById('continue-btn').addEventListener('click', function() {
  const selectedCard = document.querySelector('.lang-card.selected');
  const selectedLang = selectedCard.getAttribute('data-lang');
  
  applyTranslations(selectedLang);
  
  // Switch view to chat
  showView('view-chat');
});

// Navigation between views
function showView(viewId) {
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('show');
  });
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('show');
  }
}

// Back buttons
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetView = this.getAttribute('data-back');
    showView(targetView);
  });
});

// Chat functionality (placeholder - integrate with your actual chat system)
document.getElementById('chat-send').addEventListener('click', function() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (message) {
    // Add message to chat
    const chatBox = document.getElementById('chat-box');
    
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);
    
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Here you would send to your backend/AI service
  }
});

// Enter key to send message
document.getElementById('chat-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('chat-send').click();
  }
});

// Search functionality
document.getElementById('search-send').addEventListener('click', function() {
  const input = document.getElementById('search-input');
  const message = input.value.trim();
  
  if (message) {
    const chatBox = document.getElementById('search-chat-box');
    
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.textContent = message;
    chatBox.appendChild(userMsg);
    
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});

document.getElementById('search-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('search-send').click();
  }
});

// Verify section
document.getElementById('verify-btn').addEventListener('click', function() {
  const input = document.getElementById('verify-input');
  const value = input.value.trim();
  
  if (value) {
    const resultBox = document.getElementById('verify-result');
    resultBox.innerHTML = `<div class="result-message">Verifying: ${value}</div>`;
    input.value = '';
  }
});

// Complaint form
document.getElementById('complaint-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const product = document.getElementById('complaint-product').value;
  const issue = document.getElementById('complaint-issue').value;
  const desc = document.getElementById('complaint-desc').value;
  
  const resultBox = document.getElementById('complaint-result');
  resultBox.innerHTML = `<div class="result-message">Thank you for reporting. Your complaint has been noted.</div>`;
  
  this.reset();
});

// Manufacturer schemes
document.querySelectorAll('.scheme-card').forEach(card => {
  card.addEventListener('click', function() {
    const scheme = this.getAttribute('data-scheme');
    const detailBox = document.getElementById('scheme-detail');
    
    detailBox.innerHTML = `
      <div class="scheme-info">
        <h4>${scheme}</h4>
        <p>Scheme details for ${scheme} would be displayed here.</p>
      </div>
    `;
  });
});

// Footer buttons
document.getElementById('footer-about').addEventListener('click', function() {
  showModal('About BIS Saathi', 'This is the Bureau of Indian Standards AI Assistant - BIS Saathi.');
});

document.getElementById('footer-privacy').addEventListener('click', function() {
  showModal('Privacy Policy', 'Your data is protected according to our privacy policy.');
});

document.getElementById('footer-contact').addEventListener('click', function() {
  showModal('Contact Us', 'Contact: bis.gov.in');
});

// Modal functionality
function showModal(title, content) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').textContent = content;
  document.getElementById('modal-overlay').classList.add('show');
}

document.getElementById('modal-close').addEventListener('click', function() {
  document.getElementById('modal-overlay').classList.remove('show');
});

document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('show');
  }
});

// Initial language setup on page load
window.addEventListener('load', function() {
  // Set the language card as selected based on saved preference
  const savedLang = localStorage.getItem('bis_language') || 'hi';
  const langCard = document.querySelector(`[data-lang="${savedLang}"]`);
  if (langCard) {
    langCard.click();
  }
});