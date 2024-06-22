import React, { useState, useRef } from 'react';
import { TextField, Grid, Button, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, IconButton } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import DeleteIcon from '@mui/icons-material/Delete';

function PurchaseOrderHeader() {
  const [hideButtons, setHideButtons] = useState(false);
  const [rows, setRows] = useState([]);
  const printRef = useRef();

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value, amount: field === 'qty' || field === 'unitPrice' ? (field === 'qty' ? value * row.unitPrice : row.qty * value) : row.amount } : row
    );
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, itemName: '', warehouse: '', uom: '', qty: 0, unitPrice: 0, amount: 0 }]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const exportPDF = async () => {
    setHideButtons(true);
    setTimeout(async () => {
      const input = printRef.current;
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('purchase_order.pdf');
      setHideButtons(false);
    }, 100);
  };

  return (
    <Box className="p-2" ref={printRef}>
      <Box sx={{ border: 0.5 }} className='flex justify-center p-2'>
        <Grid item xs={12} sm={6} alignItems="center" textAlign={"center"}>
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
          <Typography variant="h6" paddingLeft={2} paddingTop={1} className="text-xl font-bold">
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
                    &nbsp;
                  </Typography>
                </Box>

                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    &nbsp;
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    &nbsp;
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
                <TableCell sx={{ border: '1px solid black' }}>Sr. No</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Item Name</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Warehouse</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>UOM</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Qty</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Unit Price</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>Amount</TableCell>
                {!hideButtons && <TableCell sx={{ border: '1px solid black' }}>Action</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: '1px solid black' }}>{row.id}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>
                    <TextField
                      value={row.itemName}
                      onChange={(e) => handleInputChange(index, 'itemName', e.target.value)}
                      fullWidth
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: { border: 'none' }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>
                    <TextField
                      value={row.warehouse}
                      onChange={(e) => handleInputChange(index, 'warehouse', e.target.value)}
                      fullWidth
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: { border: 'none' }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>
                    <TextField
                      value={row.uom}
                      onChange={(e) => handleInputChange(index, 'uom', e.target.value)}
                      fullWidth
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: { border: 'none' }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>
                    <TextField
                      type="number"
                      value={row.qty}
                      onChange={(e) => handleInputChange(index, 'qty', parseFloat(e.target.value))}
                      fullWidth
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: { border: 'none' }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>
                    <TextField
                      type="number"
                      value={row.unitPrice}
                      onChange={(e) => handleInputChange(index, 'unitPrice', parseFloat(e.target.value))}
                      fullWidth
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: { border: 'none' }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{row.amount.toFixed(2)}</TableCell>
                 {!hideButtons && <TableCell sx={{ border: '1px solid black' }}>
                    <IconButton onClick={() => removeRow(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell> }
                </TableRow>
              ))}
              {!hideButtons && <TableRow>
                <TableCell sx={{ border: '1px solid black' }}>
                 <Button variant="contained" color="primary" onClick={addRow}>Add Row</Button>
                </TableCell>
                <TableCell sx={{ border: '1px solid black' }} colSpan={7}></TableCell>
              </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container direction="row" sx={{ border: 0.5 }}>
          <Box width={"70%"}>
            <Grid container direction="row" width={"100%"}>
              <Grid width={"50%"}>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    PO Number:
                  </Typography>
                </Box>
              </Grid>
              <Grid width={"50%"}>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    PO Number:
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ border: 0.5 }} width={"30%"}>
            <Grid container direction="row">
              <Grid textAlign={"end"} width={"55%"}>
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
              <Grid width={"45%"} textAlign={"end"}>
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
                    &nbsp;
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    &nbsp;
                  </Typography>
                </Box>
                <Box sx={{ border: 0.5 }} >
                  <Typography variant="h6" className="text-xl font-bold">
                    &nbsp;
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>

      <Box sx={{ border: 0.5 }} paddingTop={0.5} paddingLeft={2} paddingBottom={3} fontWeight={"bold"} >
        <Typography variant="h6" className="text-xl font-bold">
          Narration :
        </Typography>
      </Box>

      <Box >
        <Grid container direction={"row"}>
          <Grid width={"75%"} border={2} paddingBottom={10}>
            <Typography padding={1} variant="h6" className="text-xl font-bold">
              Received By :
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box width={"55%"}>
                <Grid container direction="row">
                  <Typography width={"20%"} paddingLeft={1} variant="h6">
                    Name :
                  </Typography>
                  <Box borderBottom={1} width={"40%"} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}>
                    <Typography paddingLeft={5} width={"100%"}>
                      John Smith
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Grid width={"55%"} paddingRight={10} marginTop={7}>
                <Box borderBottom={1} sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                </Box>
                <Typography textAlign={"center"}>
                  Company Stamp
                </Typography>
              </Grid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Box width={"55%"}>
                <Grid container direction="row">
                  <Typography width={"24%"} paddingLeft={1} variant="h6">
                    Signature :
                  </Typography>
                  <Box borderBottom={1} width={"40%"} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}>
                    <Typography paddingLeft={5} width={"100%"}>
                      John Smith
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Grid width={"55%"} paddingRight={10} container direction={"row"}>
                <Typography width={"23%"} paddingLeft={1} variant="h6">
                  Date :
                </Typography>
                <Box borderBottom={1} width={"40%"} sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}>
                  <Typography paddingLeft={5} width={"100%"}>
                    19 Apr 2024
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid width={"25%"} border={2}>
            <Typography paddingTop={10} paddingLeft={2}>
              Prepared by : <Typography component={"span"} fontWeight={"bold"}>Edwin</Typography>
            </Typography>
            <Typography paddingTop={4} paddingLeft={2}>
              Approved by : <Typography component={"span"} fontWeight={"bold"}>&nbsp;</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box width={"100%"} display="flex" justifyContent={"flex-end"} padding={1}>
      {!hideButtons && <Button  variant="contained" color="secondary" onClick={exportPDF} sx={{ mt: 2, ml: 2 }}>Export to PDF</Button>}

      </Box>

    </Box>
  );
}

export default PurchaseOrderHeader;
