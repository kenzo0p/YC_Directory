import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SearchForm = ({query}:{query? : string}) => {
  

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        type="query"
        defaultValue={query}
        className="search-input"
        placeholder="search startups"
      />
      <div className="flex gap-2">{query && <SearchFormReset />}
      <Button  type="submit" className="search-btn text-white">
        <Search className="size-5"/>
      </Button>
      </div>
    </Form>
  );
};

export default SearchForm;