import React from 'react';
import './alert.module.css'; // Arquivo CSS para estilos

const Alert = ({ message, alertType }) => {
  const getAlertStyle = () => {
    switch (alertType) {
      case 'error':
        return {
          color: 'var(--feedback-error-dark, #8C0F14)',
        };
      case 'success':
        return {
          color: 'green', // Cor verde para sucesso (pode ser alterada conforme necessário)
        };
      case 'warning':
        return {
          color: 'orange', // Cor laranja para alertas (pode ser alterada conforme necessário)
        };
      default:
        return {}; // Estilo padrão se nenhum tipo específico for fornecido
    }
  };

  const alertStyle = getAlertStyle();

  return (
    <div className="alert-container">
      <p style={alertStyle}>{message}</p>
    </div>
  );
};

export default Alert;
