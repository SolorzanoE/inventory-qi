import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

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
      controlsRef.current?.stop();
    }
  }, []);

  const handleClose = () => {
    controlsRef.current?.stop();
    onClose?.();
  };

  return (
    <Box 
      sx={{ 
        position: "relative", 
        width: "100%",
        bottom: 10,  
        height: "100%" 
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "primary.main",
          ":hover": {
            backgroundColor: "primary.main"
          },
          borderRadius: 3,
          padding: "8px 14px"
        }}
      >
        <CloseRoundedIcon color="onPrimary" />
      </IconButton>
      <Box component="video"
        ref={videoRef}
        sx={{ 
          width: "100%", 
          height: "100%", 
          borderRadius: 4,
          objectFit: "cover"
        }}
      />
    </Box>
  );
};

export default ScannerCode;