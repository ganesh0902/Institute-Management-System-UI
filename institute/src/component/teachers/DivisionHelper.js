import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

const dummyData = [
  { id: 1, divCd: "DIV001", divName: "North Zone", regCd: "REG01" },
  { id: 2, divCd: "DIV002", divName: "South Zone", regCd: "REG02" },
  { id: 3, divCd: "DIV003", divName: "East Zone", regCd: "REG03" },
];
const DivisionHelper = ({dialog, onRowSelect }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    setSelectedRow(row);    
    onRowSelect(row);
    setOpenDialog(false);
  };

  useEffect(()=>{

    setOpenDialog(dialog);
  },[]);
  return (
    <div style={{ padding: "20px" }}>
      
      <Modal
        size="lg"
        isOpen={openDialog}
        toggle={() => setOpenDialog(!openDialog)}
      >
        <ModalHeader
          toggle={() => setOpenDialog(!openDialog)}
          style={{ backgroundColor: "#F5F7F8" }}
        >
          Division Details
        </ModalHeader>
        <ModalBody style={{ backgroundColor: "#DDE6ED" }}>
          <Row>
            <Col>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Division Code</th>
                    <th>Division Name</th>
                    <th>Region Code</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((row) => (
                    <tr key={row.id} onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
                      <td>{row.id}</td>
                      <td>{row.divCd}</td>
                      <td>{row.divName}</td>
                      <td>{row.regCd}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DivisionHelper;
