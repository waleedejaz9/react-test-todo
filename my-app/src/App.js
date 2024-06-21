import React, { useState } from 'react';
import { TextField, Grid, Button, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function PurchaseOrderHeader() {
  const [rows, setRows] = useState([]);
  const handleChange = (index, field, value) => {
    const newRow = [...rows];
    newRow[index][field] = value;
    newRow[index].amount = newRow[index].qty * newRow[index].rate; // Automatically calculate amount
    setRows(newRow);
  };

  const handleAddRow = () => {
    const newItem = { item: '', warehouse: '', qty: '', rate: '', amount: '' };
    setRows([...rows, newItem]);
  };
  const handleExport = () => {
    const doc = new jsPDF();
    doc.text('Purchase Order', 20, 10);
    doc.autoTable({
      theme: 'grid',
      head: [['Item Name', 'Warehouse', 'Qty', 'Rate', 'Amount']],
      body: rows.map(row => [row.item, row.warehouse, row.qty, row.rate, row.amount.toString()]),
      startY: 20,
      margin: { horizontal: 10 },
      styles: { overflow: 'linebreak' },
      bodyStyles: { valign: 'top' },
      columnStyles: { email: { cellWidth: 'wrap' } },
      showHead: 'everyPage'
    });
    doc.save('purchase-order.pdf');
  };
  return (
    <div className="p-2">
      <Box sx={{ border: 0.5 }} className='flex justify-center p-2'>
        <Grid item xs={12} sm={6} alignItems="center">
          <Typography variant="h6" className="text-lg font-bold">
            CONNECT COFFEE COMPANY LTD
          </Typography>
          <div className="text-sm">
            <p>Off Riverside drive, Chiromo</p>
            <p>P.O. Box 66010-00800</p>
            <p>Tel: 0748812404</p>
            <p>www.connectcoffee.net NAIROBI, KENYA</p>
          </div>
        </Grid>
      </Box>
      <Box sx={{ border: 0.5 }} className="flex justify-center">
        <Typography variant="h6" className="text-xl font-bold">
          Purchase Order
        </Typography>
      </Box>
      <Box sx={{ border: 0.5 }}>
        <Grid container direction="row" justifyContent="space-between">

          <Typography variant="h6" className="text-xl font-bold">
            Puratos Kenya Ltd
          </Typography>

          <Box sx={{ border: 0.5 }}>
            <Grid container direction="row">
              <Grid >
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    PO Number:
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    PO Date:
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    Quotation No:
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    Quotation Date:
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    Reference:
                  </Typography>
                </Box>
              </Grid>
              <Grid >
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    P00202020609
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    19-Apr-2024
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">

                  </Typography>
                </Box>

                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                  </Typography>
                </Box>

              </Grid>

            </Grid>

          </Box>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      size="small"
                      value={row.item}
                      onChange={(e) => handleChange(index, 'item', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={row.warehouse}
                      onChange={(e) => handleChange(index, 'warehouse', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={row.qty}
                      onChange={(e) => handleChange(index, 'qty', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={row.rate}
                      onChange={(e) => handleChange(index, 'rate', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={row.amount}
                      InputProps={{
                        readOnly: true,
                      }}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <Grid container direction="row"  justifyContent={"space-between"} sx={{ border: 0.5 }}>
          <Box sx={{ border: 0.5 }}>
            <Grid container direction="row">
              <Grid >
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    PO Number:
                  </Typography>
                </Box>


              </Grid>
              <Grid >
                <Box >
                  <Typography variant="h6" className="text-xl font-bold">
                    P00202020609
                  </Typography>
                </Box>

                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                  </Typography>
                </Box>
              </Grid>

            </Grid>

          </Box>

          <Box sx={{ border: 0.5 }}>
            <Grid container direction="row">
              <Grid >
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    PO Number:
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    PO Date:
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    Quotation No:
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    Quotation Date:
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    Reference:
                  </Typography>
                </Box>
              </Grid>
              <Grid >
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    P00202020609
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    19-Apr-2024
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">

                  </Typography>
                </Box>

                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                  </Typography>
                </Box>

              </Grid>

            </Grid>

          </Box>
        </Grid>
      </Box>
    </div>
  );
}

export default PurchaseOrderHeader;
