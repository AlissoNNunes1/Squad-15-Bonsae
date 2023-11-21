import React from 'react';
import PropTypes from 'prop-types';
import styles from "./Titulo.module.css";

function Titulo({ backgroundColor, textColor, fontSize }) {
  const tituloStyles = {
    backgroundColor: backgroundColor || 'transparent',
    color: textColor || '#000',
    fontSize: fontSize || '24px',
    // Adicione outras propriedades de estilo conforme necessário
  };

  return (
    <div className={styles.titulo} style={tituloStyles}>
      <h2>Título da página</h2>
    </div>
  );
}

Titulo.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  // Adicione outras propTypes para outras opções de personalização
};

export default Titulo;
