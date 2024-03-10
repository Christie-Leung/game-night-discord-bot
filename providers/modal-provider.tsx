"use client";

import { GroupModal } from "@/components/modal/group-modal";
import { RequestModal } from "@/components/modal/request-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <GroupModal />
    </>
  )
}