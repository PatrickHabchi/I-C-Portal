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

function Overview() {

  const [activeRowIndex, setActiveRowIndex] = useState(-1);
 
  const { GetData } = useGetDataApi();

  useEffect(() => {
    GetData();
  }, [])
  const userData = useSelector((state) => state.appData?.userData);

  console.log(userData); 

  
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
        Header: "Date",
        accessor: "Date"
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
  ], [])

  const transactionColumns = useMemo(() => [
    {
      Header: "Transaction ID",
      accessor: "transactionID"
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
      Header: "Type",
      accessor: "Type"
    },
    {
      Header: "Date",
      accessor: "Date"
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
], [])

const latestApplicationData = useMemo(() => [
  {
    entityID: "4df4710afg47..",
    fullName:"",
    Date: "31 Oct 2024",
    status: "New"
  },
  {
    entityID: "4df4710afg47..",
    fullName: "Aya I. Joumaa",
    Date: "31 Oct 2024",
    status: "Cancelled"
  },
  {
    entityID: "4df4710afg47..",
    fullName: "Aya I. Joumaa",
    Date: "31 Oct 2024",
    status: "Pending Compliance"
  },
  {
    entityID: "4df4710afg47..",
    fullName: "Aya I. Joumaa",
    Type: "Outward",
    Date: "31 Oct 2024",
    status: "Pending Documents",
  },
  {
    entityID: "4df4710afg47..",
    fullName: "Aya I. Joumaa",
    Type: "Outward",
    Date: "31 Oct 2024",
    status: "Complete",
  },
], [])


const latestTransactionData = useMemo(() => [
    {
      transactionID: "4df4710afg47..",
      fullName: "Aya I. Joumaa",
      Type: "Inward",
      Date: "31 Oct 2024",
      status: "New"
    },
    {
      transactionID: "4df4710afg47..",
      fullName: "Aya I. Joumaa",
      Type: "Inward",
      Date: "31 Oct 2024",
      status: "Cancelled"
    },
    {
      transactionID: "4df4710afg47..",
      fullName: "Aya I. Joumaa",
      Type: "Inward",
      Date: "31 Oct 2024",
      status: "Pending Compliance"
    },
    {
      transactionID: "4df4710afg47..",
      fullName: "Aya I. Joumaa",
      Type: "Outward",
      Date: "31 Oct 2024",
      status: "Pending Documents",
    },
    {
      transactionID: "4df4710afg47..",
      fullName: "Aya I. Joumaa",
      Type: "Outward",
      Date: "31 Oct 2024",
      status: "Complete",
    },
  ], [])


const applicationTable = useTable({ columns: applicationColumns, data: latestApplicationData})

const transactionTable = useTable({ columns: transactionColumns, data: latestTransactionData})


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