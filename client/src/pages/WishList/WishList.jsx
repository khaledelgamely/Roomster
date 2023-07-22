import LocationCards from "../../components/Card/LocationCard";
import { useSelector } from "react-redux";

import { SkeletonCard } from "../../utils/SkeletonPage";

function WishList() {
  const { user, loading } = useSelector((state) => {
    return state.user;
  });
  console.log(loading);
  return (
    <>
      {!loading ? <LocationCards cards={user?.favourites} /> : <SkeletonCard />}
    </>
  );
}
export default WishList;
