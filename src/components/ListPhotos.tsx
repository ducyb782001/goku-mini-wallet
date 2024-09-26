"use client";

import { getListCollections } from "@/apis/photos-module";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";

function ListPhotos() {
  const [listPhotos, setListPhotos] = useState<any>();

  useQuery(["getListPhoto"], async () => {
    const response = await getListCollections();
    setListPhotos(response);
    return response;
  });

  return (
    <div className="bg-white">
      <div className="mb-10">getListCollections</div>
      <div className="flex flex-col gap-3">
        {listPhotos?.data?.map((item: any) => (
          <div key={item?.id}>
            <Link href={`/photos/${item?.id}`}>
              ID: {item?.id} - title: {item?.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListPhotos;
