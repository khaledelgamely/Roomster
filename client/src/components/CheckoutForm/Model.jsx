import { Button } from "react-day-picker";

// eslint-disable-next-line react/prop-types
export default function Modal ({ onClose, children }) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          {children}
          <Button
            variant="contained"
            color="error"
            style={{ marginTop: "10px" }}
            onClick={onClose}
          >
            cancel
          </Button>
        </div>
      </div>
    );
  };