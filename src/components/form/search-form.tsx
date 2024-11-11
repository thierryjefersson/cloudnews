import Form from "next/form";
import { Input } from "../ui/input";
import SearchReset from "./search-reset-form";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Label } from "../ui/label";

export default function SearchForm({ search }: { search?: string }) {
  return (
    <Form
      action="/"
      scroll={false}
      className="mx-auto mb-10 mt-5 grid max-w-[1012px] grid-cols-1 md:grid-cols-2"
      id="search-form"
    >
      <div className="flex w-full gap-1 justify-self-end sm:w-[300px] md:col-[2]">
        <div className="relative h-9 w-full">
          <Label htmlFor="search" className="sr-only">
            Pesquisar
          </Label>
          <Input
            defaultValue={search}
            placeholder="Buscar..."
            name="search"
            id="search"
            required
            className="pr-10"
          />
          {search && <SearchReset />}
        </div>
        {!search && (
          <Button aria-label="Botão de pesquisar">
            <Search />
            <span className="sr-only">Pesquisar</span>
          </Button>
        )}
      </div>
    </Form>
  );
}
