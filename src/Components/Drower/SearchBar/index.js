import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchBarWrapper from "./SearchBarWrapper";

export default function SearchBar() {

  return (
    <SearchBarWrapper className="form-controw-100">
       <Box sx={{ paddingLeft: "50%" }}>
            {/* <SearchBar /> */}
            {/* <input type="search" className="form-control w-100" placeholder='Search'  /> */}
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username with two button addons"
              />
              <button class="btn btn-outline-secondary">
                <KeyboardIcon/>
              </button>
              <button class="btn btn-outline-secondary" type="button">
              <SearchIcon/>
              </button>
            </div>
          </Box>
    </SearchBarWrapper>
  );
}
