// import { Box, Grid } from "@mui/material";

// const Faq = () => {
//   return (
//     <Grid
//       container
//       spacing={2}
//       justifyContent="space-around"
//       alignItems="center"
//       sx={{ height: "70vh", mt: 3, mb: 20 }}>
//       <Grid
//         item
//         lg={5}
//         md={4}
//         justifyContent="center"
//         alignItems="center"
//         textAlign="center"
//         sx={{
//           display: {
//             xs: "none",
//             md: "flex",
//           },
//         }}>
//         <Box
//           component="img"
//           sx={{ width: "470px", pl: 5, height: "440px" }}
//           src={
//             "https://a0.muscache.com/im/pictures/88c7620c-0c19-476f-ba25-ba5db2c52119.jpg?im_w=720"
//           }
//           alt={"frequant asked questions"}></Box>
//       </Grid>
//       <Grid
//         item
//         component={"div"}
//         xs={9}
//         md={5}
//         lg={5}
//         style={{
//           height: " 75%",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}>
//         <div>
//           <h1>Frequently Asked Questions</h1>
//         </div>
//         <div>
//           <div className="accordion accordion-flush" id="accordionFlushExample">
//             <div className="accordion-item">
//               <h2 className="accordion-header">
//                 <button
//                   className="accordion-button collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#flush-collapseOne"
//                   aria-expanded="false"
//                   aria-controls="flush-collapseOne">
//                   HOW DO I PAY FOR MY BOOKING?
//                 </button>
//               </h2>
//               <div
//                 id="flush-collapseOne"
//                 className="accordion-collapse collapse"
//                 data-bs-parent="#accordionFlushExample">
//                 <div className="accordion-body">
//                   You can pay online using Visa, MarterCard, JCB, American
//                   Express and Diners Club cards. Prepaid bookings are charged in
//                   advance at the time of confirmation. Flexible rate bookings
//                   also require credit card for payment guarantee, but are
//                   charged at the time of check out
//                 </div>
//               </div>
//             </div>
//             <div className="accordion-item">
//               <h2 className="accordion-header">
//                 <button
//                   className="accordion-button collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#flush-collapseTwo"
//                   aria-expanded="false"
//                   aria-controls="flush-collapseTwo">
//                   HOW TO HOST ON YOUR TERMS
//                 </button>
//               </h2>
//               <div
//                 id="flush-collapseTwo"
//                 className="accordion-collapse collapse"
//                 data-bs-parent="#accordionFlushExample">
//                 <div className="accordion-body">
//                   Hosts appreciate guests who treat their place as if it were
//                   their own. At Roomster, we’ve implemented a number of policies
//                   and protections to help you attract guests who will be a good
//                   fit for your space. In addition to these protections, clear
//                   listing descriptions, detailed house rules, and up-to-date
//                   booking settings can help ensure your place is treated with
//                   respect, providing you with greater confidence and helping you
//                   create a better experience for your guests.
//                 </div>
//               </div>
//             </div>
//             <div className="accordion-item">
//               <h2 className="accordion-header">
//                 <button
//                   className="accordion-button collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#flush-collapseThree"
//                   aria-expanded="false"
//                   aria-controls="flush-collapseThree">
//                   Is my space a good fit for Roomster?
//                 </button>
//               </h2>
//               <div
//                 id="flush-collapseThree"
//                 className="accordion-collapse collapse"
//                 data-bs-parent="#accordionFlushExample">
//                 <div className="accordion-body">
//                   So your space isn’t a palace—no problem! Many guests
//                   appreciate modest lodging as long as it feels like a good
//                   value. When you’re starting out, you might consider an
//                   introductory price that’s a little lower than your ultimate
//                   goal. That will help you attract guests, and once you’ve
//                   gotten a handful of great reviews, you can re-evaluate and
//                   raise your price to reflect your goals.
//                 </div>
//               </div>
//             </div>
//             <div className="accordion-item">
//               <h2 className="accordion-header">
//                 <button
//                   className="accordion-button collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#flush-collapseFour"
//                   aria-expanded="false"
//                   aria-controls="flush-collapseFour">
//                   WHAT HAPPENS WHEN GUESTS CANCEL OR CHANGE A BOOKING?
//                 </button>
//               </h2>
//               <div
//                 id="flush-collapseFour"
//                 className="accordion-collapse collapse"
//                 data-bs-parent="#accordionFlushExample">
//                 <div className="accordion-body">
//                   Of course, you can’t control whether a guest has to cancel or
//                   change their reservation. But you can be sure you’re
//                   comfortable with your settings by reading more about our guest
//                   cancellation policies and choosing the right one for you. It’s
//                   also a great idea to do regular maintenance and communicate
//                   with guests at important moments, so you can be confident that
//                   your place will be ready to welcome guests—and you’ll be able
//                   to help if anything goes wrong.
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default Faq;
import { Box, Grid } from "@mui/material";

const Faq = () => {
  return (
    <Grid
      container
      spacing={1}
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: "70vh", mt: 3, mb: 20 }}>
      <Grid
        item
        lg={5}
        md={4}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
        }}>
        <Box
          component="img"
          sx={{ width: "470px", height: "440px" }}
          src={
            "https://a0.muscache.com/im/pictures/88c7620c-0c19-476f-ba25-ba5db2c52119.jpg?im_w=720"
          }
          alt={"frequant asked questions"}></Box>
      </Grid>
      <Grid
        item
        component={"div"}
        xs={9}
        md={4}
        lg={5}
        style={{
          height: " 75%",
          display: "flex",
          flexDirection: "column",
        }}>
        <div>
          <h1 style={{marginBottom:"30px",fontFamily: "Gilda Display",fontSize: "60px",fontWeight: 600,lineHeight: "1.2em", color: "rgb(155, 145, 131)", marginTop: "-42px"}} >Frequently Asked Questions</h1>
        </div>
        <div>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" style={{fontFamily: "Montserrat",fontWeight: "600"}}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne">
                  HOW DO I PAY FOR MY BOOKING?
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  You can pay online using Visa, MarterCard, JCB, American
                  Express and Diners Club cards. Prepaid bookings are charged in
                  advance at the time of confirmation. Flexible rate bookings
                  also require credit card for payment guarantee, but are
                  charged at the time of check out
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" style={{fontFamily: "Montserrat",fontWeight: "600"}}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo">
                  HOW TO HOST ON YOUR TERMS
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  Hosts appreciate guests who treat their place as if it were
                  their own. At Roomster, we’ve implemented a number of policies
                  and protections to help you attract guests who will be a good
                  fit for your space. In addition to these protections, clear
                  listing descriptions, detailed house rules, and up-to-date
                  booking settings can help ensure your place is treated with
                  respect, providing you with greater confidence and helping you
                  create a better experience for your guests.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" style={{fontFamily: "Montserrat",fontWeight: "600"}}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree">
                  Is my space a good fit for Roomster?
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  So your space isn’t a palace—no problem! Many guests
                  appreciate modest lodging as long as it feels like a good
                  value. When you’re starting out, you might consider an
                  introductory price that’s a little lower than your ultimate
                  goal. That will help you attract guests, and once you’ve
                  gotten a handful of great reviews, you can re-evaluate and
                  raise your price to reflect your goals.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" style={{fontFamily: "Montserrat",fontWeight: "600"}}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour">
                  WHAT HAPPENS WHEN GUESTS CANCEL OR CHANGE A BOOKING?
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  Of course, you can’t control whether a guest has to cancel or
                  change their reservation. But you can be sure you’re
                  comfortable with your settings by reading more about our guest
                  cancellation policies and choosing the right one for you. It’s
                  also a great idea to do regular maintenance and communicate
                  with guests at important moments, so you can be confident that
                  your place will be ready to welcome guests—and you’ll be able
                  to help if anything goes wrong.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Faq;