import { useState } from "react";
import { Bell, User, BarChart3, FolderKanban, Database, Layers, Search } from "lucide-react";
import * as XLSX from "xlsx";

function App() {

  const [tab, setTab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [hdnFiles, setHdnFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const sheets = {
    returned: "https://docs.google.com/spreadsheets/d/1_LEAS1eL_ESP97S9dkjiwWGdjafWKOd6m5eTqNFFJpM/edit",
    released: "https://docs.google.com/spreadsheets/d/1zsCOHPyxipG0NfQtxFfPcCqTEk_E12HdOGaVvSojVqI/edit",
    prodmap: "https://docs.google.com/spreadsheets/d/11kGj_2q8zO8OW5pA7q6urK2VZ6tXLt9lB_mdF3K_ano/edit",
    baseline: "https://docs.google.com/spreadsheets/d/1w5I3MI2MFfWXLjBZMzxz5LjRpKDekPb6UH4w_3gku7s/edit",
  };

  const openTab = (value) => {
    setLoading(true);
    setTab(value);

    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  const handleExcelUpload = (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    setExcelData(json);
  };

  reader.readAsArrayBuffer(file);
};

const downloadExcel = () => {

  const worksheet = XLSX.utils.aoa_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, `${tab}_updated.xlsx`);


  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    setExcelData(json);
  };

  const handleHdnUpload = (e) => {
  const files = Array.from(e.target.files);

  const newFiles = files.map((file) => ({
    name: file.name,
    url: URL.createObjectURL(file),
  }));

  setHdnFiles([...hdnFiles, ...newFiles]);
};
const filteredFiles = hdnFiles.filter((file) =>
  file.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  reader.readAsArrayBuffer(file);
};
  const Card = ({ title, value, Icon }) => (
    <div
  onClick={() => openTab(value)}
  className="bg-white rounded-xl shadow-sm hover:shadow-lg p-8 flex flex-col items-center justify-center transition transform hover:-translate-y-1 cursor-pointer"
>
      <Icon size={50} className="text-orange-500 mb-4" />
      <p className="font-semibold text-gray-700 text-lg">{title}</p>
    </div>
  );

  if (tab && tab !== "hdn") {
    return (
      <div className="h-screen flex flex-col">

        {/* Navbar */}
        <div className="bg-orange-500 text-white flex items-center justify-between px-10 py-4 shadow-lg">

  <h1 className="font-bold text-2xl">
    OJTBox
  </h1>


  <div className="flex items-center bg-white rounded-lg px-4 py-1 w-96">

    <Search className="text-gray-400 mr-2"/>

    <input
      type="text"
      placeholder="Search..."
      className="outline-none text-black w-full"
    />

  </div>

  <div className="flex items-center gap-6">

  <Bell size={26}/>
  <User size={26}/>

  <button
    onClick={() => setTab(null)}
    className="bg-white text-orange-500 px-4 py-1 rounded-lg font-semibold hover:bg-gray-100"
  >
    Back
  </button>

</div>

</div>  

        {/* Loading */}
        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
          </div>
        )}

        {excelData.length === 0 ? (

  <div className="flex-1 flex flex-col">

  <div className="p-4 flex gap-4">

    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleExcelUpload}
      className="border p-2 rounded"
    />

    <button
      onClick={downloadExcel}
      className="bg-orange-500 text-white px-4 py-1 rounded-lg"
    >
      Download Excel
    </button>

  </div>

  <iframe
    src={sheets[tab]}
    className="flex-1 w-full border-none"
    title="spreadsheet"
  />

</div>

) : (

  <table className="w-full border border-gray-300">

    <tbody>

      {excelData.map((row, i) => (
        <tr key={i} className="border">

          {row.map((cell, j) => (
            <td
              key={j}
              contentEditable
              suppressContentEditableWarning
              className="border px-4 py-2"
              onBlur={(e) => {
                const updated = [...excelData];
                updated[i][j] = e.target.innerText;
                setExcelData(updated);
              }}
            >
              {cell}
            </td>
          ))}

        </tr>
      ))}

    </tbody>

  </table>

)}

      </div>
    );
  }

  return (

    <div className="h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <div className="bg-orange-500 text-white flex items-center justify-between px-8 py-4 shadow-lg">

        <h1 className="font-bold text-2xl">
          OJTBox
        </h1>

        <div className="flex items-center gap-6">

          <Bell size={28}/>
          <User size={28}/>

        </div>

      </div>

      {/* Dashboard */}
      <div className="flex-1 px-16 py-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-8">
  Dashboard Access
</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          <Card title="Returned" value="returned" Icon={Database}/>
          <Card title="Released" value="released" Icon={BarChart3}/>
          <Card title="Prod Map" value="prodmap" Icon={Layers}/>
          <Card title="Web Base Line" value="baseline" Icon={FolderKanban}/>
          <Card title="HDN" value="hdn" Icon={Database}/>

        </div>

      </div>

    </div>

  );
}

export default App;