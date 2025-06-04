import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import CertificateCard from './certificates/CertificateCard';
import FallbackSpinner from './FallbackSpinner';

const Certificates = ({ header }) => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.certificates)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container style={{ marginBottom: 25 }}>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.certificates?.slice(0, numberOfItems).map((item) => (
                <Fade key={item.title}>
                  <CertificateCard certificate={item} />
                </Fade>
              ))}
            </Row>
            {!showMore && (
              <Button
                style={{ margin: 25 }}
                variant={theme.bsSecondaryVariant}
                onClick={() => setShowMore(true)}
              >
                Show more
              </Button>
            )}
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Certificates.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Certificates;
