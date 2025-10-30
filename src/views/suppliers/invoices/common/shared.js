export const downloadInvoicePdf = (invoiceId) => {
  const content = `PDF for Invoice ${invoiceId}\nGenerated at: ${new Date().toISOString()}`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoice-${invoiceId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};


