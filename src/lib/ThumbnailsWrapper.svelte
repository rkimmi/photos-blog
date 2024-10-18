<script lang="ts">
import { onMount } from 'svelte';

type Thumbnail = {id: string, url: string, posX?: number, posY?: number};

export let pageStart: number;

const MAX_THUMBNAILS = 5;
const MARGIN = 30;

let thumbnails: Thumbnail[] = [];

onMount(async () => {
    await loadThumbnails(pageStart, MAX_THUMBNAILS);
    // Reset thumbnails
    thumbnails = setThumbnailPositions(); 
    console.log(thumbnails.length)
});

async function loadThumbnails(pageStart: number, pageEnd: number): Promise<void> {
    // TODO pass pagination params
    const url = 'https://rkimmiblogserver.fly.dev/api/photos-blog/thumbnails'
    // const url = "http://localhost:8080/api/photos-blog/thumbnails";

    try {
        const response = await fetch(url);
        let resJson = await response.json()
        // temp splice
        thumbnails = resJson.images.splice(0, pageEnd);
        console.log('got images from cloudinary')
    } catch (error) {
        console.error('Error loading thumbnails:', error);
    }
}

function setThumbnailPositions() {
    const MAX_RETRIES = 50;
    const containerWidth = window.innerWidth - 250;
    const containerHeight = window.innerHeight - 250;
    const placedItems: Array<{ element: HTMLElement; posX: number; posY: number }> = [];
    const updatedThumbnails: Thumbnail[] = [];

    const { maxWidth, maxHeight } = getMaxThumbnailSizes()
    
    thumbnails.forEach((photo) => {
        let posX: number, posY: number, isColliding: boolean;
        const element = document.getElementById(`thumbnail-${photo.id}`);

        if (!element) throw new Error(`Cannot find elem thumbnail-${photo.id} to set randomised position.`)
        
        let attempts = 0;
    
        do {
            ({ posX, posY } = generateRandomPosition(containerWidth, containerHeight));

            isColliding = placedItems.some(
                ({ posX: x, posY: y }) =>
                    isOverlapping(posX, posY, x, y, maxWidth, maxHeight)
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

  function getMaxThumbnailSizes(): { maxWidth: number; maxHeight: number } {
    const exampleThumbnail = document.querySelector('.thumbnail');

    if (!exampleThumbnail) {
        return { maxWidth: 100, maxHeight: 100 };
    }

    const computedStyle = window.getComputedStyle(exampleThumbnail);

    const maxWidth = parseInt(computedStyle.maxWidth) || 100;
    const maxHeight = parseInt(computedStyle.maxHeight) || 100;

    return { maxWidth, maxHeight };
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