<script lang="ts">
    import { onMount } from 'svelte';
    export let id;
  
    let photo: any;
  
    onMount(async () => {
      if (!photo) {
        // TODO use endpoint to get single photo
        const response = await fetch(`/api/photos/${id}`);  // Example API call
        photo = await response.json();
      }
    });
  </script>
  
  <div>
    {#if photo}
      <h1>{photo.title}</h1>
      <img src={photo.url} alt="{photo.title}" />
      {:else}
      <div>wip photo preview</div>
    {/if}
  </div>
  