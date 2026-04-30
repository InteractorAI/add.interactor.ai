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
  <main class="page-shell">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Interactor setup for agents</p>
        <h1 id="hero-title">Point your developer agent at one file.</h1>
        <p class="hero-subtitle">
          The skill file gives Codex, Cursor, Claude Code, and other agents the exact install path for adding Interactor to a site.
        </p>
      </div>

      <div class="terminal-panel" aria-label="Get started">
        <div class="terminal-title">Get started</div>
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
              <pre><code>&lt;script type="module" crossorigin src="https://embed.interactor.ai/assets/index.js" defer&gt;&lt;/script&gt;
&lt;link rel="stylesheet" crossorigin href="https://embed.interactor.ai/assets/index.css" /&gt;</code></pre>
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
              <pre><code>&lt;script&gt;
  window.addEventListener('load', () =&gt; {
    window.interactor.initialize('<span class="dynamic-id-code">${DEFAULT_INTERACTOR_ID}</span>', {
      type: 'sidebar',
      isOpen: false,
      isFabVisible: true
    })
  })
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>

        <div class="step">
          <div class="step-number">3</div>
          <div>
            <h3>Use custom triggers</h3>
            <p>Hide the default button when your own UI should open Interactor.</p>
            <div class="code-wrapper">
              <button class="icon-copy copy-code" type="button" aria-label="Copy trigger snippet">${copyIcon}</button>
              <pre><code>window.interactor.initialize('<span class="dynamic-id-code">${DEFAULT_INTERACTOR_ID}</span>', {
  isFabVisible: false
})

window.interactor.modal.open()
window.interactor.message.send('I would like help with this page')</code></pre>
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

const initInteractor = (id: string, type: 'sidebar' | 'mobile', fabStyle: 'concierge' | 'simple') => {
  updateCodeSnippets(id)

  if (!window.interactor) {
    console.error('Interactor not found on window object')
    return
  }

  const config: Record<string, unknown> = {
    type,
    theme: 'dark',
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
