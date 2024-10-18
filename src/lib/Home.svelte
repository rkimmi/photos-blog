<script lang="ts">
  import { onMount} from 'svelte';
  import type { Thumbnail } from '../types/thumbnails';
  import ThumbnailsWrapper from "./ThumbnailsWrapper.svelte";

  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;

  let pages: { pageStart: number, thumbnails: Thumbnail[] }[] = [];
  let nextPageStart = 0;

  let thumbnails: Thumbnail[] = [];

  const MAX_THUMBNAILS_PER_PAGE = 5;

  function handlePageRendered(event: CustomEvent<{ thumbnailCount: number }>) {
    nextPageStart += event.detail.thumbnailCount;
    // console.log('Page rendered. Next page thumbnail idx starts at ' + nextPageStart)
    loadNextPage();
  }

  function loadNextPage() {
    if (nextPageStart >= thumbnails.length) return; // No more thumbnails to load

    const pageThumbnails = thumbnails.slice(
      nextPageStart,
      nextPageStart + MAX_THUMBNAILS_PER_PAGE
    );

    pages = [...pages, { pageStart: nextPageStart, thumbnails: pageThumbnails }];
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
        loadNextPage();
    } catch (error) {
        console.error('Error loading thumbnails:', error);
    }
}
</script>

<div class="photos-wrapper">
  {#if thumbnails.length}
    {#each pages as { thumbnails }, index}
      <div class="page">
        <ThumbnailsWrapper
          on:pageRendered={handlePageRendered}
          {thumbnails}
          pageNumber={index}
          {pageHeight}
          {pageWidth}
        />
      </div>
    {/each}
  {/if}
</div>

<style>
  .photos-wrapper {
    min-width: 100vw;
    min-height: 100vh;
    overflow: auto;
    height: 100%;
    width: 100%;  }
</style>