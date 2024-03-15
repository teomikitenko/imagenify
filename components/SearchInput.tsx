"use client";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState<string | undefined>();
  const router = useRouter();
  useEffect(() => {
    let timer:NodeJS.Timeout;
    if (value?.length === 0 || !value) {
      router.push(`/`, { scroll: false });
    } else {
      timer = setTimeout(() => {
        router.push(`/?search=${value}`, { scroll: false });
      }, 900);
    }
    return ()=>clearTimeout(timer)
  }, [value]);
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      placeholder="Search"
      className="grow py-6 border-none text-base "
    />
  );
};

export default SearchInput;
