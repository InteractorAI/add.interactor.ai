import './style.css'

declare global {
  interface Window {
    interactor?: {
      initialize: (id: string, config?: Record<string, unknown>) => void
      modal?: { open: () => void }
      message?: { send: (message: string, options?: Record<string, unknown>) => void }
      fabPresets?: Record<string, unknown>
    }
  }
}

const DEFAULT_INTERACTOR_ID = 'interactor'
const SKILL_URL = 'https://add.interactor.ai/skill.md'
const AGENT_PROMPT = `Read ${SKILL_URL} and get me set up with Interactor`

const copyIcon = `
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
`

const checkIcon = `
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
    <path d="m20 6-11 11-5-5"></path>
  </svg>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Toggle light mode">
    <span id="theme-toggle-label">Light</span>
  </button>

  <main class="page-shell">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <div class="brand-lockup" aria-label="Interactor">
          <img src="/favicon.svg" alt="" />
          <span>Interactor</span>
        </div>
        <h1 id="hero-title">Add Interactor <span class="heading-nowrap">to your site.</span></h1>
        <p class="hero-subtitle">
          Use the agent-ready skill file or copy the embed snippets below to install the Interactor chat widget.
        </p>
      </div>

      <div class="terminal-panel" aria-label="Agent setup">
        <div class="terminal-body">
          <p>Tell your agent to:</p>
          <div class="prompt-card">
            <code>${AGENT_PROMPT}</code>
            <button class="icon-copy copy-prompt" type="button" data-copy="${AGENT_PROMPT}" aria-label="Copy agent instruction">
              ${copyIcon}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="setup-grid" aria-label="Interactor setup options">
      <article class="setup-panel">
        <h2>Live preview</h2>
        <p>Try a known Interactor ID, switch layouts, and open the embedded chat.</p>

        <label class="field-label" for="interactor-id">Interactor ID</label>
        <div class="input-group">
          <input type="text" id="interactor-id" value="${DEFAULT_INTERACTOR_ID}" spellcheck="false">
          <button id="set-btn" type="button">Set</button>
        </div>

        <div class="control-block">
          <span class="field-label">View type</span>
          <div class="segmented-control">
            <input type="radio" id="view-sidebar" name="view-type" value="sidebar" class="sr-only" checked>
            <label for="view-sidebar">Sidebar</label>

            <input type="radio" id="view-mobile" name="view-type" value="mobile" class="sr-only">
            <label for="view-mobile">Pop up</label>
          </div>
        </div>

        <div class="control-block">
          <span class="field-label">Button style</span>
          <div class="segmented-control">
            <input type="radio" id="style-simple" name="fab-style" value="simple" class="sr-only" checked>
            <label for="style-simple">Simple</label>

            <input type="radio" id="style-concierge" name="fab-style" value="concierge" class="sr-only">
            <label for="style-concierge">Concierge</label>
          </div>
        </div>

        <div class="action-row">
          <button id="btn-open-chat" type="button">Open Interactor</button>
          <button id="btn-schedule" type="button" class="secondary-btn">Send message</button>
        </div>
      </article>

      <article class="setup-panel skill-panel">
        <h2>What the skill contains</h2>
        <ul>
          <li>Embed script and stylesheet URLs</li>
          <li>Initialization patterns for sidebar and pop-up views</li>
          <li>Custom trigger examples using <code>window.interactor.modal.open()</code></li>
          <li>A short implementation checklist for agents</li>
        </ul>
        <a class="text-link" href="/skill.md">Open skill.md</a>
      </article>
    </section>

    <section class="docs-card" aria-labelledby="manual-title">
      <div class="docs-header">
        <h2 id="manual-title">Manual embed reference</h2>
        <p>For developers who want to wire it in themselves.</p>
      </div>

      <div class="docs-content">
        <div class="step">
          <div class="step-number">1</div>
          <div>
            <h3>Add Interactor assets</h3>
            <p>Add these to your HTML head or app shell.</p>
            <div class="code-wrapper">
              <button class="icon-copy copy-code" type="button" aria-label="Copy asset snippet">${copyIcon}</button>
              <pre><code>&lt;<span class="code-tag">script</span> <span class="code-attr">type</span>=<span class="code-string">"module"</span> <span class="code-attr">crossorigin</span> <span class="code-attr">src</span>=<span class="code-string">"https://embed.interactor.ai/assets/index.js"</span> <span class="code-attr">defer</span>&gt;&lt;/<span class="code-tag">script</span>&gt;
&lt;<span class="code-tag">link</span> <span class="code-attr">rel</span>=<span class="code-string">"stylesheet"</span> <span class="code-attr">crossorigin</span> <span class="code-attr">href</span>=<span class="code-string">"https://embed.interactor.ai/assets/index.css"</span> /&gt;</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">2</div>
          <div>
            <h3>Initialize the chat</h3>
            <p>Use the ID for the Interactor you want to embed.</p>
            <div class="code-wrapper">
              <button class="icon-copy copy-code" type="button" aria-label="Copy initialization snippet">${copyIcon}</button>
              <pre><code>&lt;<span class="code-tag">script</span>&gt;
  <span class="code-keyword">window</span>.addEventListener(<span class="code-string">'load'</span>, () =&gt; {
    <span class="code-keyword">window</span>.interactor.initialize(<span class="code-string">'<span class="dynamic-id-code">${DEFAULT_INTERACTOR_ID}</span>'</span>, {
      <span class="code-property">type</span>: <span class="code-string">'sidebar'</span>,
      <span class="code-property">isOpen</span>: <span class="code-keyword">false</span>,
      <span class="code-property">isFabVisible</span>: <span class="code-keyword">true</span>
    })
  })
&lt;/<span class="code-tag">script</span>&gt;</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div>
            <h3>Advanced control</h3>
            <p>Use your own button or send context into the chat from the page.</p>

            <h4>Custom button</h4>
            <p>Hide the default Interactor button when you want to use your own.</p>
            <div class="code-wrapper">
              <button class="icon-copy copy-code" type="button" aria-label="Copy custom button snippet">${copyIcon}</button>
              <pre><code><span class="code-comment">// 1. Initialize without the default floating button</span>
<span class="code-keyword">window</span>.interactor.initialize(<span class="code-string">'<span class="dynamic-id-code">${DEFAULT_INTERACTOR_ID}</span>'</span>, {
  <span class="code-property">isFabVisible</span>: <span class="code-keyword">false</span>
})

<span class="code-comment">// 2. Open chat from your own button handler</span>
<span class="code-keyword">window</span>.interactor.modal.open()</code></pre>
            </div>

            <h4>Send messages</h4>
            <p>Send page events or user intent into the conversation.</p>
            <div class="code-wrapper">
              <button class="icon-copy copy-code" type="button" aria-label="Copy message snippet">${copyIcon}</button>
              <pre><code><span class="code-comment">// Opens the chat and sends a message</span>
<span class="code-keyword">window</span>.interactor.message.send(<span class="code-string">'I would like help with this page'</span>)

<span class="code-comment">// Send background context without opening chat</span>
<span class="code-keyword">window</span>.interactor.message.send(<span class="code-string">'Added product to cart'</span>, {
  <span class="code-property">shouldOpenChat</span>: <span class="code-keyword">false</span>
})</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
`

const updateCodeSnippets = (id: string) => {
  document.querySelectorAll('.dynamic-id-code').forEach((element) => {
    element.textContent = id
  })
}

const getParams = () => {
  const params = new URLSearchParams(window.location.search)

  return {
    id: params.get('id') || DEFAULT_INTERACTOR_ID,
    type: (params.get('type') || 'sidebar') as 'sidebar' | 'mobile',
    fabStyle: (params.get('fabStyle') || 'simple') as 'concierge' | 'simple',
    success: params.get('success') === 'true',
  }
}

const updateUrl = (id: string, type: string, fabStyle: string, reload = false) => {
  const url = new URL(window.location.href)
  url.searchParams.set('id', id)
  url.searchParams.set('type', type)
  url.searchParams.set('fabStyle', fabStyle)

  if (reload) {
    url.searchParams.set('success', 'true')
    window.location.href = url.toString()
    return
  }

  window.history.replaceState({}, '', url)
}

const getCurrentTheme = () => document.documentElement.classList.contains('light-mode') ? 'light' : 'dark'

const updateThemeToggle = () => {
  const label = document.getElementById('theme-toggle-label')
  const toggle = document.getElementById('theme-toggle')
  const isLight = getCurrentTheme() === 'light'

  if (label) label.textContent = isLight ? 'Dark' : 'Light'
  if (toggle) toggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`)
}

const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.classList.toggle('light-mode', theme === 'light')
  localStorage.setItem('theme', theme)
  updateThemeToggle()
}

const initInteractor = (id: string, type: 'sidebar' | 'mobile', fabStyle: 'concierge' | 'simple') => {
  updateCodeSnippets(id)

  if (!window.interactor) {
    console.error('Interactor not found on window object')
    return
  }

  const config: Record<string, unknown> = {
    type,
    theme: getCurrentTheme(),
    isOpen: false,
    isFabVisible: true,
    onOpen: (layout: unknown) => console.log('Chat opened', layout),
    onClose: () => console.log('Chat closed'),
  }

  if (fabStyle === 'concierge' && window.interactor.fabPresets?.concierge) {
    config.fabConfig = window.interactor.fabPresets.concierge
  }

  window.interactor.initialize(id, config)
}

const getCurrentFormState = () => {
  const idInput = document.getElementById('interactor-id') as HTMLInputElement
  const typeInput = document.querySelector<HTMLInputElement>('input[name="view-type"]:checked')
  const styleInput = document.querySelector<HTMLInputElement>('input[name="fab-style"]:checked')

  return {
    id: idInput.value.trim() || DEFAULT_INTERACTOR_ID,
    type: (typeInput?.value || 'sidebar') as 'sidebar' | 'mobile',
    fabStyle: (styleInput?.value || 'simple') as 'concierge' | 'simple',
  }
}

const showCopiedState = (button: HTMLButtonElement) => {
  const originalMarkup = button.innerHTML
  button.innerHTML = checkIcon
  button.classList.add('copied')

  window.setTimeout(() => {
    button.innerHTML = originalMarkup
    button.classList.remove('copied')
  }, 1400)
}

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

const bindCopyButtons = () => {
  document.querySelectorAll<HTMLButtonElement>('[data-copy], .copy-code').forEach((button) => {
    button.addEventListener('click', async () => {
      const explicitText = button.dataset.copy
      const codeText = button.parentElement?.querySelector('code')?.innerText
      const text = explicitText || codeText

      if (!text) return

      await copyToClipboard(text)
      showCopiedState(button)
    })
  })
}

const handleSet = () => {
  const { id, type, fabStyle } = getCurrentFormState()
  updateUrl(id, type, fabStyle, true)
}

const handleRadioChange = () => {
  const { id, type, fabStyle } = getCurrentFormState()
  updateUrl(id, type, fabStyle)
  initInteractor(id, type, fabStyle)
}

window.addEventListener('load', () => {
  const { id, type, fabStyle, success } = getParams()
  applyTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark')

  const idInput = document.getElementById('interactor-id') as HTMLInputElement
  const typeRadio = document.querySelector<HTMLInputElement>(`input[name="view-type"][value="${type}"]`)
  const styleRadio = document.querySelector<HTMLInputElement>(`input[name="fab-style"][value="${fabStyle}"]`)

  idInput.value = id
  if (typeRadio) typeRadio.checked = true
  if (styleRadio) styleRadio.checked = true

  initInteractor(id, type, fabStyle)

  if (success) {
    const setButton = document.getElementById('set-btn') as HTMLButtonElement
    setButton.classList.add('success')
    setButton.textContent = 'Set'

    const url = new URL(window.location.href)
    url.searchParams.delete('success')
    window.history.replaceState({}, '', url)

    window.setTimeout(() => setButton.classList.remove('success'), 1400)
  }
})

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const nextTheme = getCurrentTheme() === 'light' ? 'dark' : 'light'
  const { id, type, fabStyle } = getCurrentFormState()

  applyTheme(nextTheme)
  initInteractor(id, type, fabStyle)
})

document.getElementById('set-btn')?.addEventListener('click', handleSet)
document.getElementById('interactor-id')?.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') handleSet()
})

document.querySelectorAll<HTMLInputElement>('input[name="view-type"], input[name="fab-style"]').forEach((radio) => {
  radio.addEventListener('change', handleRadioChange)
})

document.getElementById('btn-open-chat')?.addEventListener('click', () => {
  window.interactor?.modal?.open()
})

document.getElementById('btn-schedule')?.addEventListener('click', () => {
  window.interactor?.message?.send('I would like to schedule a call')
})

bindCopyButtons()
