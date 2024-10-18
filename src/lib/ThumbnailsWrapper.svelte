<script lang="ts">
import { onMount, createEventDispatcher } from 'svelte';
import type { Thumbnail } from '../types/thumbnails';

// Props
export let pageNumber: number;
export let pageHeight: number;
export let pageWidth: number;
export let thumbnails: Thumbnail[] = [];

const MARGIN = 30;

const dispatch = createEventDispatcher<{ pageRendered: { thumbnailCount: number } }>();

onMount(async () => {
    console.log(thumbnails)
    thumbnails = setThumbnailPositions(); 
    dispatch('pageRendered', { thumbnailCount: thumbnails.length });
});

function isMobileView() {
    if (pageWidth <= 600) return true;
    return false;
}

function getUsuablePageArea(tMaxWidth:number, tMaxHeight: number): { topStart: number, leftStart: number } {
    let leftStart = pageWidth - tMaxWidth;
    let topStart = pageHeight - tMaxHeight;

    if (isMobileView()) {
        // Mobile view i.e scroll down for pages
        topStart = topStart * pageNumber;
    } else {
        // Desktop i.e scroll right for pages
        leftStart = leftStart * pageNumber; // - 250
    }

    console.log(topStart, leftStart)
    return { topStart, leftStart}
}

function setThumbnailPositions() {
    const MAX_RETRIES = 50;

    const placedItems: Array<{ element: HTMLElement; posX: number; posY: number }> = [];
    const updatedThumbnails: Thumbnail[] = [];

    const { tMaxWidth, tMaxHeight } = getMaxThumbnailSizes()
    const { topStart, leftStart } = getUsuablePageArea(tMaxWidth, tMaxHeight);
    
    thumbnails.forEach((photo) => {
        let posX: number, posY: number, isColliding: boolean;
        const element = document.getElementById(`thumbnail-${photo.id}`);

        if (!element) throw new Error(`Cannot find elem thumbnail-${photo.id} to set randomised position.`)
        
        let attempts = 0;
    
        do {
            ({ posX, posY } = generateRandomPosition(leftStart, topStart));

            isColliding = placedItems.some(
                ({ posX: x, posY: y }) =>
                    isOverlapping(posX, posY, x, y, tMaxWidth, tMaxHeight)
                );
            attempts++

        } while (isColliding && attempts < MAX_RETRIES);

        placedItems.push({ element, posX, posY });

         // If we exceed retries, skip this thumbnail
        if (attempts >= MAX_RETRIES) {
            console.warn(`Skipping thumbnail ${photo.id} due to space constraints.`);
            return;
        }

        updatedThumbnails.push({ ...photo, posX, posY });
    });

    return updatedThumbnails;
}

function generateRandomPosition(maxWidth: number, maxHeight: number) {
    // e.g; between 0 and 500
    // need random no between 500 and 1000
    // e.g 3 pages with 500 height = 1500 and 2000
    // between pageTop and pageTop + container height
    return {
        posX: Math.floor(Math.random() * maxWidth),
        posY: Math.floor(Math.random() * maxHeight)
    };
}

function isOverlapping(x1: number, y1: number, x2: number, y2: number, maxWidth: number, maxHeight: number): boolean {
    return !(
      x1 + (maxWidth + MARGIN) <= x2 ||
      x2 + (maxWidth + MARGIN) <= x1 ||
      y1 + (maxHeight + MARGIN) <= y2 ||
      y2 + (maxHeight + MARGIN) <= y1 
    );
  }

  function getMaxThumbnailSizes(): { tMaxWidth: number; tMaxHeight: number } {
    const exampleThumbnail = document.querySelector('.thumbnail');

    if (!exampleThumbnail) {
        return { tMaxWidth: 100, tMaxHeight: 100 };
    }

    const computedStyle = window.getComputedStyle(exampleThumbnail);

    const tMaxWidth = parseInt(computedStyle.maxWidth) || 100;
    const tMaxHeight = parseInt(computedStyle.maxHeight) || 100;

    return { tMaxWidth, tMaxHeight };
}
</script>

<div>
    {#each thumbnails as thumbnail}
    <!-- href={`/photos-blog?photo=${thumbnail.id}`}  -->
      <a id={`thumbnail-${thumbnail.id}`} href={thumbnail.url} class="thumbnail-wrapper" style="left: {thumbnail.posX}px; top: {thumbnail.posY}px;">
        <img class="thumbnail" src={thumbnail.url} alt="Thumbnail {thumbnail.id}" />
      </a>
    {/each}
</div>
<style>
    .thumbnail-wrapper {
      position: absolute;
    }

    .thumbnail {
      max-width: 150px;
      max-height: 100px;
    }

    @media (min-width: 600px) {
    .thumbnail {
        max-width: 250px;
        max-height: 200px;
    }
}
</style>