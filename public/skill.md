# Interactor Embed Skill

Use this skill when a developer asks you to add Interactor, the Interactor chat widget, or an AI concierge to a website.

## Goal

Install the Interactor embed on the target site with the correct script, stylesheet, initialization call, and optional custom trigger controls.

## Required Information

Ask for the Interactor ID if it is not already provided. Use `interactor` as a local demo fallback only.

## Embed Assets

Add these assets once in the site shell, layout, document head, or equivalent global HTML entrypoint:

```html
<script type="module" crossorigin src="https://embed.interactor.ai/assets/index.js" defer></script>
<link rel="stylesheet" crossorigin href="https://embed.interactor.ai/assets/index.css" />
```

## Basic Initialization

Initialize after the page loads:

```html
<script>
  window.addEventListener('load', () => {
    window.interactor.initialize('INTERACTOR_ID')
  })
</script>
```

For React, Next.js, or other component frameworks, run initialization in the browser only, after the embed script is available.

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

## Layout Options

Sidebar:

```ts
window.interactor.initialize('INTERACTOR_ID', {
  type: 'sidebar',
  isOpen: false,
  isFabVisible: true,
})
```

Pop-up:

```ts
window.interactor.initialize('INTERACTOR_ID', {
  type: 'mobile',
  isOpen: false,
  isFabVisible: true,
})
```

## Custom Triggers

To use your own button, hide the default floating action button and call the modal API from your click handler:

```ts
window.interactor.initialize('INTERACTOR_ID', {
  isFabVisible: false,
})

document.querySelector('[data-open-interactor]')?.addEventListener('click', () => {
  window.interactor.modal.open()
})
```

Send a message programmatically:

```ts
window.interactor.message.send('I would like help with this page')
```

Send a background message without opening chat:

```ts
window.interactor.message.send('Added product to cart', {
  shouldOpenChat: false,
})
```

## Implementation Checklist

1. Find the app shell or global layout where third-party scripts belong.
2. Add the Interactor script and stylesheet once.
3. Initialize Interactor from browser-only code.
4. Use the provided Interactor ID.
5. Choose `sidebar` unless the existing UI clearly needs a pop-up.
6. If there is an existing CTA, wire it to `window.interactor.modal.open()`.
7. Build or typecheck the project.
8. Verify the widget appears and can open.

## Notes

Do not expose private keys. The public Interactor ID is safe to use in client code.
