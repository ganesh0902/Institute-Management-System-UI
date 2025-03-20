import React, { useEffect, useState } from "react";
import "./DivisionMasterForm.css";
import { FaSearch } from "react-icons/fa";
import DivisionHelper from "./DivisionHelper";

const DivisionMasterForm = () => {

  const[openDialog,setOpeDialog]=useState(false);
  const [selectedDivision, setSelectedDivision] = useState({
    id: "",
    divCd: "",
    divName: "",
    regCd: "",
  });  

  const handleRowData = (rowData) => {
    // Receive data from child
    setSelectedDivision(rowData);
    alert(`Selected Row in parent:\nDivision Code: ${rowData.divCd}\nDivision Name: ${rowData.divName}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedDivision((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const divisionClick=(e)=>{
    e.preventDefault();
    setOpeDialog(openDialog);

  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>Division Master</h2>
        <form>
          <div className="form-grid-3col">
            {/* Column 1 */}
            <div className="form-section">
              <div className="input-group">
                <input type="text" placeholder="Div Id"  name="id"
                value={selectedDivision.id}
                onChange={handleInputChange}/>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); // prevent form submission
                    setOpeDialog(!openDialog); // always open dialog
                  }}
                >
                  <FaSearch />
                </button>
              </div>

              <input type="text" placeholder="Div Cd *" />
              <input type="text" placeholder="Div Pfx" />
              <input type="text" placeholder="Div Name" />
              <input type="text" placeholder="Uc Name" />                            
              <input type="text" placeholder="Address1" />
              <input type="text" placeholder="Uc Address1" />                         
            </div>

            {/* Column 2 */}
            <div className="form-section">   
            <input type="text" placeholder="Address2" />
            <input type="text" placeholder="Uc Address2" />
            <input type="text" placeholder="Address3" />  
            <input type="text" placeholder="Uc Address3" /> 

            <input type="text" placeholder="Phone 1" />
            <input type="text" placeholder="Uc Phone 1" />              
            </div>

            {/* Column 3 (Optional: For future fields or empty) */}
            <div className="form-section">
            <input type="text" placeholder="Phone 2" />
              <input type="text" placeholder="Uc Phone 2" />

              <div className="input-group">
                <input type="text" placeholder="Reg Cd *" />
                <button type="button">
                  <FaSearch />
                </button>
              </div>
              <input type="text" placeholder="Longitude" />
              <input type="text" placeholder="Latitude" />                                                        
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    {openDialog && <DivisionHelper dialog={openDialog} onRowSelect={handleRowData}/>}

    </div>
  );
};

export default DivisionMasterForm;
