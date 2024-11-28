import React, { createContext, useContext, useState } from 'react';

const TableContext = createContext();

export const useTableContext = () => {
    return useContext(TableContext);
};

export const TableProvider = ({ children }) => {
    const [selectedTableAdvanced, setSelectedTableAdvanced] = useState(null);

    return (
        <TableContext.Provider value={{ selectedTableAdvanced, setSelectedTableAdvanced }}>
            {children}
        </TableContext.Provider>
    );
};

