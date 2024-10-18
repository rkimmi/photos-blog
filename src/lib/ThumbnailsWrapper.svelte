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
    thumbnails = setThumbnailPositions(); 
    dispatch('pageRendered', { thumbnailCount: thumbnails.length });
});

function isMobileView() {
    if (pageWidth <= 600) return true;
    return false;
}

function getPageStartPositions(): { topStart: number, leftStart: number } {
    let leftStart = MARGIN;
    let topStart = MARGIN;

    if (pageNumber == 0) return { 
        topStart, leftStart
    }

    if (isMobileView()) {
        // Mobile view i.e scroll down for pages
        topStart += (pageNumber * pageHeight);
    } else {
        // Desktop i.e scroll right for pages
        leftStart += (pageNumber * pageWidth);
    }

    return { topStart, leftStart}
}

function setThumbnailPositions() {
    const MAX_RETRIES = 50;

    const placedItems: Array<{ element: HTMLElement; posX: number; posY: number }> = [];
    const updatedThumbnails: Thumbnail[] = [];

    const { tMaxWidth, tMaxHeight } = getMaxThumbnailSizes()
    const { topStart, leftStart } = getPageStartPositions();
    
    thumbnails.forEach((photo) => {
        let posX: number, posY: number, isColliding: boolean;
        const element = document.getElementById(`thumbnail-${photo.id}`);

        if (!element) throw new Error(`Cannot find elem thumbnail-${photo.id} to set randomised position.`)
        
        let attempts = 0;
    
        do {
            ({ posX, posY } = generateRandomPosition(leftStart, topStart, tMaxHeight, tMaxWidth));

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
            // Hacky just hide the thumbnail for now
            // We need to keep track of these and send them to the parent for rendering on a new page
            element.style.display = "none";
        }

        updatedThumbnails.push({ ...photo, posX, posY });
    });

    return updatedThumbnails;
}

function generateRandomPosition(leftStart: number, topStart: number, tMaxHeight: number, tMaxWidth: number) {
    let maxHeight = topStart + pageHeight - MARGIN - tMaxHeight;
    let maxWidth = leftStart + pageWidth - MARGIN - tMaxWidth;
    return {
        // Get random position within the x and y allowance of the page.
        // E.g if we're on page 3 with 500px page height, topStart == 1500px
        // Get a top position between 1500px and 2000px
        // Math.random((max - min) + min)
        posX: Math.floor(Math.random() * (maxWidth - leftStart) + leftStart),
        posY: Math.floor(Math.random() * (maxHeight - topStart) + topStart)
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
      <a 
        id={`thumbnail-${thumbnail.id}`} 
        href={thumbnail.url} 
        class="thumbnail-wrapper" 
        style="left: {thumbnail.posX}px; top: {thumbnail.posY}px;">

        <img 
            class="thumbnail" 
            src={thumbnail.url} 
            alt="img {thumbnail.id}" />
      </a>
    {/each}
</div>
<style>
    .thumbnail-wrapper {
      position: absolute;
      filter: drop-shadow(2px 4px 2px #00000020);
    }

    .thumbnail {
      max-width: 200px;
      max-height: 150px;
    }

    @media (min-width: 600px) {
    .thumbnail {
        max-width: 250px;
        max-height: 200px;
    }
}
</style>