import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import Roomster from "../../API/config";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditReview from "./EditReview";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { removeReview } from "../../store/Slices/apartment";
export default function CardReview({ item }) {
  const { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  const handleDelete = (e, reviewId, userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want delete review",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(removeReview({ reviewId, userId }));
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
          e.target.closest(".reviewCard").parentNode.remove();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return item === undefined ? (
    <></>
  ) : (
    <Card
      className="reviewCard"
      sx={{ mb: 4, boxShadow: 0, position: "relative" }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={
              item.userId?.image?.url === ""
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
                : item.userId?.image?.url
            }
          />
        }
        title={`${item.userId?.fullName}`}
        subheader={`${moment(item.updatedAt).format("MMM YYYY")}`}
      />
      <CardContent
        style={{
          position: "relative",
        }}
      >
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
          value={item.rate}
        />
        {item?.userId?._id == user._id && (
          <div
            style={{
              position: "absolute",
              right: "0",
              top: "-50px",
              cursor: "pointer",
            }}
          >
            <DeleteIcon
              size={30}
              onClick={(e) => handleDelete(e, item._id, item.userId._id)}
              sx={{
                color: "red",
              }}
            />
            <EditReview item={item} />
          </div>
        )}

        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
