<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from './lib/Home.svelte';
  import PhotoPreview from './lib/PhotoPreview.svelte';

  export let url = ""; // what is this?

  addEventListener("DOMContentLoaded", () => {
    const body = document.getElementsByTagName('body')[0];
    const [backgroundColor, fontColor] = getColorsForHour();

    body.style.backgroundColor = backgroundColor;
    body.style.color = fontColor;
});

const hoursToColourMap: Map<number, string[]> = new Map([
    [0, ['#bd1818', 'white']], // maroon red bg, white font
    [12, ['#F9EDCD', 'brown']], // eggshell bg, brown font
    [16, ['#18BD70', 'black']], // slime green bg, black font
    [20, ['#A7A7F3', 'white']] // light blue bg, white font
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
  <Router basepath="/photos-blog" {url}>
  <Route path="/"><Home /></Route>
  <Route path="/:id" component={PhotoPreview} />
  </Router>
</main>

<style>
    main {
      width: 100vw;
      height: 100vh;
    }
</style>