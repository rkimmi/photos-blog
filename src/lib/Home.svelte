<script lang="ts">
  import { onMount} from 'svelte';
  import type { Thumbnail } from '../types/thumbnails';
  import ThumbnailsWrapper from "./ThumbnailsWrapper.svelte";

  let nextPageStart = 0;

  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;
  let thumbnails: Thumbnail[] = [];


  function handlePageRendered(event: CustomEvent<{ thumbnailCount: number }>) {
    nextPageStart += event.detail.thumbnailCount;
    console.log('next page start is ' + nextPageStart)
  }

  onMount(async () => {
    await getAllThumbnails();
});

async function getAllThumbnails(): Promise<void> {
    // const url = 'https://rkimmiblogserver.fly.dev/api/photos-blog/thumbnails'
    const url = "http://localhost:8080/api/photos-blog/thumbnails";

    try {
        const response = await fetch(url);
        let resJson = await response.json()
        thumbnails = resJson.images;
    } catch (error) {
        console.error('Error loading thumbnails:', error);
    }
}
</script>

<div class="photos-wrapper">
  {#if thumbnails.length}
    <ThumbnailsWrapper on:pageRendered={handlePageRendered} {thumbnails} pageNumber={1} {pageHeight} {pageWidth}></ThumbnailsWrapper>
  {/if}
  <!-- TODO append new thumbnails wrapper on scroll? -->
  <!-- <div class="page">
    <ThumbnailsWrapper {thumbnails} pageNumber={2} {pageHeight} {pageWidth}></ThumbnailsWrapper>
  </div> -->
</div>

<style>
  .photos-wrapper {
    overflow: auto;
    height: 100%;
    width: 100%;  }
</style>