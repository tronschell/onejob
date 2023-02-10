<script>
  import { currentUser, pb } from './pocketbase';
  let companyname, rolename, payrate, worklocation, positiontype, created_by = '';
  let pay, wlbrating, overallrating, numinterviews = 0
  let payratelist = ["Hourly", "Biweekly", "Monthly", "Annually", "Total"]
  let wlbratinglist = [1, 2, 3, 4, 5]
  let overallratinglist = [1, 2, 3, 4, 5]
  let numinterviewslist = [1, 2, 3, 4, 5]
  let worklocationlist = ["In Person", "Remote", "Hybrid"]
  let positiontypelist = ["Internship", "Co-op", "Full Time", "Contractor"]
  let reviews = [];
  let description = "";
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
        description:description,
        created_by: $currentUser.id
      };
      const createdreview = await pb.collection('reviews').create(data);
    }
</script>

