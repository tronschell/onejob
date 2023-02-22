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
		close()
		
    } catch (e) {
      console.error(e);
    }
  }
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background">
  <div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
    <form on:submit|preventDefault={sendreview}>
      <input type="text" placeholder="Company Name" bind:value={companyname} />
      <input type="text" placeholder="Role Name" bind:value={rolename} />
      <input type="text" placeholder="Pay" bind:value={pay} />
      <select name="Pay Frequency" bind:value={payrate}>
        <option value="Hourly">Hourly</option>
        <option value="Biweekly">Biweekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Annually">Annually</option>
        <option value="Total">Total</option>
      </select>
      <select name="Work Location" bind:value={worklocation}>
        <option value="In Person">In Person</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
      </select>
      <select name="Position Type" bind:value={positiontype}>
        <option value="Full Time">Full Time</option>
        <option value="Internship">Internship</option>
        <option value="Co-op">Co-op</option>
        <option value="Contractor">Contractor</option>
      </select>
      <input type="text" placeholder="College Major" bind:value={schoolmajor} />
      <input type="text" placeholder="Description" bind:value={description} />
      <select name="Number of Interviews" bind:value={numinterviews}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="4">5</option>
      </select>
      <select name="Work-Life Balance Rating" bind:value={wlbrating}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="4">5</option>
      </select>
      <select name="Overall Rating" bind:value={overallrating}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="4">5</option>
      </select>
      <button on:click={sendreview} type="submit">Submit</button>
    </form>
    <hr />
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus on:click={close}>close modal</button>
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
    background: rgb(78, 78, 78);
  }

  button {
    display: block;
  }
</style>
