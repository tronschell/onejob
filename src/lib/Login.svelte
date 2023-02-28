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
    <div class="nav">
      <div class="nav-items">
        <script src="https://kit.fontawesome.com/d451df271f.js" crossorigin="anonymous"></script>
        <p> <i class="fa-solid fa-user"></i>{$currentUser.username} </p>
        <button on:click={signOut}>Sign Out</button>
        <button class="add-review"on:click="{() => showModal = true}"><i class="fa-solid fa-plus"></i>Add Review</button>
        {#if showModal}
        <AddReviewModal on:close="{() => showModal = false}">
        </AddReviewModal>
        {/if}
    </div>
    </div>
    

  {:else}
  <div >
    <form class="logincontainer" on:submit|preventDefault>
      <input
      class="userpass"
        placeholder="Username"
        type="text"
        bind:value={username}
      />
  
      <input 
        class="userpass"
        placeholder="Password" 
        type="password" 
        bind:value={password} 
      />
      <button class="loginbtn"on:click={login}>Login</button>
      <button on:click={signUp}>Sign Up</button>
      
  
      

    </form>
  </div>
  {/if}

<style>

  .nav{
    margin-top:0;
  }

  @media only screen and (max-width: 414px){
    .nav{
      display: flex;
      flex-direction: row;
      font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
    }
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
    background-color: rgba(35, 35, 35, 0.685);
    
  }
  .userpass{
    padding:0.75rem;
    width:16rem;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
  .loginbtn{
    background-color: #646cff;
    
  }

  .add-review{
    display:flex;
    flex-direction: row;
    align-items: center;
    background-color: #646cff;
    width:11rem;
    justify-content: center;
    gap:1rem;
  }


  .loginbtn:hover{
    border-style: solid;
    border-color: aliceblue;
  }

  .nav{
      display: flex;
      flex-direction: row;
      font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      gap:1rem;
      background-color: rgb(35, 35, 35);
      border-style: solid;
      border-color:rgb(70,70,70);
      border-width: 0 0 01px;
      padding:1rem 2rem;
      width:100vw;
      align-items: center;
      justify-content: flex-end;
      border-radius: 0.25rem;

  }

  .nav-items{
    padding:0rem 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:1rem;
    
  }
</style>