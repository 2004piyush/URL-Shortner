import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Download, QrCode, Copy, Check } from "lucide-react";

const QRCodeGenerator = ({ url, title = "QR Code" }) => {
  const [copied, setCopied] = useState(false);

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-code-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const copyQRCode = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-300">
          <QrCode className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-purple-600" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex justify-center p-6 bg-white rounded-lg border-2 border-gray-100">
            <QRCode
              id="qr-code"
              value={url}
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox="0 0 256 256"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={copyQRCode} variant="outline" className="flex-1">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy URL
                </>
              )}
            </Button>
            <Button onClick={downloadQR} className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Download QR
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Scan this QR code to visit:</p>
            <p className="font-mono text-xs bg-gray-100 p-2 rounded mt-1 break-all">{url}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeGenerator;