"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface DataList {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

export default function Home() {
  const API_BASE_URL = "https://billions-api.nomadcoders.workers.dev/";
  const [dataList, setDataList] = useState<DataList[]>();

  useEffect(() => {
    fetch(API_BASE_URL)
      .then((response) => response.json())
      .then((data) => setDataList(data));
  }, []);

  return (
    <Container>
      <CardWrapper>
        {dataList
          ?.filter((data) => !data.squareImage.includes("undefined"))
          .map((data) => (
            <Link className="card" key={data.id} href={`/person/${data.id}`}>
              <Image
                src={data.squareImage}
                alt={data.name}
                width={160}
                height={160}
                priority={true}
              />
              <Name>{data.name}</Name>
              <DescriptionWrapper>
                <span>
                  {Math.floor(Math.floor(data.netWorth) / 1000)} Billoion
                </span>
                <span>/</span>
                <span>{data.industries[0]}</span>
              </DescriptionWrapper>
            </Link>
          ))}
      </CardWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 10em);
  gap: 15px;
  place-items: center;

  .card {
    width: 10em;
    height: 14em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    transition: all 0.5s;
    text-decoration: none;
    color: whitesmoke;

    &:hover {
      cursor: pointer;
      opacity: 0.5;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.9);
      transform: scale(1.05);
    }
  }
`;

const Name = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 14px;
  padding-left: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  font-size: 10px;
  padding-left: 3px;
`;
