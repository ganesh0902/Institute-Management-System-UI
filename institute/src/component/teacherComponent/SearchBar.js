import React from "react"
const SearchBar=()=>{
    
    return(
        <div className="search-bar ml-3">
            <form className="search-form  align-items-center" method="" action="#">
                <input type="text" className="form-control" name="query" placeholder="Search" title="Enter Search Keyword" />                
            </form>
        </div>
    )
}
export default SearchBar