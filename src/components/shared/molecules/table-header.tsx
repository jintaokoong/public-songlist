interface Props {
  headers: string[];
}

const TableHeader = (p: Props) => {
  return (
    <thead>
      <tr>
        {p.headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
