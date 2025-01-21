import React, { useMemo, useState } from 'react'
import Table from '../../components/Table'
import { useTable } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { capitalizeFirstLetters } from '../../components/features/ValueFormater';
import TableSelect from '../../components/TableSelect';
import { useDispatch } from 'react-redux';
import { setActiveButton } from '../../app/DigitalI&CAccountSlice';

function ICTable() {

    const [activeRowIndex, setActiveRowIndex] = useState(-1);
    const [filterStatus, setFilterStatus] = useState("");
    const [selectedRow, setSelectedRow] = useState(null)
    const dispatch = useDispatch();

        const handleRowClick = (row) => {
            dispatch(setActiveButton("Digital I&C Account Details"));
        };
        
    const ICData = useMemo(() => [
        {
          entityID: "4df4710afg47..",
          fullName: "Aya I. Joumaa",
          CreationDate: "31 Oct 2024",
          Type: "Individual",
          DateOfBirth: "10/09/1987",
          CountryOfBirth: "Lebanon",
          status: "New"
        },
        {
        entityID: "4df4710afg47..",
        fullName: "Aya I. Joumaa",
        CreationDate: "31 Oct 2024",
        Type: "Individual",
        DateOfBirth: "10/09/1987",
        CountryOfBirth: "Lebanon",
        status: "Cancelled"
        },
        {
        entityID: "4df4710afg47..",
        fullName: "Aya I. Joumaa",
        CreationDate: "31 Oct 2024",
        Type: "Individual",
        DateOfBirth: "10/09/1987",
        CountryOfBirth: "Lebanon",
        status: "Pending Compliance"
        },
        {
        entityID: "4df4710afg47..",
        fullName: "Aya I. Joumaa",
        CreationDate: "31 Oct 2024",
        Type: "Individual",
        DateOfBirth: "10/09/1987",
        CountryOfBirth: "Lebanon",
        status: "Pending Documents"
        },
        {
        entityID: "4df4710afg47..",
        fullName: "Aya I. Joumaa",
        CreationDate: "31 Oct 2024",
        Type: "Individual",
        DateOfBirth: "10/09/1987",
        CountryOfBirth: "Lebanon",
        status: "Complete"
        },
      ], [])

      const applicationColumns = useMemo(() => [
        {
            Header: "Entity ID",
            accessor: "entityID"
        },
        {
            Header: "Full Name",
            accessor: "fullName"
        },
        {
            Header: "",
            accessor: "details",
            Cell: ({ row }) => (
                <button className="showmore" onClick={() => setActiveRowIndex(row.index)}>
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
            ),
        },
        {
            Header: "Creation Date",
            accessor: "CreationDate"
        },
        {
            Header: "Type",
            accessor: "Type"
        }, 
        {
            Header: "Date of Birth",
            accessor: "DateOfBirth"
        },
        {
            Header: "Country of Birth",
            accessor: "CountryOfBirth"
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ cell: { value } }) => {
                if (["new", "cancelled", "complete", "pending compliance", "pending documents"].includes(value.toLowerCase())) {
                    return <div className={"status " + value?.toUpperCase()}>{capitalizeFirstLetters(value)}</div>
                }
            }
        },
        {
            Header: "",
            accessor: "detailsUser",
            Cell: ({ row }) => {
                return (
                    <FontAwesomeIcon icon={faGreaterThan} />
                )
            }
        },
    ], [])

    
    const filteredData = useMemo(() => {
        if (!filterStatus) return ICData;
        return ICData.filter(row => row.status.toLowerCase() === filterStatus.toLowerCase());
    }, [filterStatus, ICData]);
    
    const applicationTable = useTable({ columns: applicationColumns, data: filteredData})


  return (
    <>
    <div className='ICTable'>

    <div className='application-status'>
                <div className='tabs'>
                    <button
                        className={`tab-button ${filterStatus === "" ? "active" : ""}`}
                        onClick={() => setFilterStatus("")}
                    >
                        All Applications (1643)
                    </button>
                </div>
                <div className='tabs'>
                    <button
                        className={`tab-button ${filterStatus === "New" ? "active" : ""}`}
                        onClick={() => setFilterStatus("New")}
                    >
                        New (3)
                    </button>
                </div>
                <div className='tabs'>
                    <button
                        className={`tab-button ${filterStatus === "Pending Compliance" ? "active" : ""}`}
                        onClick={() => setFilterStatus("Pending Compliance")}
                    >
                        Pending Compliance (14)
                    </button>
                </div>
                <div className='tabs'>
                    <button
                        className={`tab-button ${filterStatus === "Pending Documents" ? "active" : ""}`}
                        onClick={() => setFilterStatus("Pending Documents")}
                    >
                        Pending Documents (10)
                    </button>
                </div>
                <div className='tabs'>
                    <button
                        className={`tab-button ${filterStatus === "Complete" ? "active" : ""}`}
                        onClick={() => setFilterStatus("Complete")}
                    >
                        Completed (1543)
                    </button>
                </div>
                <div className='tabs'>
                    <button
                        className={`tab-button ${filterStatus === "Cancelled" ? "active" : ""}`}
                        onClick={() => setFilterStatus("Cancelled")}
                    >
                        Cancelled (36)
                    </button>
                </div>
            </div>

        <div className='table'>

        <div className='filtering'>
            <div className='searchfiltering'>
                <input 
                    type='text'
                    className='search'
                    placeholder='Search'
                />
            </div>
            <div className='selectfiltering'>
                <select
                    className='ddselect'
                >
                    <option value={""}>This month</option>
                    <option value={""}>This month</option>
                    <option value={""}>This month</option>
                    <option value={""}>This month</option>
                </select>
            </div>
        </div>
        {}
        <TableSelect
                    headerGroups={applicationTable.headerGroups}
                    page={applicationTable.rows}
                    prepareRow={applicationTable.prepareRow}
                    getTableProps={applicationTable.getTableProps}
                    getTableBodyProps={applicationTable.getTableBodyProps}
                    activeRowIndex={activeRowIndex}
                    setActiveRowIndex={setActiveRowIndex}
                    handleRowClick={handleRowClick}
                />
        </div>


    </div>
    
    </>
  )
}

export default ICTable;