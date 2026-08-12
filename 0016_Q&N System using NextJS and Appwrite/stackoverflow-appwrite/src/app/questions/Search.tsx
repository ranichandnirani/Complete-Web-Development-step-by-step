"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Search = ({ initialSearch = "" }: { initialSearch?: string }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [search, setSearch] = React.useState(initialSearch);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set("search", search);
        router.push(`${pathname}?${newSearchParams}`);
    };

    return (
        <form className="flex w-full flex-row gap-3" onSubmit={handleSearch}>
            <Input
                type="text"
                placeholder="Search questions"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button className="shrink-0 rounded bg-orange-500 px-3 py-1 font-bold text-white hover:bg-orange-600">
                Search
            </button>
        </form>
    );
};

export default Search;