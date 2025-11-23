'use client';

import { Order } from '../../../_types/product';

interface InvoiceData extends Order {
  invoiceNumber: string;
  invoiceDate: string;
  companyName: string;
  companyAddress: string;
  companyRFC: string;
  companyPhone: string;
  companyEmail: string;
  customerName: string;
  customerRFC?: string;
  customerEmail: string;
}

export const generateInvoicePDF = (order: Order) => {
  // Datos de la empresa (QuickMart)
  const invoiceData: InvoiceData = {
    ...order,
    invoiceNumber: `INV-${order.id}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    companyName: 'QuickMart S.A. de C.V.',
    companyAddress: 'Av. Insurgentes Sur 1602, Piso 9, Col. Crédito Constructor, Benito Juárez, 03940, Ciudad de México, CDMX',
    companyRFC: 'QMK240515K89',
    companyPhone: '+52 (55) 5555-1234',
    companyEmail: 'facturacion@quickmart.com.mx',
    customerName: 'Cliente QuickMart',
    customerRFC: 'XAXX010101000',
    customerEmail: 'cliente@ejemplo.com',
  };

  // Crear el contenido HTML de la factura
  const invoiceHTML = generateInvoiceHTML(invoiceData);

  // Crear una ventana nueva para imprimir
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    
    // Esperar a que se cargue el contenido antes de imprimir
    printWindow.onload = () => {
      printWindow.print();
    };
  }
};

const generateInvoiceHTML = (data: InvoiceData): string => {
  const currentDate = new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Factura ${data.invoiceNumber}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 40px;
      color: #333;
      background: #fff;
    }
    
    .invoice-container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border: 1px solid #e0e0e0;
    }
    
    .invoice-header {
      background: #1a1a1a;
      color: white;
      padding: 40px;
      display: flex;
      justify-content: space-between;
      align-items: start;
    }
    
    .company-info h1 {
      font-size: 32px;
      font-weight: 300;
      letter-spacing: 2px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    .company-info p {
      font-size: 12px;
      opacity: 0.8;
      line-height: 1.6;
    }
    
    .invoice-meta {
      text-align: right;
    }
    
    .invoice-meta h2 {
      font-size: 24px;
      font-weight: 300;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .invoice-meta p {
      font-size: 12px;
      opacity: 0.8;
    }
    
    .invoice-body {
      padding: 40px;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #666;
      margin-bottom: 15px;
      font-weight: 600;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .info-box {
      background: #f8f8f8;
      padding: 20px;
      border-left: 3px solid #1a1a1a;
    }
    
    .info-box h3 {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
      color: #1a1a1a;
      font-weight: 600;
    }
    
    .info-box p {
      font-size: 12px;
      line-height: 1.8;
      color: #555;
    }
    
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    
    .items-table thead {
      background: #f8f8f8;
    }
    
    .items-table th {
      padding: 15px;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
      color: #666;
      border-bottom: 2px solid #1a1a1a;
    }
    
    .items-table td {
      padding: 20px 15px;
      font-size: 12px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .items-table tbody tr:hover {
      background: #fafafa;
    }
    
    .item-name {
      font-weight: 500;
      color: #1a1a1a;
      margin-bottom: 5px;
    }
    
    .item-description {
      font-size: 11px;
      color: #888;
    }
    
    .text-right {
      text-align: right;
    }
    
    .text-center {
      text-align: center;
    }
    
    .totals-section {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;
    }
    
    .totals-table {
      width: 350px;
    }
    
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      font-size: 13px;
    }
    
    .totals-row.subtotal,
    .totals-row.tax,
    .totals-row.shipping {
      color: #666;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .totals-row.total {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      padding-top: 20px;
      border-top: 2px solid #1a1a1a;
      margin-top: 10px;
    }
    
    .invoice-footer {
      background: #f8f8f8;
      padding: 30px 40px;
      border-top: 1px solid #e0e0e0;
    }
    
    .footer-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .footer-item h4 {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
      color: #666;
      font-weight: 600;
    }
    
    .footer-item p {
      font-size: 12px;
      color: #333;
    }
    
    .legal-text {
      font-size: 10px;
      color: #888;
      line-height: 1.6;
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    
    .status-badge {
      display: inline-block;
      padding: 5px 15px;
      background: #1a1a1a;
      color: white;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 2px;
      margin-top: 10px;
    }
    
    @media print {
      body {
        padding: 0;
      }
      
      .invoice-container {
        border: none;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- Header -->
    <div class="invoice-header">
      <div class="company-info">
        <h1>QuickMart</h1>
        <p><strong>RFC:</strong> ${data.companyRFC}</p>
        <p>${data.companyAddress}</p>
        <p><strong>Tel:</strong> ${data.companyPhone}</p>
        <p><strong>Email:</strong> ${data.companyEmail}</p>
      </div>
      <div class="invoice-meta">
        <h2>Factura</h2>
        <p><strong>${data.invoiceNumber}</strong></p>
        <p>Fecha de emisión: ${currentDate}</p>
        <div class="status-badge">PAGADO</div>
      </div>
    </div>

    <!-- Body -->
    <div class="invoice-body">
      <!-- Customer and Order Info -->
      <div class="info-grid">
        <div class="info-box">
          <h3>Facturar a:</h3>
          <p><strong>${data.customerName}</strong></p>
          <p>RFC: ${data.customerRFC}</p>
          <p>Email: ${data.customerEmail}</p>
        </div>
        <div class="info-box">
          <h3>Información del Pedido:</h3>
          <p><strong>Pedido:</strong> ${data.id}</p>
          <p><strong>Fecha de pedido:</strong> ${new Date(data.date).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
          <p><strong>Método de pago:</strong> ${data.paymentMethod}</p>
        </div>
      </div>

      <!-- Shipping Address -->
      <div class="section">
        <div class="section-title">Dirección de Envío</div>
        <div class="info-box">
          <p>${data.shippingAddress}</p>
        </div>
      </div>

      <!-- Items Table -->
      <div class="section">
        <div class="section-title">Productos</div>
        <table class="items-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th class="text-center">Cantidad</th>
              <th class="text-right">Precio Unit.</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.items
              .map(
                (item) => `
              <tr>
                <td>
                  <div class="item-name">${item.product.name}</div>
                  <div class="item-description">${item.product.description.substring(0, 80)}...</div>
                </td>
                <td class="text-center">${item.quantity}</td>
                <td class="text-right">$${item.product.price.toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                })}</td>
                <td class="text-right">$${(item.product.price * item.quantity).toLocaleString('es-MX', {
                  minimumFractionDigits: 2,
                })}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="totals-section">
        <div class="totals-table">
          <div class="totals-row subtotal">
            <span>Subtotal:</span>
            <span>$${data.subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="totals-row tax">
            <span>IVA (16%):</span>
            <span>$${data.tax.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="totals-row shipping">
            <span>Envío:</span>
            <span>${data.shipping === 0 ? 'GRATIS' : '$' + data.shipping.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="totals-row total">
            <span>TOTAL:</span>
            <span>$${data.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="invoice-footer">
      <div class="footer-info">
        <div class="footer-item">
          <h4>Forma de Pago</h4>
          <p>${data.paymentMethod}</p>
        </div>
        <div class="footer-item">
          <h4>Régimen Fiscal</h4>
          <p>Régimen General de Ley</p>
        </div>
        <div class="footer-item">
          <h4>Uso CFDI</h4>
          <p>G03 - Gastos en general</p>
        </div>
      </div>
      
      <div class="legal-text">
        <p>
          <strong>Certificado Digital SAT:</strong> Este documento es una representación impresa de un CFDI.<br>
          <strong>Folio Fiscal:</strong> ${generateUUID()}<br>
          <strong>Sello Digital del CFDI:</strong> ${generateSealHash()}<br>
          <strong>Sello del SAT:</strong> ${generateSealHash()}<br><br>
          Esta factura cumple con los requisitos fiscales del SAT (Servicio de Administración Tributaria).<br>
          Para verificar su autenticidad, puede consultar en www.sat.gob.mx<br><br>
          ¡Gracias por su compra en QuickMart!
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

// Función auxiliar para generar un UUID simulado
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16).toUpperCase();
  });
};

// Función auxiliar para generar un hash simulado del sello digital
const generateSealHash = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let hash = '';
  for (let i = 0; i < 80; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
};
