<script>
  import Login from './lib/Login.svelte';
  import { currentUser } from './lib/pocketbase';
  import Reviews from './lib/Reviews.svelte';
</script>

<Login />
{#if $currentUser}
  <Reviews />
{/if}




