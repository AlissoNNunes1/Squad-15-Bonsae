import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Titulo.module.css";

function Titulo({ backgroundColor, textColor, fontSize, content}) {
  const tituloStyles = {
    backgroundColor: backgroundColor || 'transparent',
    color: textColor || '#000',
    fontSize: fontSize || '24px',
    // Adicione outras propriedades de estilo conforme necessário
  };

  return (
    <div className={styles.titulo} style={tituloStyles}>
      <h2>{content}</h2>
    </div>
  );
}

Titulo.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  content: PropTypes.node.isRequired,
  // Adicione outras propTypes para outras opções de personalização
};

export default Titulo;
