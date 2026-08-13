type Props = {
    supplied_id: string;
    table_title: string;
    columns: string[];
};

export default function TableDisplay({ supplied_id, table_title, columns }: Props) {
    return (
        <table id={supplied_id}>
            <caption>{table_title}</caption>
            <thead id={`${supplied_id}_head`}>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody id={`${supplied_id}_body`}/>
        </table>
    )
};