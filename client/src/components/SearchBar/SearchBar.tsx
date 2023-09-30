import { useState } from "react";
import "./SearchBar.style.scss";

function SearchBar (){
const [searchTerm, getSearchTerm] = useState("");

  return (
    <input 
      type="search" 
      id="search" 
      placeholder="Search..."
      onChange={
        (e) => getSearchTerm(e.target.value)
      }
      value={searchTerm}
    />
  );
}

export default SearchBar;
