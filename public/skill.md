# Interactor Embed Skill

Use this skill when you are asked to add Interactor, an Interactor chat widget, or an AI concierge to a website or web app.

## Outcome

Install the Interactor embed with:

- the hosted script and stylesheet
- the correct Interactor ID
- a browser-only initialization call
- optional controls for opening chat or sending messages from the page

## Before You Edit

Ask for the Interactor ID if it was not provided. The ID is public client-side configuration, not a secret. Use `interactor` only as a local demo fallback.

Find the app shell or global layout where third-party scripts belong. Common places include:

- static HTML: `index.html`, usually in `<head>` or before `</body>`
- Next.js App Router: `app/layout.tsx`
- Next.js Pages Router: `pages/_document.tsx` or `pages/_app.tsx`
- Vite/React: `index.html` plus a browser-only component or effect

Do not add the hosted script and stylesheet more than once.

## Add Embed Assets

Add these once in the global document shell:

```html
<script type="module" crossorigin src="https://embed.interactor.ai/assets/index.js" defer></script>
<link rel="stylesheet" crossorigin href="https://embed.interactor.ai/assets/index.css" />
```

## Initialize Interactor

Initialize Interactor in browser-only code after the script is available.

Default sidebar setup:

```ts
window.interactor.initialize('INTERACTOR_ID', {
  type: 'sidebar',
  isOpen: false,
  isFabVisible: true,
})
```

Pop-up setup:

```ts
window.interactor.initialize('INTERACTOR_ID', {
  type: 'mobile',
  isOpen: false,
  isFabVisible: true,
})
```

For React-style apps, initialize inside an effect and guard against server-side rendering:

```ts
useEffect(() => {
  if (!window.interactor) return

  window.interactor.initialize('INTERACTOR_ID', {
    type: 'sidebar',
    isOpen: false,
    isFabVisible: true,
  })
}, [])
```

For plain HTML:

```html
<script>
  window.addEventListener('load', () => {
    window.interactor.initialize('INTERACTOR_ID', {
      type: 'sidebar',
      isOpen: false,
      isFabVisible: true
    })
  })
</script>
```

## Advanced Control

### Use Your Own Button

Hide the default Interactor button only when the site should use its own launch button.

```ts
// 1. Initialize without the default floating button
window.interactor.initialize('INTERACTOR_ID', {
  isFabVisible: false,
})

// 2. Open chat from your own button handler
document.querySelector('[data-open-interactor]')?.addEventListener('click', () => {
  window.interactor.modal.open()
})
```

You can also call `window.interactor.modal.open()` from any existing CTA or page event, even if the default Interactor button is still visible.

### Send Messages Into Chat

Open chat and send a message:

```ts
window.interactor.message.send('I would like help with this page')
```

Send background context without opening chat:

```ts
window.interactor.message.send('Added product to cart', {
  shouldOpenChat: false,
})
```

## Verification Checklist

1. Confirm the script and stylesheet are present once.
2. Confirm initialization uses the provided Interactor ID.
3. Build or typecheck the project.
4. Open the site in a browser.
5. Confirm the Interactor button or custom trigger can open chat.
6. If message APIs were added, confirm the message is sent from the expected UI event.
