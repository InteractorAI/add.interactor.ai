import './style.css'

declare global {
  interface Window {
    interactor: any;
  }
}

const DEFAULT_INTERACTOR_ID = 'interactor';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="theme-toggle-container" style="position: absolute; top: 1rem; right: 1rem;">
    <button id="theme-btn" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; padding: 0.5rem; color: var(--text-color);">
      <span id="theme-icon">☾</span>
    </button>
  </div>
  <div>
    <h1>Embed Your Interactor</h1>
    <p>Play with the Interactor embed options below.</p>
    
    <div class="card">
      <label for="interactor-id" style="display: block; margin-bottom: 0.8rem; font-weight: 600; text-align: left;">Interactor ID</label>
      
      <div class="input-group">
        <input type="text" id="interactor-id" value="${DEFAULT_INTERACTOR_ID}" spellcheck="false">
        <button id="set-btn">Set</button>
      </div>
      
      <div style="text-align: left; margin-bottom: 1.5rem;">
          <label style="font-weight: 600; display: block; margin-bottom: 0.8rem;">View Type</label>
        <div class="view-options">
          <input type="radio" id="view-sidebar" name="view-type" value="sidebar" class="sr-only" checked>
          <label for="view-sidebar" class="option-btn">Sidebar</label>
          
          <input type="radio" id="view-mobile" name="view-type" value="mobile" class="sr-only">
          <label for="view-mobile" class="option-btn">Pop Up</label>
          <div class="slider"></div>
        </div>
      </div>

      <div style="text-align: left;">
        <label style="font-weight: 600; display: block; margin-bottom: 0.8rem;">Button Style</label>
        <div class="view-options">
          <input type="radio" id="style-simple" name="fab-style" value="simple" class="sr-only" checked>
          <label for="style-simple" class="option-btn">Simple</label>

          <input type="radio" id="style-concierge" name="fab-style" value="concierge" class="sr-only">
          <label for="style-concierge" class="option-btn">Concierge</label>
          <div class="slider"></div>
        </div>
      </div>

      <div style="text-align: left; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1);">
        <label style="font-weight: 600; display: block; margin-bottom: 0.8rem;">Custom Triggers</label>
        <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <button id="btn-open-chat" style="background-color: #4a5568;">Open Interactor</button>
          <button id="btn-schedule" style="background-color: #4a5568;">Message Interactor</button>
        </div>
      </div>
    </div>
    </div>
  </div>

  <div class="card docs-card">
    <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <h2 style="margin: 0; font-size: 1.5rem;">Interactor Embed Guide</h2>
    </div>
    <div class="docs-content">
      <div class="step">
        <div class="step-number">1</div>
        <h3>Add Interactor to your site</h3>
        <p>Add these two lines to your HTML (usually in <code>&lt;head&gt;</code> or before <code>&lt;/body&gt;</code>):</p>
        <div class="code-wrapper">
          <button class="copy-btn" title="Copy code">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
          <div class="code-block">
&lt;<span class="code-tag">script</span> <span class="code-attr">type</span>=<span class="code-string">"module"</span> <span class="code-attr">crossorigin</span> <span class="code-attr">src</span>=<span class="code-string">"https://embed.interactor.ai/assets/index.js"</span> <span class="code-attr">defer</span>&gt;&lt;/<span class="code-tag">script</span>&gt;<br>
&lt;<span class="code-tag">link</span> <span class="code-attr">rel</span>=<span class="code-string">"stylesheet"</span> <span class="code-attr">crossorigin</span> <span class="code-attr">href</span>=<span class="code-string">"https://embed.interactor.ai/assets/index.css"</span> /&gt;
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-number">2</div>
        <h3>Initialize Interactor</h3>
        
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-top: 0; margin-bottom: 0.8rem; font-size: 1rem; color: var(--accent-color);">Variant A: Mobile View (Pop Up)</h4>
          <p>The standard way to embed Interactor as a mobile-optimized modal:</p>
          <div class="code-wrapper">
            <button class="copy-btn" title="Copy code">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <div class="code-block">
&lt;<span class="code-tag">script</span>&gt;<br>
&nbsp;&nbsp;<span class="code-keyword">window</span>.addEventListener(<span class="code-string">'load'</span>, () => {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">window</span>.interactor.initialize(<span class="code-string">'<span class="dynamic-id-code">${DEFAULT_INTERACTOR_ID}</span>'</span>)<br>
&nbsp;&nbsp;})<br>
&lt;/<span class="code-tag">script</span>&gt;
            </div>
          </div>
        </div>

        <div>
          <h4 style="margin-top: 0; margin-bottom: 0.8rem; font-size: 1rem; color: var(--accent-color);">Variant B: Sidebar View</h4>
          <p>Embed as a sidebar with callbacks to react to visibility changes:</p>
          <div class="code-wrapper" style="margin-bottom: 1rem;">
            <button class="copy-btn" title="Copy code">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <div class="code-block">
&lt;<span class="code-tag">script</span>&gt;<br>
&nbsp;&nbsp;<span class="code-keyword">window</span>.addEventListener(<span class="code-string">'load'</span>, () => {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">window</span>.interactor.initialize(<span class="code-string">'<span class="dynamic-id-code">${DEFAULT_INTERACTOR_ID}</span>'</span>, {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: <span class="code-string">'sidebar'</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isOpen: <span class="code-keyword">true</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onOpen: ($chat) => {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment">// Sidebar is open</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onClose: () => {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-comment">// Sidebar is closed</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>
&nbsp;&nbsp;&nbsp;&nbsp;})<br>
&nbsp;&nbsp;})<br>
&lt;/<span class="code-tag">script</span>&gt;
            </div>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-number">3</div>
        <h3>Advanced Control</h3>
        
        <div style="margin-bottom: 2rem;">
          <h4 style="margin-top: 0; margin-bottom: 0.8rem; font-size: 1rem; color: var(--accent-color);">Custom Triggers</h4>
          <p>Hide the default button and use your own:</p>
          <div class="code-wrapper">
            <button class="copy-btn" title="Copy code">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <div class="code-block">
<span class="code-comment">// 1. Initialize with isFabVisible: false</span><br>
<span class="code-keyword">window</span>.interactor.initialize(<span class="code-string">'<span class="dynamic-id-code">${DEFAULT_INTERACTOR_ID}</span>'</span>, { isFabVisible: <span class="code-keyword">false</span> });<br><br>
<span class="code-comment">// 2. Open chat from your button handler</span><br>
<span class="code-keyword">window</span>.interactor.modal.open();
            </div>
          </div>
        </div>

        <div>
          <h4 style="margin-top: 0; margin-bottom: 0.8rem; font-size: 1rem; color: var(--accent-color);">Send background messages</h4>
          <p>Interact with the chat programmatically without necessarily opening it:</p>
          <div class="code-wrapper">
            <button class="copy-btn" title="Copy code">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <div class="code-block">
<span class="code-keyword">window</span>.interactor.message.send(<span class="code-string">'Added product to cart'</span>, { shouldOpenChat: <span class="code-keyword">false</span> });
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`


const updateCodeSnippets = (id: string) => {
  document.querySelectorAll('.dynamic-id-display').forEach(el => {
    el.textContent = id;
  });
  document.querySelectorAll('.dynamic-id-code').forEach(el => {
    el.textContent = id;
  });
};

const initInteractor = (id: string, type: 'sidebar' | 'mobile', fabStyle: 'concierge' | 'simple') => {
  // Update docs whenever we init a new ID
  updateCodeSnippets(id);

  if (window.interactor) {
    console.log(`Initializing interactor with ID: ${id}, Type: ${type}, Style: ${fabStyle}`);

    const config: any = {
      type: type,
      theme: (document.documentElement.classList.contains('light-mode') ? 'light' : 'dark'),
      isOpen: false,
      isFabVisible: true,
      onOpen: (layout: any) => {
        console.log('Chat opened', layout)
      },
      onClose: () => {
        console.log('Chat closed')
      },
    };

    if (fabStyle === 'concierge' && window.interactor.fabPresets) {
      config.fabConfig = window.interactor.fabPresets.concierge;
    } else if (fabStyle === 'concierge' && !window.interactor.fabPresets) {
      console.warn('Interactor fabPresets not found, falling back to default');
    }
    // For 'simple' style, we explicitly do not set fabConfig, or set it to undefined if needed.
    // Assuming a fresh init or overwrite, omitting it or setting to null/undefined should work.
    // We'll set it to undefined to be explicit about "no config".
    else {
      config.fabConfig = undefined;
    }

    window.interactor.initialize(id, config);
  } else {
    console.error('Interactor not found on window object')
  }
}

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get('id') || DEFAULT_INTERACTOR_ID,
    type: (params.get('type') || 'sidebar') as 'sidebar' | 'mobile',
    fabStyle: (params.get('fabStyle') || 'simple') as 'concierge' | 'simple',
    success: params.get('success') === 'true'
  };
};

const updateUrl = (id: string, type: string, fabStyle: string, reload: boolean = false) => {
  const url = new URL(window.location.href);
  url.searchParams.set('id', id);
  url.searchParams.set('type', type);
  url.searchParams.set('fabStyle', fabStyle);

  if (reload) {
    url.searchParams.set('success', 'true');
    window.location.href = url.toString();
  } else {
    window.history.replaceState({}, '', url);
  }
};

const showSuccessFeedback = () => {
  const setBtn = document.getElementById('set-btn') as HTMLButtonElement;
  if (setBtn) {
    const originalText = setBtn.innerText;
    setBtn.innerText = '✓';
    setBtn.classList.add('success');

    setTimeout(() => {
      setBtn.innerText = originalText;
      setBtn.classList.remove('success');
    }, 2000);
  }
};

// Initialize on load
window.addEventListener('load', () => {
  const { id, type, fabStyle, success } = getParams();

  // Set input values
  const idInput = document.getElementById('interactor-id') as HTMLInputElement;
  if (idInput) idInput.value = id;

  const typeRadio = document.querySelector(`input[name="view-type"][value="${type}"]`) as HTMLInputElement;
  if (typeRadio) typeRadio.checked = true;

  const styleRadio = document.querySelector(`input[name="fab-style"][value="${fabStyle}"]`) as HTMLInputElement;
  if (styleRadio) styleRadio.checked = true;

  // Initialize
  initInteractor(id, type, fabStyle);

  // Show feedback if this was a reload from "Set"
  if (success) {
    showSuccessFeedback();
    // Clean up success param
    const url = new URL(window.location.href);
    url.searchParams.delete('success');
    window.history.replaceState({}, '', url);
  }
});

// Handle Set (Reloads page)
const handleSet = () => {
  const idInput = document.getElementById('interactor-id') as HTMLInputElement;
  const typeInput = document.querySelector('input[name="view-type"]:checked') as HTMLInputElement;
  const styleInput = document.querySelector('input[name="fab-style"]:checked') as HTMLInputElement;

  if (idInput && typeInput && styleInput) {
    updateUrl(idInput.value.trim(), typeInput.value, styleInput.value, true);
  }
};

// Theme Toggle Logic
const toggleTheme = () => {
  const isLight = document.documentElement.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon(isLight);

  // Re-init Interactor with new theme
  const { id, type, fabStyle } = getParams();
  initInteractor(id, type, fabStyle);
};

const updateThemeIcon = (isLight: boolean) => {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = isLight ? '☾' : '☀'; // Moon for dark mode (to switch back), Sun for light mode? Wait.
    // Usually: Sun icon implies "Switch to Light", Moon implies "Switch to Dark".
    // If currently Dark (default), we show Sun. If Light, we show Moon.
    icon.textContent = isLight ? '☾' : '☀';
  }
};

window.addEventListener('load', () => {
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Check saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light-mode');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }
});

document.getElementById('set-btn')?.addEventListener('click', handleSet);
document.getElementById('interactor-id')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSet();
});

// Handle Radio Changes (Live update + URL update without reload)
const handleRadioChange = () => {
  const idInput = document.getElementById('interactor-id') as HTMLInputElement;
  const typeInput = document.querySelector('input[name="view-type"]:checked') as HTMLInputElement;
  const styleInput = document.querySelector('input[name="fab-style"]:checked') as HTMLInputElement;

  if (idInput && typeInput && styleInput) {
    const id = idInput.value.trim();
    const type = typeInput.value as 'sidebar' | 'mobile';
    const fabStyle = styleInput.value as 'concierge' | 'simple';

    updateUrl(id, type, fabStyle, false);
    initInteractor(id, type, fabStyle);
  }
};

document.querySelectorAll('input[name="view-type"]').forEach(radio => {
  radio.addEventListener('change', handleRadioChange);
});


document.querySelectorAll('input[name="fab-style"]').forEach(radio => {
  radio.addEventListener('change', handleRadioChange);
});

// Helper for clipboard copying with fallback for non-secure contexts
const copyToClipboard = (text: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    return new Promise((resolve, reject) => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) resolve();
        else reject(new Error('Copy failed'));
      } catch (err) {
        reject(err);
      }
    });
  }
};

// Copy Button Logic
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget as HTMLButtonElement;
    const codeBlock = target.nextElementSibling as HTMLElement;

    if (codeBlock) {
      const textToCopy = codeBlock.innerText;

      copyToClipboard(textToCopy).then(() => {
        // Success icon (Checkmark)
        target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        target.style.color = '#10b981';
        target.style.borderColor = '#10b981';

        setTimeout(() => {
          // Revert to Copy icon
          target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
          target.style.color = '';
          target.style.borderColor = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code:', err);
      });
    }
  });
});


// Custom Triggers Handlers
// Custom Triggers Handlers
document.getElementById('btn-open-chat')?.addEventListener('click', () => {
  if (window.interactor) {
    // Correct API: window.interactor.modal.open()
    if (window.interactor.modal && typeof window.interactor.modal.open === 'function') {
      window.interactor.modal.open();
    } else {
      console.log('Interactor API: modal.open() not found');
    }
  }
});

document.getElementById('btn-schedule')?.addEventListener('click', () => {
  if (window.interactor) {
    // Correct API: window.interactor.message.send()
    // The send method automatically opens the chat by default, but we can be explicit if we want.
    // window.interactor.modal.open(); 

    if (window.interactor.message && typeof window.interactor.message.send === 'function') {
      window.interactor.message.send("I'd like to schedule a call");
    } else {
      console.log('Interactor API: message.send() not found');
    }
  }
});
