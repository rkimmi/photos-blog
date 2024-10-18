<script lang="ts">
    import ThumbnailsWrapper from "./ThumbnailsWrapper.svelte";


</script>

<div>
  <!-- TODO append new thumbnails wrapper on scroll? -->
  <ThumbnailsWrapper pageStart={0}></ThumbnailsWrapper>
     <!-- TODO need to determine start of next page based on thumbnal count in previous component -->
     <!-- <ThumbnailsWrapper pageStart={?}></ThumbnailsWrapper> -->
</div>
