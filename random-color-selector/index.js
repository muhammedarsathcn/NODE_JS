//importing file system module using commonJs approach
const fs = require("fs");
/**
 * fetching colors from the color_ palette.json
 */
fs.readFile("color_ palette.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Error in reading file", err);
  }
  const colors = JSON.parse(data);
  const shuffledColors = colors.sort(() => 0.5 - Math.random());
  const fiveRandomColors = shuffledColors.slice(0, 5);
    /**
     * creating a new file here to store the random five colors
     */
  fs.writeFileSync(
    "randomized_colors.json",
    JSON.stringify(fiveRandomColors, null, 2),
    (err) => {
      console.error("Error in creating file", err);
      return;
    },
    console.log("New File created successfully!!"),
  );
    /**
     * reading the random five colors from the newly created file
     */
  fs.readFile("randomized_colors.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error in reading Randomized color", err);
    }
    const result = JSON.parse(data);
    console.log("Randomized color: ", result);
  });
});
