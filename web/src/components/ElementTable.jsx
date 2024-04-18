/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable no-shadow */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */

import { useMemo, useState, React } from "react"
import { useTable, useSortBy, useRowSelect } from "react-table"

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  },
)
const ProductsTable = ({ products, onUpdate, onDelete }) => {
  const columns = useMemo(
    () => [
      { Header: "Nom", accessor: "name" },
      { Header: "Prix", accessor: "price" },
      { Header: "Description", accessor: "description" },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <>
            <button onClick={() => onUpdate(row.original)}>Modifier</button>
            <button onClick={() => onDelete(row.original)}>Supprimer</button>
          </>
        ),
      },
    ],
    [],
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    { columns, data: products },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ])
    },
  )

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ElementTable
