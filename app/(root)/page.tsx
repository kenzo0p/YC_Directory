import SearchForm from "../../components/SearchForm";
import StartupCard , {StartupTypeCard} from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/query";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search : query || null};
  const session = await auth()
  
  const { data : post} = await sanityFetch({query:STARTUPS_QUERY ,params})
  // const post = [
  //   {
  //     _createdAt: "Yesterday",
  //     views: 55,
  //     author: { _id: 1, name : "Om" },
  //     _id: 1,
  //     description: "This is description",
  //     image:
  //       "https://images.unsplash.com/photo-1735236270565-983422d5a224?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "robots",
  //     title: "we robots",
  //   },
  // ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading ">
          Pitch Your Startup ,<br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas ,Vite on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p>{query ? `Search result for "${query}"` : "All startups"}</p>
        <ul className="mt-7 card_grid">
          {post?.length > 0 ? (
            post.map((post : StartupTypeCard, index : number) => <StartupCard key={post?._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
