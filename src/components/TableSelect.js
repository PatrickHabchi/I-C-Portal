import React, { useState, useRef, useEffect } from "react";
import { faArrowUp, faSort, faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../utils/Style/common.scss";

const TableSelect = (props) => {
    const componentRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleRowClick = (row) => {
        props.handleRowClick(row); // Ensure this calls the passed function
    };

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {screenWidth < 768 ? (
                // Mobile view logic (optional; left blank here for now)
                <></>
            ) : (
                <div
                    id="table-container"
                    className={props.activeRowIndex === -1 ? "" : "usdTableSelect"}
                    ref={componentRef}
                >
                    <table {...props.getTableProps()} className="AllTable">
                        <thead>
                            {props.headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => {
                                        const { key, ...rest } = column.getHeaderProps();
                                        return (
                                            <th
                                                key={key}
                                                {...rest}
                                                {...(props.sort &&
                                                    (column.id === "Status" ||
                                                        column.id === "Amount" ||
                                                        column.Header === "Recipient" ||
                                                        column.Header === "Sender" ||
                                                        column.Header === "Amount Held" ||
                                                        column.Header === "Pickup Location")
                                                    ? column.getSortByToggleProps()
                                                    : {})}
                                            >
                                                {props.sort &&
                                                (column.id === "Status" ||
                                                    column.id === "Amount" ||
                                                    column.Header === "Recipient" ||
                                                    column.Header === "Sender" ||
                                                    column.Header === "Amount Held" ||
                                                    column.Header === "Pickup Location") ? (
                                                    <div className="sort-header">
                                                        <span>{column.render("Header")}</span>
                                                        <span className="sort-icon">
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? <FontAwesomeIcon icon={faSortDown} />
                                                                    : <FontAwesomeIcon icon={faSortUp} />
                                                                : <FontAwesomeIcon icon={faSort} />}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    column.render("Header")
                                                )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...props.getTableBodyProps()}>
                            {props.page.map((row) => {
                                props.prepareRow(row);
                                const isActive = props.activeRowIndex === row.index;
                                const isDisabled =
                                    row.original.Status === "INACTIVE" || row.original.IsStatusChanged;
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className={isDisabled ? "trdisabled" : isActive ? "tractive" : ""}
                                        onClick={() => handleRowClick(row)}
                                        style={{ cursor: "pointer"}}
                                    >
                                        {row.cells.map((cell) => {
                                            const { key, ...rest } = cell.getCellProps();
                                            return (
                                                <td
                                                    key={key}
                                                    {...rest}
                                                    className={isActive ? "tdactive" : ""}
                                                    onClick={() => {
                                                        const key = cell.getCellProps().key.toString();
                                                        if (!key.includes("Action") && !key.includes("Code")) {
                                                            handleRowClick(row);
                                                        }
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
                    </table>
                </div>
            )}
        </>
    );
};

export default TableSelect;
