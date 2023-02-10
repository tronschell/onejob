<script>
    import Select, {Option} from '@smui/Select';
    import Card, { Content } from '@smui/card';
    import { Modals, closeModal } from 'svelte-modals'
    import { onMount, onDestroy } from 'svelte';
    import { currentUser, pb } from './pocketbase';
    import Grid from './grid.svelte';
    import Addreview from './Addreview.svelte';
    let reviews = [];
    let unsubscribe;
    let seemorenum = 5

  
    onMount(async () => {
      // Get initial reviews
      try{
        const resultList = await pb.collection('reviews').getList(1, 50, {sort: '-created'});
        reviews = resultList.items;
        console.log(reviews)
      }
      catch(e){
        console.log(e)
      }
      
  
      // Subscribe to realtime reviews
      unsubscribe = await pb
        .collection('reviews')
        .subscribe('*', async ({ action, record }) => {
          if (action === 'create') {
            // Fetch associated user
            //const user = await pb.collection('users').getOne(record.user);
            //record.expand = { user };
            reviews = [...reviews, record];
          }
          if (action === 'delete') {
            reviews = reviews.filter((m) => m.id !== record.id);
          }
        });
    });
  
    // Unsubscribe from realtime reviews
    onDestroy(() => {
      unsubscribe?.();
    });
  

  </script>
  <Addreview/>

  <Grid/>

  <div class="reviews">
    {#each reviews.slice(0, seemorenum) as review}
      {#if review.created_by==$currentUser.id}
      <div class="card-container">
        <Card style= "height:fit-content; width:35vw;flex-direction:row; gap:1rem; border-color:yellow;"class="review-card" variant="outlined" padded>
            <div class = "card-top">
                <h2 class="msg-text">{review.company_name}</h2>
                <h3 class="msg-text">{review.role_name}</h3>
            </div>
            <div class="card-bottom">
                <p class="msg-text">{review.work_location}</p>
                <p class="msg-text">${review.pay}</p>
                <p class="msg-text">{review.pay_rate}</p>
                <p class="msg-text">{review.wlb_rating}/5</p>
                <p class="msg-text">{review.overall_rating}/5</p>
                <p class="msg-text">{review.num_interviews} Interviews</p>
            </div>
        </Card>
      </div>
      {:else}
      <div class="card-container">
        <Card class="review-card" variant="outlined" padded>
            <div class = "card-top">
                <h2 class="msg-text">{review.company_name}</h2>
                <h3 class="msg-text">{review.role_name}</h3>
            </div>
            <div class="card-bottom">
                <p class="msg-text">{review.work_location}</p>
                <p class="msg-text">${review.pay}</p>
                <p class="msg-text">{review.pay_rate}</p>
                <p class="msg-text">{review.wlb_rating}/5</p>
                <p class="msg-text">{review.overall_rating}/5</p>
                <p class="msg-text">{review.num_interviews} Interviews</p>
            </div>
        </Card>
      </div>
      {/if}
    {/each}
  </div>

  <button on:click={() => seemorenum = seemorenum + 5}>See More</button>

<style>
    .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50)
  }
  
    .reviews{
        display:flex;
        flex-direction: column;
        align-items: center;
    }

    .card-container{
        flex-direction: column;
        padding:1rem;
        
    }

    .review-card{
        flex-direction: inherit;
        display:flex;
        height:fit-content; 
      width:25vw;
      flex-direction:column;
      flex-wrap: wrap; 
      gap:1rem;
    }

    .review-card:hover{
      border-color: aqua;
    }


    .card-top{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        
    }
    .msg-text{
        text-align: center;
    }
    hr.solid {
    border-top: 3px solid #bbb;
    display: flex;
    flex-direction: row;
}

    .card-bottom{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    @media only screen and (max-width: 768px){
        .card-bottom{
            flex-direction: column;
            align-items: center;
        }
    }
</style>