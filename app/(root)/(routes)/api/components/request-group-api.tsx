"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";


export const RequestGroupAPI = () => {
  const origin = useOrigin();

  const baseUrl = `${origin}/api/requestGroup`;

  return (
    <>
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/{requestGroupId}`} />
      <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/{requestGroupId}`} />
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/group/{groupId}`} />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/group/{groupId}`} />
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/group/{groupId}/event/{eventId}`} />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/group/{groupId}/event/{eventId}`} />
    </>
  );
};