<script lang="ts">
  import { onMount} from 'svelte';
  import type { Thumbnail } from '../types/thumbnails';
  import ThumbnailsWrapper from "./ThumbnailsWrapper.svelte";

  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;

  let pages: { pageStart: number, thumbnails: Thumbnail[] }[] = [];
  let nextPageStart = 0;
  let nextPageStartImgKey = "";

  let thumbnails: Thumbnail[] = [];

  const MAX_THUMBNAILS_PER_PAGE = 5;
  // const BASE_URL = "http://localhost:8080/api/photos-blog/thumbnails";
  const BASE_URL = 'https://rkimmiblogserver.fly.dev/api/photos-blog/thumbnails'

  function handlePageRendered(event: CustomEvent<{ thumbnailCount: number }>) {
    // Each page rendered needs to know how many thumbnails were loaded in the previous page.
    // TODO track thumbnails that could not be rendered due to rnaodmised space constraints, 
    // Make sure these are rendered on the next page.
    nextPageStart += event.detail.thumbnailCount;
    renderNextPage();
  }

  async function loadPages() {
    let pagesToLoad = 3;
    let thumbnailLimit = pagesToLoad * MAX_THUMBNAILS_PER_PAGE;

    await getThumbnails(thumbnailLimit);
    renderNextPage();
  }

  // Handle scrolling
  // if pages.length === currentPage -1, load pages!

  function renderNextPage() {
    // If there are no more thumbnails to render, ignore
    if (nextPageStart >= thumbnails.length) return; 

    const pageThumbnails = thumbnails.slice(
      nextPageStart,
      nextPageStart + MAX_THUMBNAILS_PER_PAGE
    );

    nextPageStart++;

    pages = [...pages, { pageStart: nextPageStart, thumbnails: pageThumbnails }];
  }

  onMount(async () => {
    await loadPages()
  });

  async function getThumbnails(limit: number): Promise<void> {
    const url = `${BASE_URL}?folder=photos-blog&limit=${limit}&startKey=${nextPageStartImgKey}`;

    try {
        const response = await fetch(url);
        let resJson = await response.json()

        thumbnails = [...thumbnails, ...resJson.images];
        nextPageStartImgKey = resJson.nextPageStart;

    } catch (error) {
        console.error('Error loading thumbnails:', error);
    }
  }

</script>

<div class="photos-wrapper">
  {#if thumbnails.length}
    {#each pages as { thumbnails }, index}
        <ThumbnailsWrapper
          on:pageRendered={handlePageRendered}
          {thumbnails}
          pageNumber={index}
          {pageHeight}
          {pageWidth}
        />
    {/each}
  {/if}
</div>

<style>
  .photos-wrapper {
      min-width: 100vw;
      min-height: 100vh;
      display: flex;
      flex-direction: row;
      overflow: auto;
      height: 100%;
      width: 100%;  
    }
</style>