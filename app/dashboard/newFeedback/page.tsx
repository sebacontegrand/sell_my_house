"use client";
import NewFeedBackForm from "@/components/feedback/NewFeedBackForm";
import React, { useEffect, useState } from "react";

const FeedBackForm = () => {
  const [feedBackId, setFeedBackId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("feedBackId");
    setFeedBackId(id);
  }, []);
  return (
    <div>
      {feedBackId ? (
        <NewFeedBackForm feedBackId={feedBackId} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FeedBackForm;
