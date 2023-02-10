<script lang="js">
  import Addreview from './Addreview.svelte';
  import { currentUser, pb } from './pocketbase';
  import AddReviewModal from "./AddReviewModal.svelte"
    let username;
    let password;
    let showModal = false;
    async function login() {
      await pb.collection('users').authWithPassword(username, password);
    }
    async function signUp() {
      try {
        const data = {
          username,
          password,
          passwordConfirm: password,
          name: 'hi mom!',
        };
        const createdUser = await pb.collection('users').create(data);
        await login();
      } catch (err) {
        console.error(err)
      }
    }
    function signOut() {
      pb.authStore.clear();
    }
  </script>
  
  {#if $currentUser}
    <p>
      Signed in as {$currentUser.username} 
      <button on:click={signOut}>Sign Out</button>
    </p>
    <button on:click="{() => showModal = true}">
      show modal
    </button>
    {#if showModal}
	  <AddReviewModal on:close="{() => showModal = false}">
    </AddReviewModal>
    {/if}

  {:else}
    <form on:submit|preventDefault>
      <input
        placeholder="Username"
        type="text"
        bind:value={username}
      />
  
      <input 
        placeholder="Password" 
        type="password" 
        bind:value={password} 
      />
      <button on:click={signUp}>Sign Up</button>
      <button on:click={login}>Login</button>
  
      

    </form>
  {/if}