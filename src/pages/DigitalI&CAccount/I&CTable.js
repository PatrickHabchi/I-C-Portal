import React, { useEffect, useMemo, useState } from 'react'
import Table from '../../components/Table'
import { useTable } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { capitalizeFirstLetters } from '../../components/features/ValueFormater';
import TableSelect from '../../components/TableSelect';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveButton, setPhoneNumber } from '../../app/DigitalI&CAccountSlice';
import UtcToLocal from '../../utils/UTCToLocal';
import useGetDataApi from '../../api/GetDataApi';

function ICTable() {

    const [activeRowIndex, setActiveRowIndex] = useState(-1);
    const [filterStatus, setFilterStatus] = useState("");
    
    const userData = useSelector((state) => state.appData.userData);

    const { GetData, GetAllUserData } = useGetDataApi();

    useEffect(() => {
        GetAllUserData();
    }, [])

    const dispatch = useDispatch();

        const handleRowClick = async (row) => {
            try {
                const response = await GetData();

                dispatch(setPhoneNumber(row.original.PhoneNumber))
                if (response) {
                    dispatch(setActiveButton("Digital I&C Account Details"));
                }
            } catch (error) {
                console.error(error);
            }
        
        };
        

        const options = {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          };

      const applicationColumns = useMemo(() => [
        {
            Header: "Entity ID",
            accessor: "id"
        },
        {
            Header: "Full Name",
            accessor: "FirstName"
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
            Header: "Date",
            accessor: "DateOfBirth",
            Cell: ({ cell: { value } }) => {
              return <UtcToLocal utcTimestamp={value} options={options} />;
            },
          },
        {
            Header: "Country of Birth",
            accessor: "CountryOfBirth"
        },
        {
            Header: "Status",
            accessor: "Status",
            Cell: ({ cell: { value } }) => {
              if (["New", "Cancelled", "Complete", "Pending Compliance", "Pending Documents"].includes(value)) {
                return <div className={"status " + value?.toUpperCase()}>{capitalizeFirstLetters(value)}</div>
              }
            },
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
        if (!filterStatus) return userData;
        return userData.filter(row => row.Status === filterStatus);
    }, [filterStatus, userData]);
    
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