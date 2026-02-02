import React, { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gayatriLogo from "@/assets/gayatri-mata-illustration.png"; 
import html2pdf from "html2pdf.js";

const InvoicePage = () => {
  // Mock static data (later replace with DB values)
  const fromPerson = {
    name: "Gayatri Auto Centre",
    address: "123 Main Street, City, State - 400001",
    phone: "+91 98765 43210",
  };

  const toPerson = {
    name: "John Doe",
    phone: "+91 91234 56789",
  };

  const vehicle = {
    name: "Hero Splendor Plus",
  };

  const items = [
    { description: "Engine Oil Change", price: 850 },
    { description: "Brake Service", price: 1200 },
    { description: "Air Filter Replacement", price: 450 },
  ];

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const invoiceRef = useRef();

  // Download PDF
  const handleDownload = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 0.5,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg animate-fade-in">
      {/* Invoice Content */}
      <div ref={invoiceRef}>
        {/* Header with Logo */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={gayatriLogo}
              alt="Gayatri Mata"
              className="w-16 h-16 rounded-full border"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {fromPerson.name}
            </h1>
          </div>
          {/* Button is outside ref so not included in PDF */}
        </div>

        {/* From / To Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* From */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">From</h2>
            <p className="font-medium">{fromPerson.name}</p>
            <p className="text-sm text-muted-foreground">{fromPerson.address}</p>
            <p className="text-sm text-muted-foreground">
              Phone: {fromPerson.phone}
            </p>
          </div>

          {/* To */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-2">To</h2>
            <p className="font-medium">{toPerson.name}</p>
            <p className="text-sm text-muted-foreground">
              Phone: {toPerson.phone}
            </p>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Vehicle Info
          </h2>
          <p className="font-medium">{vehicle.name}</p>
        </div>

        {/* Invoice Table */}
        <Card className="overflow-hidden mb-6">
          <table className="w-full border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                  Description
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">
                  Price (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="py-3 px-4 text-sm text-foreground">
                    {item.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-right font-medium text-foreground">
                    ₹{item.price}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-muted/50">
                <td className="py-3 px-4 text-sm font-semibold text-foreground text-right">
                  Total
                </td>
                <td className="py-3 px-4 text-sm font-bold text-right text-primary">
                  ₹{total}
                </td>
              </tr>
            </tfoot>
          </table>
        </Card>

        {/* Thank You Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground italic">
            Thank you for choosing <strong>{fromPerson.name}</strong>.  
            For any queries feel free to contact us at{" "}
            <span className="font-medium">{fromPerson.phone}</span>.
          </p>
          <p className="text-sm text-muted-foreground italic">
            -------
          </p>
        </div>
      </div>

      {/* Download Button (outside ref, so not in PDF) */}
      <div className="mt-6 flex justify-end no-print">
        <Button variant="default" onClick={handleDownload}>
          Download Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoicePage;
