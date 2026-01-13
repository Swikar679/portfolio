import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useReels() {
  return useQuery({
    queryKey: [api.reels.list.path],
    queryFn: async () => {
      const res = await fetch(api.reels.list.path);
      if (!res.ok) throw new Error("Failed to fetch reels");
      return api.reels.list.responses[200].parse(await res.json());
    },
  });
}

export function useReel(id: number) {
  return useQuery({
    queryKey: [api.reels.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.reels.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch reel");
      return api.reels.get.responses[200].parse(await res.json());
    },
  });
}
