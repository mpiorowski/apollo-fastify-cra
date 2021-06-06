import { ArrowUpDownIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Button, chakra, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Column, useSortBy, useTable } from "react-table";
import { Category } from "../../../../../../@types/forum.types";

// type ColumnData = {
//   Header: string;
//   accessor: string;
//   isNumeric: boolean;
// };

type Props = {
  category: Category | null;
};

type TableData = {
  id: string;
  title: string;
  description: string;
  postsCount: number;
};

export default function TopicsTable({ category }: Props): JSX.Element {
  const columns = React.useMemo<Column<TableData>[]>(
    () => [
      {
        Header: "Tytuł",
        accessor: "title",
        Cell: ({ row }: { row: any }) => (
          <Link to={`/forum/categories/${category?.id}/topics/${row.original.id}/posts`}>
            <Button variant="link" color="green.400">
              {row.original.title}
            </Button>
          </Link>
        ),
      },
      {
        Header: "Opis",
        accessor: "description",
      },
      {
        Header: "Liczba postów",
        accessor: "postsCount",
        isNumeric: true,
      },
    ],
    [category],
  );
  const tableData = React.useMemo(() => {
    const topics = category ? [...category.topics] : [];

    const topicsWithPostsCount = topics.map((topic) => {
      let count = 0;
      topic.posts?.forEach((post) => {
        count++;
        count = count + post.replies.length;
      });
      return { id: topic.id as string, title: topic.title, description: topic.description || "", postsCount: count };
    });

    return topicsWithPostsCount;
  }, [category]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<TableData>(
    { columns, data: tableData },
    useSortBy,
  );

  return (
    <Table variant="simple" width="60%" margin="auto" mt="10" {...getTableProps()}>
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {/* FIXME - any */}
            {headerGroup.headers.map((column: any) => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps())} isNumeric={column.isNumeric}>
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : (
                    <ArrowUpDownIcon aria-label="sorted default" />
                  )}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const column = cell.column as any;
                return (
                  <Td {...cell.getCellProps()} isNumeric={column.isNumeric}>
                    {cell.render("Cell")}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}
