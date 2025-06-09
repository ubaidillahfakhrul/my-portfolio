import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

const styles = {
  cardStyle: {
    borderRadius: 10,
  },
  imgStyle: {
    height: '150px',
    objectFit: 'contain',
    padding: '1rem',
  },
  linkStyle: {
    textDecoration: 'none',
  },
};

const CertificateCard = ({ certificate }) => {
  const theme = useContext(ThemeContext);

  return (
    <a
      href={certificate.url}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.linkStyle}
    >
      <Card
        className="h-100"
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
          color: theme.bsSecondaryVariant,
        }}
        text={theme.bsSecondaryVariant}
      >
        <Card.Img
          variant="top"
          src={`${process.env.PUBLIC_URL}${certificate.image}`}
          alt={certificate.title}
          style={styles.imgStyle}
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
