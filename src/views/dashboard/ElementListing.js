import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Form} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import "./Dashboard.css";

function ElementListing(props){
    
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  
  const createForm = (array) => {
    if(array.length > 0){
      return(        
        array.map(function(each){
          const placeholder = 'Enter ' + each.text;
          return(
            <Form.Group>
              <Form.Label>{each.text}</Form.Label>
              <Form.Control type="text" placeholder={placeholder} />
            </Form.Group>
          )
        })          
      );
    } else {
      return []
    }
  }
  const handleOnSelect = (row) => setSelectedRow(row.ID)
  const handleCreate = () => {
    setShowCreate(false);
    // ToDo: Code to create new entry in database
  }
  const handleDelete = () => {
    setShowDelete(false);
    // ToDo: Code to delete row with `selectedRow` id from database
    console.log(selectedRow);
  } 
  
  const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      clickToEdit: true,
      bgColor: '#20202e',
      onSelect: handleOnSelect
    };

  return(
      <Card bg='dark' text='white'>
        <Card.Header className="container-fluid">
          <Row>
            <Col className="md-10">
              <h4>{props.title}</h4>                  
            </Col>
            <Col className="md-2" style={{display: 'flex', justifyContent: 'right'}}>
              <Button className="btn-primary" onClick={() => setShowCreate(true)}>
                <FontAwesomeIcon icon={faPlusSquare}/>
              </Button>
              <Button className="btn-primary" style={{marginLeft: '1em'}} onClick={() => setShowEdit(true)}>
                <FontAwesomeIcon icon={faEdit}/>
              </Button>
              <Button className="btn-danger"style={{marginLeft: '1em'}} onClick={() => { if(selectedRow !== undefined) setShowDelete(true); }}>
                <FontAwesomeIcon icon={faTrashAlt}/>
              </Button>

              {/* Create-Modal */}
              <Modal show={showCreate} onHide={() => setShowCreate(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Create {props.element}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {createForm(props.table.columns)}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowCreate(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleCreate}>
                    Create
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* Edit-Modal */}
              <Modal show={showEdit} onHide={() => setShowEdit(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit {props.element}</Modal.Title>
                </Modal.Header>
                <Modal.Body>To edit a {props.element}, just double-click the corresponding row cell.</Modal.Body>
              </Modal>

              {/* Delete-Modal */}
              <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete {props.element}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the selected {props.element}?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowDelete(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>

            </Col>              
          </Row>            
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <BootstrapTable
              striped
              hover
              bordered={false}
              bootstrap4
              keyField='ID'
              data={ props.table.data }
              columns={ props.table.columns }
              selectRow={ selectRow }
              cellEdit={ cellEditFactory({ 
                mode: 'dbclick',
                // ToDo: Save modified entry to database
                afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
              }) }
              classes="table-dark"
              condensed
            />
          </div>
        </Card.Body>
      </Card>
  );
}

export default ElementListing;