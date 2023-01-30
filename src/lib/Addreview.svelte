<script>
  import { Modals, closeModal } from 'svelte-modals' 
  import { currentUser, pb } from './pocketbase';
  import Textfield from '@smui/textfield';
  import Select, {Option} from '@smui/Select';

  let companyname, rolename, payrate, worklocation, positiontype, created_by = '';
  let pay, wlbrating, overallrating, numinterviews = 0
  let payratelist = ["Hourly", "Biweekly", "Monthly", "Annually", "Total"]
  let wlbratinglist = [1, 2, 3, 4, 5]
  let overallratinglist = [1, 2, 3, 4, 5]
  let numinterviewslist = [1, 2, 3, 4, 5]
  let worklocationlist = ["In Person", "Remote", "Hybrid"]
  let positiontypelist = ["Internship", "Co-op", "Full Time", "Contractor (temp)"]
  let reviews = [];
  let unsubscribe;

  let isOpen;

  async function sendreview() {
    //data object
      const data = {
        company_name: companyname,
        role_name: rolename,
        pay:pay,
        pay_rate:payrate,
        work_location:worklocation,
        wlb_rating:wlbrating,
        overall_rating:overallrating,
        position_type:positiontype,
        num_interviews:numinterviews,
        created_by: $currentUser.id
      };
      const createdreview = await pb.collection('reviews').create(data);
    }
</script>



{#if isOpen}
<div class="backdrop">
  <form on:submit|preventDefault={sendreview}>
    <button on:click={closeModal}>OK</button>
      
    <Textfield input$emptyValueUndefined variant="outlined" bind:value={companyname} label="Company Name" required/>
    <Textfield input$emptyValueUndefined variant="outlined" bind:value={rolename} label="Role Name" required/>
    <Textfield input$emptyValueUndefined variant="outlined" bind:value={pay} label="Pay" required/>
    
    <Select bind:value={payrate} label="Pay Rate" required>
        <Option value="" />
        {#each payratelist as x}
        <Option value={x}>{x}</Option>
        {/each}
    </Select>

    <Select bind:value={worklocation} label="Work Location" required>
        <Option value="" />
        {#each worklocationlist as x}
        <Option value={x}>{x}</Option>
        {/each}
    </Select>
  <Select bind:value={wlbrating} label="Work Life Balance Rating" required>
        <Option value=""/>
        {#each wlbratinglist as x}
        <Option value={x}>{x}</Option>
        {/each}
    </Select>

    <Select bind:value={overallrating} label="Overall Rating" required>
        <Option value="" />
        {#each overallratinglist as x}
        <Option value={x}>{x}</Option>
        {/each}
    </Select>

    <Select bind:value={positiontype} label="Position Type" required>
        <Option value="" />
        {#each positiontypelist as x}
        <Option value={x}>{x}</Option>
        {/each}
    </Select>

    <Select bind:value={numinterviews} label="Number of Interviews" required>
        <Option value="" />
        {#each numinterviewslist as x}
            <Option value={x}>{x}</Option>
        {/each}
    </Select>  

    <button type="submit">Send</button>
  </form>
</div>


{/if}



<Modals>

</Modals>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50)
  }
</style>