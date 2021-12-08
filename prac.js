let newDate = new Date();
console.log(newDate);
for (let i = 0; i < 100; i++) {
  newDate.setDate(newDate.getDate() + 1);
  console.log(
    newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate()
  );
}