import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef } from "react";

const ScannerCode = ({ onDetect, onClose }) => {
  const videoRef = useRef(null);
  const controlsRef = useRef(null); // Para guardar los controles del escáner

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        const controls = await codeReader.decodeFromVideoDevice(
          undefined, // Usa la cámara por defecto
          videoRef.current,
          (result) => {
            if (result) {
              onDetect(result);
              controls.stop();
            }
          }
        );

        controlsRef.current = controls; // Guardamos el control globalmente
      } catch (error) {
        console.error("Error iniciando cámara:", error);
      }
    };

    startScanner();

    return () => {
      if (controlsRef.current) {
        controlsRef.current.stop();
      }
    };
  }, []);

  const handleClose = () => {
    controlsRef.current.stop();
    onClose?.();
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%", maxWidth: 400 }}>
      <Button
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "6px 10px",
          cursor: "pointer"
        }}
      >
        ✕
      </Button>

      <video
        ref={videoRef}
        style={{ width: "100%", borderRadius: 8 }}
      />
    </Box>
  );
};

export default ScannerCode;
