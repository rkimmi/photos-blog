<script lang="ts">
  import Home from './lib/Home.svelte';
  import PhotoPreview from './lib/PhotoPreview.svelte';

  export let url = ""; // what is this?
  export let photoIdParam: string | null = null;

  addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    photoIdParam = urlParams.get('photo');

    const body = document.getElementsByTagName('body')[0];
    const [backgroundColor, fontColor] = getColorsForHour();

    body.style.backgroundColor = backgroundColor;
    body.style.color = fontColor;
});

const hoursToColourMap: Map<number, string[]> = new Map([
    [0, ['#ffc0c0', 'white']], // maroon red bg, white font #ffc0c0
    [12, ['#ffffaa', 'brown']], // eggshell bg, brown font
    [16, ['#8affc8', 'black']], // mint green bg, black font
    [20, ['#ceceff', 'white']] // light blue bg, white font
])

function getColorsForHour(): [string, string] {
    let selectedBackgroundColor = '';
    let selectFontColor = '';
    const currentDateTime = new Date();
    const hours = currentDateTime.getHours();

    for (let [key, [backgroundColor, fontColor]] of hoursToColourMap) {
        if (hours >= key) { 
            selectedBackgroundColor = backgroundColor;
            selectFontColor = fontColor
        } 
        else {
            break;
        }
    }

    return [selectedBackgroundColor, selectFontColor];
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