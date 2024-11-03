import { useState } from "react";
import "./App.css";

export const App = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState("false");
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
        qrData
      )}`;
      setImg(url);
    } catch (error) {
      console / error("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && (
        <img src={img} alt="" className="qr-code-image" />
      )}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>
        <input
          type="text"
          value={qrData}
          onChange={(e) => setQrData(e.target.value)}
          id="dataInput"
          placeholder="Enter data for QR code"
        />
        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g., 150):
        </label>
        <input
          type="text"
          value={qrSize}
          onChange={(e) => setQrSize(e.target.value)}
          id="sizeInput"
          placeholder="Enter the image size"
        />
        <button
          className="generate-button"
          disable={loading}
          onClick={generateQR}
        >
          Generate QR Code
        </button>
        <button className="download-button" onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
      <p className="footer">
        Designed By <a href="">Thushakaran</a>
      </p>
    </div>
  );
};

export default App;

