import { supabase } from "../supabaseClient";
import { Page } from "./types";
import { debounce } from "./debounce";

export const updatePage = debounce(
  async (page: Partial<Page> & Pick<Page, "id">) => {
    await supabase.from("pages").upsert(page).eq("id", page.id);
  },
  500
);
