<script>
  import Login from './lib/Login.svelte';
  import { currentUser } from './lib/pocketbase';
  import Grid from './lib/grid.svelte';
  import Navbar from './lib/Navbar.svelte';

</script>

<Login />
{#if $currentUser}
  <Grid />
  <iframe src="https://notioniframe.com/notion/1m0lz0qc13v"
style="width: 100%; height: 100vh; border: 0; padding: 0"></iframe>
{/if}




