<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { currentUser, pb } from "./pocketbase";
  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
  

  let modal;

  const handle_keydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key === "Tab") {
      // trap focus
      const nodes = modal.querySelectorAll("*");
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      e.preventDefault();
    }
  };

  const previously_focused =
    typeof document !== "undefined" && document.activeElement;

  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }

  let companyname,
    rolename,
    payrate,
    worklocation,
    positiontype,
    created_by,
    schoolmajor = "";
  let pay,
    wlbrating,
    overallrating,
    numinterviews = 0;
  let description = "";


  let isOpen;

  async function sendreview() {
    //data object
    const data = {
      company_name: companyname,
      role_name: rolename,
      pay: pay,
      pay_rate: payrate,
      work_location: worklocation,
      wlb_rating: wlbrating,
      overall_rating: overallrating,
      position_type: positiontype,
      num_interviews: numinterviews,
      description: description,
      school_major: schoolmajor,
      created_by: $currentUser.id,
    };

    try {
      const createdreview = await pb.collection("reviews").create(data);
	  console.log($currentUser.id)
		close()
		
    } catch (e) {
      console.log(e);
	  console.log($currentUser.id)
    }
  }
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background">
  <div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
    <div class="top-button">
      <button style="align-items:flex-end"autofocus on:click={close}>Close</button>
    </div>
  <h2 style="margin-top:0;">Add review</h2>
  <hr />
    
    <form class="addreviewform"on:submit|preventDefault={sendreview}>
      <h3 class="titles">Role Info</h3>
      <div class="company-section">
        <input class="textinput" type="text" placeholder="Company Name" bind:value={companyname} />
        <input class="textinput" placeholder="Role Name" bind:value={rolename} />
      </div>
      <h3 class="titles">Pay Info</h3>
      <div class="pay-section">
        <input class="textinput" type="text" placeholder="Pay" bind:value={pay} />
        <select class="selectinput" name="Pay Frequency" bind:value={payrate}>
          <option value="Hourly">Hourly</option>
          <option value="Biweekly">Biweekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Annually">Annually</option>
          <option value="Total">Total</option>
        </select>
      </div>
      <h3 class="titles">Work Details Info</h3>
      <div class="work-section">
        <div class="work-location-details">
          <select class="selectinput" name="Work Location" bind:value={worklocation}>
            <option value="In Person">In Person</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <select class="selectinput" name="Position Type" bind:value={positiontype}>
            <option value="Full Time">Full Time</option>
            <option value="Internship">Internship</option>
            <option value="Co-op">Co-op</option>
            <option value="Contractor">Contractor</option>
          </select>
        </div>
        <div class="reviews">
          <div class="reviews-detail">
          <p>Number of Interviews</p>
          <select class="selectinput" name="Number of Interviews" bind:value={numinterviews}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </select>
        </div>
          <div class="reviews-detail">
            <p>Work Life Balance Rating</p>
          <select class="selectinput" name="Work-Life Balance Rating" bind:value={wlbrating}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </select>
          </div>
          <div class="reviews-detail">
            <p>Overall Rating</p>
          <select class="selectinput" name="Overall Rating" bind:value={overallrating}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </select>
          </div>
        </div>
      </div>
      <h3 class="titles">Miscellaneous Section</h3>
      <div class="misc-section">
        <input class="textinput" type="text" placeholder="College Major" bind:value={schoolmajor} />
        <input class="textinput" type="text" placeholder="Description" bind:value={description} />
      </div>
      <div>
        <button style="background-color:#646cff"on:click={sendreview} type="submit">Submit</button>
      </div>
    </form>
    <!-- svelte-ignore a11y-autofocus -->
    
  </div>
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.25em;
    background: rgb(35, 35, 35);
    border-style: solid;
    border-width: 1px;
    border-color:rgb(70, 70, 70);
  }

  .addreviewform{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap:1rem;
    justify-content: center;
    width: 90%;
    margin:0 auto;
    align-items: flex-start;
  }

  .company-section{
    display: flex;
    flex-direction: row;
    gap:1rem;
  }

  .pay-section{
    display: flex;  
    gap:1rem;
    flex-direction: row;
    align-items: center;

  }

  .work-section{
    flex-direction: column;
    display: flex;  
    gap:1rem;
    align-items: center;

  }

  .work-location-details{
    display: flex;
    flex-direction: row;
    gap:1rem;
  }

  .reviews{
    display: flex;
    flex-direction: column;
    gap:0.5rem;
    justify-content: flex-end;
  }

  .reviews-detail{
    gap:1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .misc-section{
    flex-direction: row;
    display: flex;  
    gap:1rem;
    align-items: center;
    justify-content: center;
  }

  .titles{
    margin:0.5rem; 
  }


  .textinput{
    padding:1rem;
  }

  .selectinput{
    padding:0.5rem;
  }

  .top-items{
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .top-text{
    display: flex;
    align-items: center;
  }

  .top-button{
    display: flex;
    justify-content: flex-end;
  }

  

  button {
    display: block;
  }
</style>
