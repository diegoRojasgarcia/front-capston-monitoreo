import { useEffect, useState } from "react";

const ConfirmDialog = ({ message, isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        const closeTimer = setTimeout(() => {
          onClose();
        }, 300); // Tiempo de la transición de salida

        return () => clearTimeout(closeTimer);
      }, 2000); // La barra se cierra automáticamente después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 bg-green-200 text-white text-center py-3 transition-transform transform ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ transitionDuration: "300ms" }}
    >
      <p>{message}</p>
    </div>
  );
};

export default ConfirmDialog;
