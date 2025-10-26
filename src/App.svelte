<script lang="ts">
  import Home from './lib/Home.svelte';
  import PhotoPreview from './lib/PhotoPreview.svelte';

  export let photoIdParam: string | null = null;

  addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    photoIdParam = urlParams.get('photo');

    setBgColor();
});

function setBgColor() {
  const body = document.getElementsByTagName("body")[0];
  const backgroundColor = getBgColor();

  body.style.backgroundColor = backgroundColor;
}

const bgColor = new Map([
  ["light", "#c9ceda"],
  ["dark", "#363d51"],
]);

function getBgColor() {
  let theme = localStorage.getItem("theme");
  if (!theme) theme = "light";

  return bgColor.get(theme);
}
</script>

<main>
    {#if photoIdParam?.length}
    <PhotoPreview id={photoIdParam}></PhotoPreview>
    {:else}
    <Home></Home>
    {/if}
</main>

<style>
    main {
      width: 100vw;
      height: 100vh;
    }
</style>