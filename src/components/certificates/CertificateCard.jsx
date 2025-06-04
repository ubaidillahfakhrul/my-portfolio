import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const CertificateCard = ({ certificate }) => {
  return (
    <a href={certificate.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={certificate.image}
          alt={certificate.title}
          style={{ height: '150px', objectFit: 'contain', padding: '1rem' }}
        />
        <Card.Body>
          <Card.Title>{certificate.title}</Card.Title>
          <Card.Text>
            <strong>{certificate.organization}</strong><br />
            <small>Issued: {certificate.issued}</small>
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};

CertificateCard.propTypes = {
  certificate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
    issued: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default CertificateCard;
