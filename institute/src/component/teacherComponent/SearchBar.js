import { Input } from "reactstrap"

const SearchBar=()=>{
    
    return(
        <div className="search-bar">
            <form className="search-form d-flex align-items-center" method="" action="#">
                <Input type="text" name="query" placeholder="Search" title="Enter Search Keyword" />
                <button type="submit" title="search">
                   <i className="bi bi-search"></i> 
                </button>
                
            </form>
        </div>
    )
}
export default SearchBar