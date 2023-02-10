<script>
    import { onMount, onDestroy } from 'svelte';
    import { currentUser, pb } from './pocketbase';
    import Navbar from './Navbar.svelte';
  import AddReviewModal from './AddReviewModal.svelte';

    let reviews = [];
    let unsubscribe;
    let seemorenum = 4
    let showModal = false;

  
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

    <div class="reviews">
        {#if showModal}
	        <AddReviewModal on:close="{() => showModal = false}">
            </AddReviewModal>
        {/if}

        {#each reviews.slice(0, seemorenum) as review}
        {#if review.created_by==$currentUser.id}
            <div class="card">
                <div class="card-top">
                    <div class="company-logo">
                        <img src="https://www.google.com/favicon.ico" style="width:50px; height:50px; object:fill;">
                    </div>
                    <div class="card-title">
                        <h2 style="margin: auto 0;">{review.company_name}</h2>
                        <p style="margin: auto 0;">{review.role_name}</p>
                    </div>
                    {#if review.overall_rating <= 2}
                        <div class="review-score-low" style="color:black">
                            <h3 style="margin: 0 0;">{review.overall_rating}</h3>
                        </div>
                        {:else if review.overall_rating == 3}
                            <div class="review-score-medium" style="color:black">
                                <h3 style="margin: 0 0;">{review.overall_rating}</h3>
                            </div>
                        {:else if review.overall_rating > 3}
                            <div class="review-score-high" style="color:black">
                                <h3 style="margin: 0 0;">{review.overall_rating}</h3>
                            </div>
                        {/if}



                </div>
                <div class="card-tags">
                    <p>{review.work_location}</p>
                    <p>{review.position_type}</p>
                </div>
                <div class="card-bottom">
                    <div class="bottom-items">
                        <h3>Pay</h3>
                        <p>${review.pay}/{review.pay_type}</p>
                    </div>
                    <div class="bottom-items"> 
                        <h3>Major</h3>
                        <p>{review.school_major}</p>
                    </div>
                </div>
            </div>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="card-owned" on:click={() => showModal=true}>
                <div class="card-top">
                    <div class="logoname">
                        <div class="company-logo">
                            <img src="https://www.google.com/favicon.ico" style="width:50px; height:50px; object:fill;">
                        </div>
                        <div class="card-title" style="">
                            <h2 style="">{review.company_name}</h2>
                            <p style="margin: auto 0;">{review.role_name}</p>
                        </div>
                    </div>
                    {#if review.overall_rating <= 2}
                        <div class="review-score-low" style="color:black">
                            <h3 style="margin: 0 0;">{review.overall_rating}</h3>
                        </div>
                        {:else if review.overall_rating == 3}
                            <div class="review-score-medium" style="color:black">
                                <h3 style="margin: 0 0;">{review.overall_rating}</h3>
                            </div>
                        {:else if review.overall_rating > 3}
                            <div class="review-score-high" style="color:black">
                                <h3 style="margin: 0 0;">{review.overall_rating}</h3>
                            </div>
                        {/if}
                </div>
                <div class="card-tags">
                    <p>{review.work_location}</p>
                    <p>{review.position_type}</p>
                </div>
                <div class="card-bottom">
                    <div class="bottom-items">
                        <h3>Pay</h3>
                        <p>${review.pay}/{review.pay_rate}</p>
                    </div>
                    <div class="bottom-items"> 
                        <h3>Major</h3>
                        <p>{review.school_major}</p>
                    </div>
                </div>
            </div>
        {/if}
        {/each}
    </div>

    <button style="margin-top:1rem;" on:click={() => seemorenum = seemorenum + 4}>See More</button>

<style>

    .reviews{
        display:flex;
        flex-direction: row;
        max-width: 1200px;
        gap:1rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    .card{
        display:flex;
        flex-direction: column;
        gap:1rem;
        background-color: rgb(35, 35, 35);
        padding:2rem;
        border-radius: 0.25rem;
        border-style: solid;
        border-width: 1px;;
        border-color: rgb(70, 70, 70);
        transition: 0.3s;
        width:400px;
    }

    .card-owned{
        display:flex;
        flex-direction: column;
        gap:1rem;
        background-color: rgb(35, 35, 35);
        padding:2rem;
        border-radius: 0.25rem;
        border-style: solid;
        border-width: 1px;
        border-color: rgb(235, 255, 108);
        transition: 0.3s;
        width:400px;
    }
    

    .card:hover{
        background-color: rgb(42, 42, 42);
        cursor: pointer;
    }

    .card-owned:hover{
        background-color: rgb(42, 42, 42);
        cursor: pointer;
    }
    .card-top{
        display: flex;
        flex-direction: row;
        gap:1rem;
        justify-content: space-between;
        text-overflow: ellipsis;
    }


    .logoname{
        display: flex;
        flex-direction: row;
        gap:1rem;
    }

    .card-title{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap:0.5rem;
        text-overflow: clip;
 
    }

    .card-title h2{
        margin: auto 0;
        display: flex;
        text-overflow: ellipsis;
        align-items: flex-start;
        overflow: hidden;
        white-space: nowrap;

    }

    .review-score-high{
        background-color: rgb(127, 255, 127);
        border-radius: 50%;
        width:50px;
        height:50px;
        display:flex;
        align-items: center;
        justify-content: center;
    }
    .review-score-low{
        background-color: rgb(255, 127, 127);
        border-radius: 50%;
        width:50px;
        height:50px;
        display:flex;
        align-items: center;
        justify-content: center;
    }
    .review-score-medium{
        background-color: rgb(244, 255, 127);
        border-radius: 50%;
        width:50px;
        height:50px;
        display:flex;
        align-items: center;
        justify-content: center;
    }

    .card-tags{
        display: flex;
        flex-direction: row;
        gap:1rem;
        align-items: flex-start;
    }

    .card-tags p{
        background-color: rgb(58, 58, 58);
        padding:0.25rem 0.75rem;
        border-radius: 0.25rem;
        margin:0.25rem;
    }

    .card-bottom{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .bottom-items{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .bottom-items h3{
        margin: 0;
    }

    .bottom-items p{
        margin-bottom: 0;

    }


</style>