import React, { useState, useRef, useEffect } from "react";
import {
  faArrowUp,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../utils/Style/common.scss";
// import EmptyTransactionsMessage from "./EmptyTransactionsMessage";
import { useSelector } from "react-redux";
import "./../utils/Style/common.scss";

const Table = (props) => {
  const componentRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // const { activeRowIndex } = useSelector(
  //   (state) => state.transactionDetails.request
  // );

  useEffect(() => {
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () =>
        setScreenWidth(window.innerWidth)
      );
  }, []);

  return (
    <>
      {screenWidth < 768 ? (
        // <div id="table-container-mobile" ref={componentRef}>
        //     {props.headerGroups.map((headerGroup) => (
        //         <div {...headerGroup.getHeaderGroupProps()} className="theader">
        //             {headerGroup.headers.map((column) => (
        //                 <div {...column.getHeaderProps(column.getSortByToggleProps())} className="eachone">
        //                     {column.render("BillsHeader")}
        //                     <span>
        //                         {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faSortDown}/> :
        //                             <FontAwesomeIcon icon={faArrowUp}/>) : <FontAwesomeIcon icon={faSort}/>}
        //                     </span>
        //                 </div>
        //             ))}
        //         </div>
        //     ))}
        //     {props.page.map((row) => {
        //         props.prepareRow(row);
        //         const isActive = props.activeRowIndex === row.index;
        //
        //         return (
        //             <div {...row.getRowProps()} className={` tbody ${isActive ? "tractive" : ""}`}>
        //                 {isActive ? <button className="showmoreactive" onClick={() => {
        //                         props.setActiveRowIndex(-1)
        //                     }}><FontAwesomeIcon icon={faArrowUp}/></button>
        //                     : <></>}
        //
        //                 {row.cells.map((cell) => (
        //                     <div {...cell.getCellProps()}
        //                          className={`eachone ${isActive ? "tdactive" : ""}`}>
        //                         {cell.render("Cell")}
        //                     </div>
        //                 ))}
        //             </div>
        //         );
        //     })}
        // </div>
        <></>
      ) : (
        <div id="table-container" ref={componentRef}>
          <table {...props.getTableProps()} className="AllTable">
            <thead>
              {props.headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    return (
                      <th
                        key={column.id}
                        {...column.getHeaderProps(
                          props.sort &&
                            (column.id === "Status" ||
                              column.id === "Amount" ||
                              column.Header === "Recipient" ||
                              column.Header === "Sender" ||
                              column.Header === "Amount Held" ||
			      column.Header === "Amount Disbursed")
                            ? column.getSortByToggleProps()
                            : {}
                        )}
                      >
                        {props.sort &&
                        (column.id === "Status" ||
                          column.id === "Amount" ||
                          column.Header === "Recipient" ||
                          column.Header === "Sender" ||
			  column.Header === "Amount Disbursed" ||
                          column.Header === "Amount Held") ? (
                          <div className="sort-header">
                            <span>{column.render("Header")}</span>
                            <span className="sort-icon">
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <FontAwesomeIcon icon={faSortDown} />
                                ) : (
                                  <FontAwesomeIcon icon={faSortUp} />
                                )
                              ) : (
                                <FontAwesomeIcon icon={faSort} />
                              )}
                            </span>
                          </div>
                        ) : (
                          <>{column.render("Header")}</>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            {props.totalNbPage !== 0 && (
              <tbody {...props.getTableBodyProps()}>
                {props.page.map((row) => {
                  props.prepareRow(row);
                  const isActive =
                  //  activeRowIndex === 
                   row.index;
                  const Unblock =
                    row.original.isBlocked ||
                    row.original.IsActiveCard === false;
                  const IsDisabled =
                    row.original?.Reason?.toUpperCase() === "INACTIVE" ||
                    row.original.IsStatusChanged;

                  return (
                    <tr
                      {...row.getRowProps()}
                      className={
                        IsDisabled ? "trdisabled" : isActive ? "tractive" : ""
                      }
                    >
                      {row.cells.map((cell) => {
                        const key = cell.getCellProps().key.toString();
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={key}
                            className={isActive ? "tdactive" : ""}
                            id={
                              Unblock === true && !key.includes("Action")
                                ? "Unblock"
                                : ""
                            }
                            onClick={() => {
                              if (props.employee && !key.includes("Action")) {
                                props.handleClick(row);
                              }
                            }}
                            style={{
                              cursor: props?.onlyhere ? "default" : "pointer",
                            }}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          {/* <>{props.totalNbPage === 0 && <EmptyTransactionsMessage />}</> */}
        </div>
      )}
    </>
  );
};

export default Table;
