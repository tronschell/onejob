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
    <p class="nav">
      Signed in as {$currentUser.username} 
      <button on:click={signOut}>Sign Out</button>
      <button class="add-review"on:click="{() => showModal = true}">
        Add Review
      </button>
      {#if showModal}
      <AddReviewModal on:close="{() => showModal = false}">
      </AddReviewModal>
      {/if}
    </p>
    

  {:else}
  <div >
    <form class="logincontainer" on:submit|preventDefault>
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
      <button class="loginbtn"on:click={login}>Login</button>
  
      

    </form>
  </div>
  {/if}

<style>

  .nav{
    margin-top:0;
  }

  .logincontainer{
    display:flex;
    flex-direction: column;
    padding:2rem;
    gap:1rem;
    border-style: solid ;
    border-color: rgb(70, 70, 70);
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
  input{
    padding:0.75rem;
    width:16rem;
  }
  .loginbtn{
    background-color: #646cff;
  }

  .add-review{
    background-color: #646cff;
  }

  .loginbtn:hover{
    border-style: solid;
    border-color: aliceblue;
  }
</style>