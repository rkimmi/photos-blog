<script lang="ts">
import { onMount } from 'svelte';

type Thumbnail = {id: string, url: string, posX?: number, posY?: number};

export let pageStart: number;

const MAX_THUMBNAILS = 5;
const MAX_THUMBNAIL_WIDTH = 250;
const MAX_THUMBNAIL_HEIGHT = 250; 
const MARGIN = 30;

let thumbnails: Thumbnail[] = [];

onMount(async () => {
    await loadThumbnails(pageStart, MAX_THUMBNAILS);
    setThumbnailPositions(); 
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
    } catch (error) {
        console.error('Error loading thumbnails:', error);
    } finally {
    }
}

function setThumbnailPositions() {
    const containerWidth = window.innerWidth - 250;
    const containerHeight = window.innerHeight - 250;
    const placedItems: Array<{ element: HTMLElement; posX: number; posY: number }> = [];

    thumbnails = thumbnails.map((photo) => {
        let posX: number, posY: number, isColliding: boolean;
        const element = document.getElementById(`thumbnail-${photo.id}`);

        if (!element) throw new Error(`Cannot find elem thumbnail-${photo.id} to set randomised position.`)
        
        do {
            ({ posX, posY } = generateRandomPosition(containerWidth, containerHeight));
            isColliding = placedItems.some(({ posX: x, posY: y }) =>
            isOverlapping(posX, posY, x, y)
            );
        } while (isColliding);
    
        placedItems.push({ element, posX, posY });

        return { ...photo, posX, posY };
    });
}

function generateRandomPosition(maxWidth: number, maxHeight: number) {
    return {
        posX: Math.floor(Math.random() * maxWidth),
        posY: Math.floor(Math.random() * maxHeight)
    };
}

function isOverlapping(x1: number, y1: number, x2: number, y2: number): boolean {
    const width = MAX_THUMBNAIL_WIDTH + MARGIN;
    const height = MAX_THUMBNAIL_HEIGHT + MARGIN;

    return !(
      x1 + width <= x2 ||
      x2 + width <= x1 ||
      y1 + height <= y2 ||
      y2 + height <= y1 
    );
  }

</script>

<div>
    {#each thumbnails as thumbnail}
      <a id={`thumbnail-${thumbnail.id}`} class="thumbnail-wrapper" href={`/photos-blog?photo=${thumbnail.id}`} style="left: {thumbnail.posX}px; top: {thumbnail.posY}px;">
        <img class="thumbnail" src={thumbnail.url} alt="Thumbnail {thumbnail.id}" />
      </a>
    {/each}
</div>
<style>
    .thumbnail-wrapper {
      position: absolute;
    }

    .thumbnail {
      max-width: 250px;
      max-height: 200px;
    }
</style>