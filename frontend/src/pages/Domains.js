import React from 'react';
import { Card } from 'react-bootstrap';
import TopBar from '../components/TopBar';
 
const LegalDomains = () => {
  return (
    <>
    <TopBar/>
    <div className="container">
        <li>
            <ul>Real Estate</ul>
            <ul>Construction</ul>
            <ul>Corporate</ul>
            <ul>Pubic administration</ul>
        </li>

      {/* <div className="row m-2">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Card className="shadow-sm">
            <Card.Img variant="top" src="https://aws.wideinfo.org/lawrenca.com/wp-content/uploads/2023/04/24173016/The-Five-Most-Common-Causes-of-Real-Estate-Litigation-scaled-1.jpg" />
            <Card.Body>
              <Card.Title>Real Estate</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row m-2">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Card className="shadow-sm">
            <Card.Img variant="top" src="https://app.croneri.co.uk/sites/default/files/legislation%20in%20construction_resized.jpg" />
            <Card.Body>
              <Card.Title>Construction</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row m-2">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Card className="shadow-sm">
            <Card.Img variant="top" src="https://via.placeholder.com/150" />
            <Card.Body>
              <Card.Title>Corporate</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row m-2">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <Card className="shadow-sm">
            <Card.Img variant="top" src="https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/05/23/Pictures/_aa2d296c-7d70-11e9-9a75-14b5d08877bf.jpg" />
            <Card.Body>
              <Card.Title style={{textAlign:'center'}}>Public administration</Card.Title>
              <Card.Text style={{fontSize:'small'}}>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div> */}
    </div>
    </>
  );
};

export default LegalDomains;
