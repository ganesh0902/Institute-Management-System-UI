import React from "react"
const SearchBar=()=>{
    
    return(
        <div className="search-bar">
            <form className="search-form d-flex align-items-center" method="" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter Search Keyword" />
                <button type="submit" title="search">                   
                </button>
                
            </form>
        </div>
    )
}
export default SearchBar