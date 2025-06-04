import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.1em',
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
  },
  introImageContainer: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '400px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown>{text}</ReactMarkdown>
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
  <>
    <Header title={header} />
    <div className="section-content-container">
      <Container>
        {data ? (
          <Fade>
            <Row className="align-items-center">
              {/* TEXT SECTION */}
              <Col xs={12} md={7}>
                <div style={{
                  whiteSpace: 'pre-wrap',
                  fontSize: '1.2em',
                  fontWeight: 500,
                  textAlign: 'justify',
                  maxWidth: '600px',
                  marginBottom: '20px',
                }}>
                  <ReactMarkdown>{data.about}</ReactMarkdown>
                </div>
              </Col>

              {/* IMAGE SECTION */}
              <Col xs={12} md={5} style={{ textAlign: 'center' }}>
                <img
                  src={data?.imageSource}
                  alt="profile"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '400px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                  }}
                />
              </Col>
            </Row>
          </Fade>
        ) : (
          <FallbackSpinner />
        )}
      </Container>
    </div>
  </>
);

}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
