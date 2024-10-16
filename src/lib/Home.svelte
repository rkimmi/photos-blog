<script lang="ts">
  // TODO get photo thumbnails
  export let photos: any = [{id: "test", title:"test"}]; 
  console.log('hello')
</script>

<div>
  wip
  {#each photos as photo}
    <a href="/photos-blog?photo={photo.id}">{photo.title}</a>
  {/each}
</div>
