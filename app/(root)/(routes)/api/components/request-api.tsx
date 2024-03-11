"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";


export const RequestAPI = () => {
  const origin = useOrigin();

  const baseUrl = `${origin}/api/request`;

  return (
    <>
      <ApiAlert title="GET" variant="public" description={`${baseUrl}`} />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}`} />
    </>
  );
};
