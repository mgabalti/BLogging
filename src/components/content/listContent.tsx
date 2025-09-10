"use client";

import { Button, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
const ListContent: React.FC = () => {
    const enum listType {
        DISC = "list-disc",
        CIRCLE = "list-circle",
        NONE = "LIST-NONE"
    }
    const [list, setList] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const addToList = (e: React.KeyboardEvent<HTMLInputElement>) => {
        debugger
        if (true) {
            const trimmedValue = inputValue.trim().split('\n');
            if (trimmedValue) {
                setList(trimmedValue);
            }
        }
    }
    const checkli = (e: any) => {
        if (e.target.childElementCount == 1 && e.target.firstChild.innerText.trim() == "" && e.key == 'Backspace') {
            e.preventDefault();
            e.stopPropagation()
        }
    }
    const onPasteHandling = () =>{
        debugger
    }
    return (
        <div>
            <Typography variant="h6" className='' gutterBottom>List </Typography>

            <div className="border  rounded-lg border-gray-300 dark:border-gray-700 overflow-hidden">
                <div className="list-header p-2 bg-gray-100 dark:bg-gray-800">
                    <Button  >
                    <FormatListNumberedOutlinedIcon className='w-2' style={{width:'18px'}} />
                    </Button>
                    <Button  aria-label="add to shopping cart">
                    <ListOutlinedIcon />
                    </Button>
                </div>
                <ul className='list-disc list-inside list-content-ul px-3 py-5 ' onChange={()=>onPasteHandling} onPaste={()=>onPasteHandling} onKeyDown={(e: any) => { checkli(e) }} contentEditable>
                    <li className='pl-2'  >
                        <span>asdf</span>
                    </li>

                </ul>
            </div>


            <div className='mt-8'>

                {/* <TextField
                      label="Add Item"
                      name="item"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {addToList(e) }}
                      fullWidth
                        multiline
                      rows={3}
                      placeholder="Type an item and press Enter..."
                    /> */}

            </div>

        </div>
    );
};

export default ListContent;