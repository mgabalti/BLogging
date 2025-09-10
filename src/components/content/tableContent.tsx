"use client";

import { Button, Typography, Box, IconButton } from '@mui/material';
import React, { useState, useRef } from 'react';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as XLSX from 'xlsx';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddSharpIcon from '@mui/icons-material/AddSharp';
interface TableData {
  headers: string[];
  rows: string[][];
}

const TableContent: React.FC = () => {
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];

        if (jsonData.length > 0) {
          const headers = jsonData[0];
          const rows = jsonData.slice(1);

          setTableData({
            headers: headers,
            rows: rows
          });
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please make sure it\'s a valid Excel file.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCellEdit = (rowIndex: number, colIndex: number, value: string) => {
    if (!tableData) return;

    const newRows = [...tableData.rows];
    newRows[rowIndex][colIndex] = value;

    setTableData({
      ...tableData,
      rows: newRows
    });
  };

  const handleHeaderEdit = (colIndex: number, value: string) => {
    debugger
    if (!tableData) return;

    const newHeaders = [...tableData.headers];
    newHeaders[colIndex] = value;

    setTableData({
      ...tableData,
      headers: newHeaders
    });
  };

  const addRow = () => {
    if (!tableData) return;

    const newRow = new Array(tableData.headers.length).fill('');
    setTableData({
      ...tableData,
      rows: [...tableData.rows, newRow]
    });
  };

  const addColumn = () => {
    if (!tableData) return;

    setTableData({
      headers: [...tableData.headers, 'New Column'],
      rows: tableData.rows.map(row => [...row, ''])
    });
  };

  const deleteRow = (rowIndex: number) => {
    if (!tableData) return;

    const newRows = tableData.rows.filter((_, index) => index !== rowIndex);
    setTableData({
      ...tableData,
      rows: newRows
    });
  };

  const deleteColumn = (colIndex: number) => {
    if (!tableData) return;

    setTableData({
      headers: tableData.headers.filter((_, index) => index !== colIndex),
      rows: tableData.rows.map(row => row.filter((_, index) => index !== colIndex))
    });
  };

  const clearTable = () => {
    setTableData(null);
    setIsEditing(false);
  };

  return (
    <div>
      <Typography variant="h6" className='' gutterBottom>Table</Typography>

      <div className="border rounded-lg border-gray-300  dark:border-gray-700 overflow-hidden">
        <div className="list-header p-2 bg-gray-100 dark:bg-gray-800">
          <Button
            variant="outlined"
            size="small"
            className='dark:text-gray-400 dark:border-gray-400 text-xs'
            onClick={() => fileInputRef.current?.click()}
            startIcon={<FontAwesomeIcon icon={faFileExcel} className="h-4 w-4 mr-2" />
            }
            sx={{ mr: 1 }}
          >
            Upload Excel
          </Button>
          {tableData && (
            <>
              <Button
                size="small"
                onClick={() => setIsEditing(!isEditing)}
                sx={{ mr: 1 }}
              >
                {isEditing ? 'View' : 'Edit'}
              </Button>
              <Button
                size="small"
                onClick={addRow}
                sx={{ mr: 1 }}
                startIcon={<AddSharpIcon className="me-0" />}
              >
                Row
              </Button>
              <Button
                size="small"
                onClick={addColumn}
                sx={{ mr: 1 }}
              >
                Column
              </Button>
              <Button
                size="small"
                onClick={clearTable}
                color="error"
              >
                Clear
              </Button>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />

        {tableData ? (
          <Box sx={{ p: 2 }}>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    {tableData.headers.map((header, colIndex) => (
                      <th key={colIndex} className="border border-gray-300  dark:border-gray-700 px-4 py-2 text-left font-bold">
                        {isEditing ? (
                          <div className="flex items-center">
                            <input
                              value={header}
                              type='file'
                              accept=".xlsx, .xls, .csv"
                              onChange={(e) => handleHeaderEdit(colIndex, e.target.value)}
                              className="border-none bg-transparent font-bold w-full outline-none"
                            />
                            <IconButton
                              size="small"
                              onClick={() => deleteColumn(colIndex)}
                              sx={{ ml: 1 }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </div>
                        ) : (
                          header
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="border border-gray-300  dark:border-gray-700 px-4 py-2 dark:text-gray-400">
                          {isEditing ? (
                            <div className="flex items-center">
                              <input
                                value={cell}
                                onChange={(e) => handleCellEdit(rowIndex, colIndex, e.target.value)}
                                className="border-none bg-transparent w-full outline-none"
                              />
                              {colIndex === 0 && (
                                <IconButton
                                  size="small"
                                  onClick={() => deleteRow(rowIndex)}
                                  sx={{ ml: 1 }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              )}
                            </div>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>
        ) : (
          <Box sx={{ p: 0, textAlign: 'center' }}>                           

            <input type="file"  name=""  onChange={(e) => handleHeaderEdit(1, e.target.value)}  accept=".xlsx, .xls, .csv" id="uploadExvelId" hidden />
            <label htmlFor="uploadExvelId" className=' relative zindex-10 select-none p-12 block'>

            <TableChartOutlinedIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <p  className="text-gray-400">
              Upload an Excel file to convert it to a table
            </p>
            </label>
          </Box>
        )}
      </div>
    </div>
  );
};

export default TableContent;