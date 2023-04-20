<script>
  import { onMount, onDestroy } from "svelte";
  import { currentUser, pb } from "./pocketbase";
  import AddReviewModal from "./AddReviewModal.svelte";
  import DetailsModal from "./DetailsModal.svelte";
  import EditReviewModal from "./EditReviewModal.svelte";



  export let reviews = [];
  export let resultList;
  let seemorenum = 4;
  let showModal = false;
  let showEditModal = false;
  let showDetailsModal = false;
  export let reviewData;


  export let sortsetting = "-created";

  function editStatus(status, review) {
    showEditModal = status;
    reviewData = review;
  }

  function changeDetailsModal(status, review) {
    showDetailsModal = status;
    reviewData = review;
  }

  export async function refreshData(){
    try {
    resultList = await pb
        .collection("reviews")
        .getList(1, 50, { sort: "-created"})
      reviews = resultList.items;
      console.log(reviews)
    } catch (e) {
      console.log(e);
    }
  }

  onMount(async () => {
    // Get initial reviews
    refreshData()

  });


</script>

<div class="main-container">
  <div class="filter-list">
    <button class="filter-button" on:click={() => GetNew("-created")}>Created By</button>
    <button class="filter-button" on:click={() => GetNew("-overall_rating")}>Overall Rating</button>
    <button class="filter-button"on:click={() => GetNew("-work_location")}>Work Location</button>
    <button class="filter-button"on:click={() => GetNew("-pay")}>Pay</button>
  </div>

  <div class="reviews-container">
    <div class="reviews">
      {#if showModal}
        <AddReviewModal on:close={() => (showModal = false)} />
      {/if}
      {#each reviews.slice(0, seemorenum) as review, i}
        {#if review.created_by != $currentUser.id}
          <div class="card" on:click={changeDetailsModal(true, review)}>
            <div class="card-top">
              <div class="logoname">
                <div class="company-logo">
                  <img
                    src="https://www.google.com/favicon.ico"
                    style="width:50px; height:50px; object:fill;"
                  />
                </div>
                <div class="card-title">
                  <h2 style="margin: auto 0;">{review.company_name}</h2>
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
              <p class="tag">{review.work_location}</p>
              <p class="tag">{review.position_type}</p>
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
        {:else}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="card-owned" on:click={editStatus(true, review)}>
            <div class="card-top">
              <div class="logoname">
                <div class="company-logo">
                  <img
                    src="https://www.google.com/favicon.ico"
                    style="width:50px; height:50px; object:fill;"
                  />
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
              <p class="tag">{review.work_location}</p>
              <p class="tag">{review.position_type}</p>
              <p class="yourstag">Your review!</p>
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
      {#if showEditModal}
        <EditReviewModal
          on:close={() => (showEditModal = false)}
          review={reviewData}
        />
      {/if}
      {#if showDetailsModal}
        <DetailsModal
          on:close={() => (showDetailsModal = false)}
          review={reviewData}
        />
      {/if}
    </div>
      <button
        on:click={() => (seemorenum = seemorenum + 4)}>See More</button
      >
  </div>
</div>

<style>


  .main-container {
    display: flex;
    flex-direction: column;
    gap:1rem;
  }

  .filter-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: rgb(35, 35, 35);
    height: fit-content;
    padding:1rem 2rem;
    border-radius: 0.25rem;
    border-style: solid;
    border-width: 1px;
    border-color:rgb(70,70,70);
  }

  .filter-button {
    width: 140px;
    background-color: rgb(58, 58, 58);
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    margin: 0.25rem;
    transition: 0.25s;
  }

  .filter-button:hover {
    width: 140px;
    border-width: 1px;
    background-color: rgb(85, 85, 85);
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    border-color:#646cff;
    margin: 0.25rem;
    border-style: solid;
  }

  .filter-button.active {
    width: 140px;
    border-width: 1px;
    background-color: rgb(85, 85, 85);
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    border-color:#646cff;
    margin: 0.25rem;
    border-style: solid;

  }


  .reviews {
    display: flex;
    flex-direction: row;
    max-width: 950px;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .reviews-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(35, 35, 35);
    padding: 2rem;
    border-radius: 0.25rem;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(70, 70, 70);
    transition: 0.3s;
    width: 400px;
  }

  .card-owned {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(35, 35, 35);
    padding: 2rem;
    border-radius: 0.25rem;
    border-style: solid;
    border-width: 1px;
    border-color:rgb(70, 70, 70);
    transition: 0.3s;
    width: 400px;
  }

  .card:hover {
    background-color: rgb(42, 42, 42);
    cursor: pointer;
  }

  .card-owned:hover {
    background-color: rgb(42, 42, 42);
    cursor: pointer;
    
  }
  .card-top {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    text-overflow: ellipsis;
  }

  .logoname {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  

  .card-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    text-overflow: clip;
  }

  .card-title h2 {
    margin: auto 0;
    display: flex;
    text-overflow: ellipsis;
    align-items: flex-start;
    overflow: hidden;
    white-space: nowrap;
  }

  .review-score-high {
    background-color: rgb(127, 255, 127);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .review-score-low {
    background-color: rgb(255, 127, 127);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .review-score-medium {
    background-color: rgb(244, 255, 127);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-tags {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .tag{
    background-color: rgb(58, 58, 58);
    width:80px;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    margin: 0.25rem;
  }

  .yourstag{
    width:100px;
    background-color:#646cff;
    box-shadow:0 0 10px 1px #646cff;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    margin: 0.25rem;
  }

  .filter-button{
    background-color: rgb(58, 58, 58);
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    margin: 0.25rem;
  }

  .card-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .bottom-items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .bottom-items h3 {
    margin: 0;
  }

  .bottom-items p {
    margin-bottom: 0;
  }



@media only screen and (max-width: 414px) {
  .main-container {
    display: flex;
    flex-direction: column;
    gap:1rem;
  }
  .filter-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(35, 35, 35);
    height: fit-content;
    padding:2rem;
    border-style: solid;
    border-width: 0.25rem;
    border-color:rgb(70,70,70);
    border-radius: 0.25rem;
  }
  .reviews {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(35, 35, 35);
    padding: 2rem;
    border-radius: 0.25rem;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(70, 70, 70);
    transition: 0.3s;
    width: 280px;
  }

  .card-tags {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: flex-start;
    width:280px;
    overflow-wrap: normal;
  }

  .card-owned {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(35, 35, 35);
    padding: 2rem;
    border-radius: 0.25rem;
    border-style: solid;
    border-width: 1px;
    border-color: #646cff;
    transition: 0.3s;
    width: 280px;
  }

  .card-title h2 {
    margin: auto 0;
    width:7rem;
    display: flex;
    text-overflow: ellipsis;
    align-items: flex-start;
    overflow: hidden;
    white-space: nowrap;
  }

  .filter-list {
    display: flex;
    overflow-y:auto;
    overscroll-behavior-x: contain;
    flex-flow: row;
    max-width: 280px;
    justify-content: flex-start;
    gap: 1rem;
    background-color: rgb(35, 35, 35);
    border-width: 1px;
    border-radius: 0.25rem;
    padding: 1rem 2rem;
  }

  .filter-button {
    min-width: 140px;
    background-color: rgb(58, 58, 58);
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    margin: 0.25rem;
  }
  .filter-button.active {
    min-width: 140px;
    background-color: rgb(85, 85, 85);
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    margin: 0.25rem;
  }



}
</style>
