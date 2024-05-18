"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface DataDetailList {
  id: string;
  state: string;
  city: string;
  name: string;
  country: string;
  position: number;
  industries: string[];
  financialAssets: FinancialAsset[];
  thumbnail: string;
  squareImage: string;
  bio: string[];
  about: string[];
  netWorth: number;
}

interface FinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number;
}

export default function Person({ params }: { params: { id: string } }) {
  const API_BASE_URL = "https://billions-api.nomadcoders.workers.dev/";
  const [dataDetailList, setDataDetailList] = useState<DataDetailList>();

  useEffect(() => {
    fetch(`${API_BASE_URL}/person/${params.id}`)
      .then((response) => response.json())
      .then((data) => setDataDetailList(data));
  }, [params.id]);

  const AssetItem = ({ asset }: { asset: FinancialAsset }) => {
    return (
      <Asset>
        <p>Ticker: {asset.ticker}</p>
        <p>
          {asset.numberOfShares &&
            `Shares: ${asset.numberOfShares.toLocaleString()}`}
        </p>
        <p>
          {asset.exerciseOptionPrice &&
            `Excercise Price: $${asset.exerciseOptionPrice}`}
        </p>
      </Asset>
    );
  };

  return (
    <Container>
      <DetailWrapper>
        <FirstSection>
          {dataDetailList && (
            <Image
              src={dataDetailList?.squareImage as string}
              alt={dataDetailList?.name as string}
              width={250}
              height={250}
              priority={true}
            />
          )}
          <h2>{dataDetailList && dataDetailList.name}</h2>
          <p>
            Networth:
            {dataDetailList &&
              Math.floor(Math.floor(dataDetailList?.netWorth) / 1000)}
            Billoion
          </p>
          <p>Country: {dataDetailList && dataDetailList.country}</p>
          <p>Industry: {dataDetailList && dataDetailList.industries[0]}</p>
          <p>{dataDetailList && dataDetailList.bio}</p>
        </FirstSection>

        <SecondSection>
          <h2>Financial Assets</h2>
          <AssetWrapper>
            {dataDetailList &&
              dataDetailList.financialAssets.map((asset, index) => (
                <AssetItem key={index} asset={asset} />
              ))}
          </AssetWrapper>
        </SecondSection>
      </DetailWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const DetailWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;
const FirstSection = styled.div`
  background-color: rgb(18, 27, 31);
  padding: 30px;
`;
const SecondSection = styled.div`
  background-color: rgb(18, 27, 31);
  padding: 30px;
`;
const AssetWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Asset = styled.div`
  border: 0.5px solid #9fb3c6;
  border-radius: 4px;
  height: 80px;

  display: flex;
  flex-direction: column;
  padding-left: 5px;
  font-size: 12px;

  p {
    margin: 0;
    padding: 0;
    margin: 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
`;
