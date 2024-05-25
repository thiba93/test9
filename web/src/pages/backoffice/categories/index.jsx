/* eslint-disable no-alert */
/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import * as React from "react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table"
import { useTheme } from "@table-library/react-table-library/theme"
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort"
import {
  HeaderCellSelect,
  CellSelect,
  useRowSelect,
} from "@table-library/react-table-library/select"
import Layout from "@/components/Layout"
import Link from "next/link"
import { useRouter } from "next/router"

const AdminTable = () => {
  const [products, setProducts] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const router = useRouter()
  const data = { nodes: products }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const dataResponse = await response.json()

        setProducts(dataResponse)
      } catch (error) {
        toast.error("Failed to fetch products:", error)
      }
    }

    fetchProducts()
  }, [])

  const theme = useTheme({
    Table: `
      --data-table-library_grid-template-columns: 48px 1fr 1fr 1fr 1fr 1fr;
      width: 100%;
      height: auto;
      overflow: hidden; // Added to hide overflow
    `,
    BaseRow: `
      width: 100%;
      background: #E5E1DA;
    `,
    HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
    Row: `
        &:nth-of-type(odd) {
          background-color: #E5E1DA;
        }

        &:nth-of-type(even) {
          background-color: #FBF9F1;
        }
      `,
    BaseCell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }

        padding: 8px 16px;
      `,
    Cell: `
        &.description-cell {
          max-height: 25px;
          line-height: 1.2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `,
  })
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        ID: (array) => array.sort((a, b) => a.id.localeCompare(b.id)),
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        PRICE: (array) => array.sort((a, b) => a.price - b.price),
        DESCRIPTION: (array) =>
          array.sort((a, b) => {
            if (a.description === null && b.description === null) {
              return 0
            }

            if (a.description === null) {
              return 1
            }

            if (b.description === null) {
              return -1
            }

            return a.description.localeCompare(b.description)
          }),
      },
    },
  )
  const select = useRowSelect(data, {
    onChange: onSelectChange,
  })

  function onSortChange() {
    //Do nothing for now
  }

  function onSelectChange(action, state) {
    setSelectedIds(state.ids)
  }

  const handleDelete = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer les produits sélectionnés ?",
      )
    ) {
      try {
        const promises = selectedIds.map((id) =>
          fetch(`/api/products/${id}`, { method: "DELETE" }),
        )

        await Promise.all(promises)

        setProducts(
          products.filter((product) => !selectedIds.includes(product.id)),
        )
        setSelectedIds([])
      } catch (error) {
        toast.error("Failed to delete products:", error)
      }
    }
  }

  return (
    <Layout>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">Backoffice Produits</h1>
        <button
          onClick={() => router.push("/backoffice/products/addProduct")}
          className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
        >
          Ajouter un nouveau produit
        </button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ width: "100%" }}>
          <Table
            data={data}
            theme={theme}
            layout={{ custom: true }}
            sort={sort}
            select={select}
          >
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCellSelect />
                    <HeaderCellSort sortKey="ID">ID</HeaderCellSort>
                    <HeaderCellSort sortKey="NAME">Nom</HeaderCellSort>
                    <HeaderCellSort sortKey="PRICE">Prix</HeaderCellSort>
                    <HeaderCellSort sortKey="DESCRIPTION">
                      Description
                    </HeaderCellSort>
                    <HeaderCellSort sortKey="DESCRIPTION">
                      Action
                    </HeaderCellSort>
                  </HeaderRow>
                </Header>
                <Body>
                  {tableList.map((item) => (
                    <Row item={item} key={item.id}>
                      <CellSelect item={item} />
                      <Cell>{item.id}</Cell>
                      <Cell>{item.name}</Cell>
                      <Cell>{item.price}</Cell>
                      <Cell className="description-cell">
                        {item.description}
                      </Cell>
                      <Cell>
                        <Link
                          href={`/backoffice/products/update/${item.id}`}
                          style={{ marginRight: "10px" }}
                        >
                          ✏️
                        </Link>
                        <button onClick={() => handleDelete(item.id)}>
                          🗑️
                        </button>
                        <Link
                          href={`/backoffice/products/${item.id}`}
                          style={{ marginRight: "10px" }}
                        >
                          🔍
                        </Link>
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </div>
      </div>
    </Layout>
  )
}

export default AdminTable
