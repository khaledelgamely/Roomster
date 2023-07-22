exports.checkIfRentAvailable = (newRent, rentedArr) => {
  for (let i = 0; i < rentedArr.length; i++) {
    //dummy  rents : [[5,9],[15,20]]
    const rentedStartDate = rentedArr[i].startDate;
    const rentedEndDate = rentedArr[i].endDate;
    const newStart = new Date(newRent.startDate);
    const newEnd = new Date(newRent.endDate);
    if (
      newEnd < newStart || // try to rent [12,7]
      (newStart >= rentedStartDate && // try to rent [7,12]
        newStart <= rentedEndDate) ||
      (newEnd >= rentedStartDate && // try to rent [4,8]
        newEnd <= rentedEndDate) ||
      (newStart < rentedStartDate && newEnd > rentedEndDate) // try to rent [4,12]
    ) {
      return false; // rental period overlaps with a previously rented period
    }
  }
  return true; // rental period is free
};

exports.removeEndedRents = (rentedArr) => {
  for (let i = rentedArr.length - 1; i >= 0; i--) {
    if (rentedArr[i].endDate < new Date()) {
      console.log("removing: ");
      rentedArr.splice(i, 1);
    }
  }
  return rentedArr;
};

exports.addRentToArr = (newRent, rentedArr) => {
  console.log("Added new rent");
  // const newStart = new Date(newRent.startDate);
  // Find the correct index to insert the new rental period
  let insertIndex = rentedArr.length;
  for (let i = 0; i < rentedArr.length; i++) {
    //dummy  rents : [[5,9],[15,20]]
    if (rentedArr[i].startDate > new Date(newRent.startDate)) {
      insertIndex = i; // add to rents [22,25]
      break;
    }
  }
  // Insert the new rental period at the correct index
  rentedArr.splice(insertIndex, 0, newRent);
  return rentedArr;
};

exports.deleteCanceledRent = (rentedArr, reservationId) => {
  // for (let i = rentedArr.length - 1; i >= 0; i--) {
  //   if (rentedArr[i].reservationId === reservationId) {
  //     console.log("removing: ");
  //     rentedArr.splice(i, 1);
  //   }
  // }
  rentedArr = rentedArr.filter((reservation) => {
    reservation.reservationId !== reservationId;
  });
  return rentedArr;
};
