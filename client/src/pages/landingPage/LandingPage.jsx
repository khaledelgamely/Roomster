import { Header } from "../../components/Header/Header";
import Slider from "../../components/landingPageComponent/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  getApartments,
  getApartmentsState,
} from "../../store/Slices/apartment";
import { useEffect } from "react";
import CounterUp from "../../components/landingPageComponent/CounterUp/CounterUp";
import Reviews from "../../components/landingPageComponent/ReviewsComponent/Reviews";
import Faq from "../../components/landingPageComponent/Faq";

function LandingPage() {
  const dispatch = useDispatch();
  const apartments = useSelector(getApartmentsState);

  useEffect(() => {
    dispatch(getApartments({ page: 1 }));
  }, []);

  return (
    <>
      <Header />
      <Slider apartments={apartments} />
      <CounterUp />
      <Reviews />
      <Faq />
    </>
  );
}

export default LandingPage;
