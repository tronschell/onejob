<script>
  import Login from './lib/Login.svelte';
  import { currentUser } from './lib/pocketbase';
  import Grid from './lib/grid.svelte';
  import Navbar from './lib/Navbar.svelte';

  import { toast, ToastContainer } from "svelte-toastify";

  toast.configure({
    position: "bottom-right"
});
</script>

<Login />
{#if $currentUser}
  <Grid />
{/if}

<ToastContainer />






