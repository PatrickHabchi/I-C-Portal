import React, { useEffect, useMemo, useState } from 'react'
import HeaderComponent from '../components/HeaderComponents'
import AccountsSection from '../components/Overview/AccountsSection'
import '../utils/Style/pages/Overview.scss'
import OrdersSection from '../components/Overview/OrdersSection'
import { useTable } from "react-table";
import Table from '../components/Table'
import { capitalizeFirstLetters } from '../components/features/ValueFormater'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import useGetDataApi from '../api/GetDataApi'
import { useDispatch,useSelector } from "react-redux";
import UtcToLocal from '../utils/UTCToLocal'

function Overview() {

  const [activeRowIndex, setActiveRowIndex] = useState(-1);
 
  const { GetData, GetAllUserData } = useGetDataApi();
  const userData = useSelector((state) => state.appData.userData);

  useEffect(() => {
    GetAllUserData();
  }, []);


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
        Header: "Date",
        accessor: "DateOfBirth",
        Cell: ({ cell: { value } }) => {
          return <UtcToLocal utcTimestamp={value} options={options} />;
        },
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
  ], [])

  const transactionColumns = useMemo(() => [
    {
      Header: "Transaction ID",
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
      Header: "Status",
      accessor: "Status",
      Cell: ({ cell: { value } }) => {
        if (["New", "Cancelled", "Complete", "Pending Compliance", "Pending Documents"].includes(value)) {
          return <div className={"status " + value?.toUpperCase()}>{capitalizeFirstLetters(value)}</div>
        }
      },
    },
], [])



const applicationTable = useTable({ columns: applicationColumns, data: userData})

const transactionTable = useTable({ columns: transactionColumns, data: userData})


  return (
    <>
      <HeaderComponent title={"Overview"} />
      <div className='OverviewPage'>

        <div className='accounts-box'>

          <AccountsSection
            cardTitle={"POOL USD ACCOUNT"}
            currency={"$"}
            balance={"1,254,000"}
            amountCurrency={"$"}
            amount={"22,000"}

          />
          <AccountsSection
            cardTitle={"TOTAL I&C DIGITAL ACCOUNTS"}
            balance={1543} amountCurrency={"$"}
            amount={"1500"}
            amount1={"43"}

          />

        </div>

        <div className='Orders'>

          <div className='title'>
            New Orders
          </div>

          <div className='orders-box'>
            <OrdersSection
              orderNumber={"3"}
              orderTitle={"New Application For I&C"}
              count={"14"}
              cardImage={"/Images/newApplicationI&C.png"}
            />

            <OrdersSection
              orderNumber={"12"}
              orderTitle={"Inward Transfers"}
              count={"14"}
              cardImage={"/Images/newApplicationI&C.png"}
            />

            <OrdersSection
              orderNumber={"23"}
              orderTitle={"Outward Transfers"}
              count={"14"}
              cardImage={"/Images/newApplicationI&C.png"}
            />

          </div>
        </div>

        <div className='tables'>
            <div className='LatestApplication'>
              <div className='table-title'>
                  Latest Applications
              </div>
                <Table
                    headerGroups={applicationTable.headerGroups}
                    page={applicationTable.rows}
                    prepareRow={applicationTable.prepareRow}
                    getTableProps={applicationTable.getTableProps}
                    getTableBodyProps={applicationTable.getTableBodyProps}
                    activeRowIndex={activeRowIndex}
                    setActiveRowIndex={setActiveRowIndex}
                />
                <div className='view-all'>
                  <button className='view-btn'>
                    View All
                  </button>
                </div>
            </div>

            <div className='LatestTransaction'>
            <div className='table-title'>
                  Latest Transaction
              </div>
                <Table
                    headerGroups={transactionTable.headerGroups}
                    page={transactionTable.rows}
                    prepareRow={transactionTable.prepareRow}
                    getTableProps={transactionTable.getTableProps}
                    getTableBodyProps={transactionTable.getTableBodyProps}
                    activeRowIndex={activeRowIndex}
                    setActiveRowIndex={setActiveRowIndex}
                />
                 <div className='view-all'>
                  <button className='view-btn'>
                    View All
                  </button>
                </div>
            </div>
        </div>

      </div>
    </>
  )
}

export default Overview