'use client';
import { useState } from 'react';

const AddList = () => {
    const [listItems, setListItems] = useState([
        "Pakistan has seen a surge in terrorism since ",
        "In response, the government labelled the group as Fitna-al-Khawarij",
        "A statement issued by the Prime Minister's Office said the premier"
    ]);
    const [newItem, setNewItem] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
       
        if (e.key === 'Enter' && newItem.trim()) {
            setListItems([...listItems, newItem.trim()]);
            setNewItem('');
        }
    };

    const handleDelete = (index: number) => {
        const newList = [...listItems];
        newList.splice(index, 1);
        setListItems(newList);
    };
const getHtml = () => {
    debugger
    const html = document.getElementById('custom-list');
    console.log(html);
}
    return (
        <>
        <button onClick={() => getHtml()}>dsfsadf</button>
            <ul className='list-disc list-inside text-sm' id='custom-list'>
                {listItems.map((item, index) => (
                    <li key={index} onDoubleClick={() =>  setNewItem(item)} className="mb-2">{item}</li>
                ))}
            </ul>

            <input 
                type="text" 
                value={newItem}
                onChange={(e) => {setNewItem(e.target.value)}}
                onKeyDown={handleKeyPress}
                placeholder="Type and press Enter to add item..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
            />
        </>
    );
};

export default AddList;