import React from "react";
import { Card, Button, Row, Col} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import "./Dashboard.css";

function ElementListing(props){
    
    const selectRow = {
      mode: 'radio',
      clickToSelect: true
    };
    
    return(
        <Card bg='dark' text='white'>
          <Card.Header className="container-fluid">
            <Row>
              <Col className="md-10">
                <h4>{props.title}</h4>                  
              </Col>
              <Col className="md-2" style={{display: 'flex', justifyContent: 'right'}}>
                <Button className="btn-primary"><FontAwesomeIcon icon={faPlusSquare}/></Button>
                <Button className="btn-primary" style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faEdit}/></Button>
                <Button className="btn-danger"style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faTrashAlt}/></Button>
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
                classes="table-dark"
                condensed
              />
            </div>
          </Card.Body>
        </Card>
    );
}

export default ElementListing;