/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./PickerDate.css";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CurrencySign from "../../../utils/CurrencySign";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Roomster from "../../../API/config";
import CheckoutForm from './../../CheckoutForm/CheckoutForm';
import { toastMessage } from "../../../utils/toasfiy";


const PickerDate = ({ reservationsArr = [], price = 1, id = '' }) => {

  const SignySelector = useSelector((state) => state.currency.selected);
  const currencySelector = useSelector((state) => state.currency.currency);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [reservitionButtom, setReservitionButtom] = useState(false);

  const disabledDays = [
    ...reservationsArr.map(date => {
      return { from: new Date(date.startDate), to: new Date(date.endDate) }
    }),
    { from: new Date(2022, 1, 1), to: new Date().setDate(new Date().getDate() - 1) },
  ];



  const [range, setRange] = useState();

  let footer = (
    <Typography color="primary" sx={{ textAlign: "center",mt:2 }}>
      Please pick the first day
    </Typography>
  );

  const stripePromise = loadStripe("pk_test_51NMW2JI6wftnZOECQ1OU2KtcGuY0JcqT6zPFJCaXmE9b9vEmjGZwyjWHq9M444W41gsB1QYqP8FdReg1zyA8YT6p00kryLDqqp");
  // eslint-disable-next-line react/prop-types
  const [clientSecret, setClientSecret] = useState(null);
  const Modal = ({ onClose, children }) => {

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex:5,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          {children}
          <Button
            variant="contained"
            color="error"
            style={{ marginTop: "10px" }}
            onClick={onClose}
          >
            cancel
          </Button>
        </div>
      </div>
    );
  };
  const handleReserveClick = async (totalPrice) => {
    await Roomster.post("create-payment-intent", {
      amount: totalPrice, //This is Price From Date Picker
      currency: 'usd' // This is Currncy From Date picker
    })
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
    setShowCheckoutForm(true);
  };
  const handleModalClose = () => {
    setShowCheckoutForm(false);
  };
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const checkIfRentAvailable = (newRent, rentedArr) => {
    for (let i = 0; i < rentedArr.length; i++) {
      //dummy  rents : [[5,9],[15,20]]
      const rentedStartDate = rentedArr[i].startDate;
      const rentedEndDate = rentedArr[i].endDate;
      const newStart = newRent.from.toISOString();
      const newEnd = newRent.to.toISOString();
      if (
        // newEnd <= newStart || // try to rent [12,7]
        // (newStart >= rentedStartDate && // try to rent [7,12]
        //   newStart <= rentedEndDate) ||
        // (newEnd >= rentedStartDate && // try to rent [4,8]
        //   newEnd <= rentedEndDate) ||
        (newStart < rentedStartDate && newEnd > rentedEndDate) // try to rent [4,12]
      ) {
        // setReservitionButtom( false); // rental period is free
        toastMessage("info", "please select correct days 😏")
        return false
      }
    }
    // setReservitionButtom( true); // rental period is free
    return true

  };

  useEffect(() => {
    if (range?.to) {
      setReservitionButtom(!checkIfRentAvailable(range, reservationsArr));
    }
  }, [range]);


  if (range?.from) {
    if (!range.to) {
      footer = (
        <p>
          <Button variant="contained" sx={{ background: "#d8ebc8" }}>
            {format(range.from, "P")}
          </Button>
        </p>
      );
    } else if (range.to) {
      //to calculate number of days
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const date1Obj = new Date(range.from);
      const date2Obj = new Date(range.to);
      const timeDiff = Math.abs(date2Obj.getTime() - date1Obj.getTime()); // Difference in milliseconds
      const diffDays = Math.round(timeDiff / oneDay) + 1; // Difference in days



      // checkIfRentAvailable(range, reservationsArr)

      footer = (

        <>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between", mt: 4 }}
          >
            <Button variant="contained" sx={{ background: "#d8ebc8" }}>
              {format(range.from, "P")}
            </Button>
            <Button variant="contained" sx={{ background: "#d8ebc8" }}>
              {format(range.to, "P")}
            </Button>
          </Stack>
          <Typography variant="body1" color="initial" sx={{ mt: 4 }}>
            {"total price : " + diffDays * price * currencySelector[SignySelector]}{' '}{CurrencySign[SignySelector]}
          </Typography>
          <Button
            variant="contained"
            disabled={reservitionButtom}
            color="success"
            sx={{ width: "280px" }}
            onClick={()=>handleReserveClick(diffDays * price* 100)}
          >
            reserve
          </Button>
          {showCheckoutForm && clientSecret && (
            <Modal onClose={handleModalClose}>
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm range={range} price={diffDays * price} apartmentId={id} />
              </Elements>
            </Modal>
          )}
        </>
      );
    }
  }
  return (
    <DayPicker
      id="test"
      mode="range"
      disabled={disabledDays}
      selected={range}
      footer={footer}
      onSelect={setRange}
      numberOfMonths={1}
      captionLayout="dropdown-buttons"
      fromYear={2023}
      onchange={() => { console.log("first") }}
      toYear={2030}
    />
  );
};

export default PickerDate;
