import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/query";
import React from "react";

const UserStartups = async ({ id }: { id: string }) => {
  const Startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {Startups.length > 0 ? (
        Startups.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No Post Yet</p>
      )}
    </>
  );
};

export default UserStartups;
