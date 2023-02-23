<script>
  import { createEventDispatcher } from "svelte";
  import { currentUser, pb } from "./pocketbase";
  import { onMount, onDestroy } from "svelte";
  import { Collection, Record } from "pocketbase";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
  
  let modal;
  export let review;

  const handle_keydown = (e) => {
    if (e.key === "Escape" || e.key === "") {
      close();
      return;
    }

	const handle_close = (e) => {
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
    schoolmajor,
	numinterviews,
	overallrating,
	wlbrating,
	description  = "";
  let pay = 0;

  companyname=review.company_name;
  rolename = review.role_name;
  pay = review.pay;
  payrate = review.pay_rate;
  worklocation = review.work_location;
  positiontype = review.position_type;
  schoolmajor = review.school_major;
  numinterviews = review.num_interviews;
  overallrating = review.overall_rating;
  wlbrating = review.wlb_rating;
  description = review.description;


  async function updateReview() {
    //data object
	try{
		const data = await pb.collection("reviews").update(review.id, {
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
    });
	console.log(data)
	console.log("submitted")
	close()
	}
	catch(e){
		console.log(e)
	}
    
  }

  async function deleteReview() {
	try{
		await pb.collection('reviews').delete(review.id);
		console.log("DELETED RECORD")
	}
	catch(e){
		console.log(e)
	}
  }

  	


</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background" on:click={close} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
  <form on:submit|preventDefault={updateReview}>
    <input
      type="text"
      bind:value={companyname}
    />
    <input type="text" bind:value={rolename} />
    <input type="text" bind:value={pay} />
    <select
      name="Pay Frequency"
      bind:value={payrate}
    >
      <option value="Hourly">Hourly</option>
      <option value="Biweekly">Biweekly</option>
      <option value="Monthly">Monthly</option>
      <option value="Annually">Annually</option>
      <option value="Total">Total</option>
    </select>
    <select
      name="Work Location"
      bind:value={worklocation}
    >
      <option value="In Person">In Person</option>
      <option value="Remote">Remote</option>
      <option value="Hybrid">Hybrid</option>
    </select>
    <select
      name="Position Type"
      bind:value={positiontype}
    >
      <option value="Full Time">Full Time</option>
      <option value="Internship">Internship</option>
      <option value="Co-op">Co-op</option>
      <option value="Contractor">Contractor</option>
    </select>
    <input
      type="text"
      bind:value={schoolmajor}
    />
    <input
      type="text"
      bind:value={description}
    />
    <select
	
      name="Number of Interviews"
      bind:value={numinterviews}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value=">4">>4</option>
    </select>
    <select
      name="Work-Life Balance Rating"
      bind:value={wlbrating}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="4">5</option>
    </select>
    <select
      name="Overall Rating"
      bind:value={overallrating}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="4">5</option>
    </select>
    <button autofocus on:click={updateReview} type="submit">Submit</button>
    <button autofocus on:click={deleteReview} type="submit">DELETE</button>

  </form>
  <hr />
  <!-- svelte-ignore a11y-autofocus -->
  <button autofocus on:click={close}>close modal</button>
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
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
    padding: 2rem;
    border-radius: 0.25em;
	border-style: solid;
	border-color: rgb(75, 75, 75);
    background: rgb(35, 35, 35);
  }

  button {
    display: block;
  }
</style>
