"use client";

import { useQuery } from "@apollo/client";
import { Table } from "@radix-ui/themes";

import { GetPoolsDocument } from "@/gql/graphql";

import S from "./pools.module.scss";

const Pools = () => {
  const { data, loading } = useQuery(GetPoolsDocument, {});

  if (loading) {
    return <span>Loading</span>;
  }

  return (
    <Table.Root className={S.wrapper}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Token 1</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Token 2</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.pools.map((pool) => (
          <Table.Row key={pool.id}>
            <Table.Cell>{pool.token0.name}</Table.Cell>
            <Table.Cell>{pool.token1.name}</Table.Cell>
            <Table.Cell>{pool.feeTier / 1000} %</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default Pools;
