import "./index.css";

const TableData = ({ row, columns }) => {
    console.log(row)
  return (
    <tr>
      {columns.map((col) => {
        return (
          <td key={col.key} className={col.className}>
            {col.render ? col.render(row) : row[col.key]}
          </td>
        );
      })}
    </tr>
  );
};
export default TableData;
