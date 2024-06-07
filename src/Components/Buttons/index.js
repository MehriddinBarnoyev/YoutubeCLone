import { Button } from "@mui/material";
import React from "react";

const Buttons = () => {
  const ButtonTitles = [
    "All",
    "Music",
    "Movie",
    "Video",
    "Live stream",
    "Fitness",
    "Sport",
    "Love story",
    "UFC",
    "Ronaldo",
  ];

  return (
    <div className="row">
      <div className="col d-flex  flex-wrap">
        {ButtonTitles.map((title, index) => (
          <Button
            key={index}
            variant="outlined"
            color="primary"
            sx={{
              margin: 1,
              borderRadius: "20px",
              padding: "2px 26px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {title}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default Buttons;
