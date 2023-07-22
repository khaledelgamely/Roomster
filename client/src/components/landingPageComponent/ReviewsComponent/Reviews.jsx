import React from "react";

import { Typography } from "@mui/material";
import ReviewCard from "./ReviewCard";
import "./Review.css";
function Reviews() {
  const items = [
    {
      name: "Mary Johnson",
      description:
        "“We arrived early and we couldn't check but were exhausted. As soon as a room was cleaned and ready we were checked in at 10:30 not 3pm. This was extremely good service from the staff.”",
      image:
        "https://assetblast.b-cdn.net/wp-content/uploads/2022/07/Max1.jpeg",
    },
    {
      name: "James Brown",
      description:
        "“My stay was delightful and very relaxing and staff were very welcoming. Thanks for everything. We look forward to coming back. The shuttle service was efficient.”",
      image:
        "https://d1ousoq467uccj.cloudfront.net/UploadedFiles/17234/bigs/17234_l_1600285175_alejandro-511.jpg",
    },
    {
      name: "Edward Davis",
      description:
        "“The staff at breakfast were helpful and friendly. Nothing was too much trouble.The outside seating area was sheltered and sunny, perfect for relaxing after a long flight”",

      image:
        "https://res.cloudinary.com/ds2uqpwc2/image/upload/v1688862823/users/fxtgji8ees7o9o6enjyi.png",
    },

    {
      name: "Katherine Jones",
      description:
        "“I recently stayed at this hotel and had an amazing experience. The staff was incredibly friendly and accommodating, and they made sure that my stay was comfortable and enjoyable. The room was spacious and well-designed.”",

      image:
        "https://wallpapercrafter.com/th8005/1360082-Rachel-Cook-women-model-blue-eyes-face-simple.jpg",
    },

    {
      name: "Amelia Clark",
      description:
        "“The apartment itself is spacious and well-maintained, with modern appliances and plenty of storage space. I also appreciate the quiet atmosphere of the complex, which is perfect for getting work done or just relaxing.”",

      image:
        "https://images.bursadabugun.com/haber/2021/04/21/1405840-emilia-clarke-marvel-evrenine-katiliyor-60802e5a236e7.jpg",
    },

    {
      name: "Christopher Green",
      description:
        "“I'm really impressed with the amenities and the community feel. The gym is well-equipped and always clean, and the pool area is a great place to relax on a hot day. The common areas are also well-designed.”",

      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk-JBE3k3XLVAd5WO3k0WJItAttfal8kZWHA&usqp=CAU",
    },

    {
      name: "Andrew Thompson",
      description:
        "“The apartment complex is well-maintained and the grounds are always kept clean. The maintenance team is responsive and always fixes issues in a timely manner. The gym and pool areas are well-equipped.”",

      image:
        "https://cdn.shopify.com/s/files/1/0076/0171/7300/files/172e6b08a876140015bed39215ccfc38_480x480.jpg?v=1613980984",
    },

    {
      name: "Michael Johnson",
      description:
        "“I recently stayed at this hotel and I was blown away by the quality of the rooms and the convenience of the location. The rooms were spacious, clean, and well-designed, with comfortable beds.”",

      image: "https://cdn.justluxe.com/classifieds/69895.jpg?comp=2",
    },

    {
      name: "Charlotte Wilson",
      description:
        "“I recently stayed at this hotel and I was blown away by the spa and relaxation area. The spa was beautifully designed and incredibly relaxing, with a great variety of treatments to choose from.”",

      image: "https://www.arogundade.com/Resources/sui-he-BIG2.jpg",
    },
  ];
  let subarrays = [];
  for (let i = 0; i < items.length; i += 3) {
    // Use the slice() method to extract a subarray of 3 elements
    let subarray = items.slice(i, i + 3);
    // Push the subarray to the array of subarrays
    subarrays.push(subarray);
  }
  console.log(subarrays);
  return (
    <div style={{ width: "100vw", marginTop: "100px" }} className="mt-5 ">
      <h5
        className="sliderHeader text-center"
        style={{ fontWeight: "600", color: "#9B9183" }}
      >
        Guests Love...
      </h5>
      <p className="text-center mx-3" style={{ color: "#9b9183" }}>
        99% OF GUESTS RECOMMEND
      </p>
      <div
        style={{ width: "100vw" }}
        id="carouselExampleIndicators"
        className="carousel carousel-dark slide mt-4 "
        data-bs-ride="true"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            className="text-black"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div
          className="carousel-inner review-height p-1"
          style={{ width: "95vw" }}
        >
          <div className="carousel-item active ">
            <div className="  row   justify-content-center  align-items-center">
              {subarrays[0].map((review, index) => (
                <ReviewCard key={index} review={review}></ReviewCard>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row gx-2 justify-content-center  align-items-center">
              {subarrays[1].map((review, index) => (
                <ReviewCard key={index} review={review}></ReviewCard>
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className=" row  justify-content-center  align-items-center">
              {subarrays[2].map((review, index) => (
                <ReviewCard review={review} key={index}></ReviewCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Reviews;
