import React from 'react';
import PropTypes from 'prop-types';

function Titulo({
  backgroundColor,
  textColor,
  fontSize,
  content,
  padding,
  margin,
  fontWeight,
  fontFamily,
  // Adicione mais propriedades conforme necessário
}) {
  const tituloStyles = {
    backgroundColor,
    color: textColor,
    fontSize,
    padding,
    margin,
    fontWeight,
    fontFamily,
    // Adicione outras propriedades de estilo conforme necessário
  };

  return (
    <div style={tituloStyles}>
      <h2>{content}</h2>
    </div>
  );
}

Titulo.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  content: PropTypes.node.isRequired,
  padding: PropTypes.string,
  margin: PropTypes.string,
  fontWeight: PropTypes.string,
  fontFamily: PropTypes.string,
  // Adicione outras propTypes para outras opções de personalização
};

export default Titulo;
