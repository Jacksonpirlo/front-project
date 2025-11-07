interface tbody {
    email: string;
    password: string
    edit: () => void
    delete: () => void
}

export interface TableProps {
    title: string;
    thead: string;
    tbodyItems: tbody[];
    onClick: () => void; 
    onChange: () => void
}