import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { LoadingComponents } from "./LoadingComponents";
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Username",
    selector: (row) => row.lastName,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Image",
    selector: (row) => <img src={row.image} width={50} height={50} />,
  },
  {
    name: "Action",
    cell: (row) => <Button color="blue">Delete</Button>,
  },
];

export default function TableComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
  };

  async function fetchData() {
    const data = await fetch("https://dummyjson.com/users");
    const res = await data.json();
    setData(res.users);
    setFilteredData(res.users);
    setIsLoading(false);
  }
  const paginationComponentOptions = {
    rowsPerPageText: "rows per page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!search) {
      setFilteredData(data);
      return;
    }

    const result = data.filter((item) => {
      // Assuming 'username' is the correct property; adjust as necessary
      return item.lastName.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredData(result);
  }, [search, data]);
  return (
    <DataTable
      columns={columns}
      data={data}
      fixedHeader={true}
      fixedHeaderScrollHeight="900px"
      subHeaderComponent={
        <input
          label="Search"
          isClearable
          radius="lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to search..."
          className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      }
      subHeader
      selectableRows
      expandableRows
      expandableRowsComponent={ExpandedComponent}
      progressComponent={<LoadingComponents />}
      progressPending={isLoading}
      onSelectedRowsChange={handleChange}
      pagination
      paginationComponentOptions={paginationComponentOptions}
      actions={<Button color="primary">Export PDF</Button>}
    />
  );
}
