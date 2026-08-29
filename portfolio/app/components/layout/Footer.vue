<template>
  <div class="mt-6 pb-20">
    <Divider />
    <footer class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6">
      <Logo :size="8" />
      <span class="text-center text-sm text-muted">
        © {{ new Date().getFullYear() }}, Brendan Copley - {{ $t("global.all_rights_reserved") }}.
        <br>
        <span class="text-xs opacity-60">Built on <ULink to="https://github.com/HugoRCD/canvas">Canvas</ULink> by HugoRCD.</span>
      </span>
    </footer>
  </div>
</template>
