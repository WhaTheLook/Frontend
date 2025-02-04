import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants";

const initProfileGCTime = 1000 * 30;

export function useConvertImgToFile(imageUrl: string, title: string) {
  const isDefaultImage = title === "user-icon";

  const fetcher = async () => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], title, { type: "image/png" });
  };

  const { data } = useQuery({
    queryKey: QUERY_KEY.image(imageUrl),
    queryFn: fetcher,
    staleTime: Infinity,
    gcTime: isDefaultImage ? Infinity : initProfileGCTime,
  });

  return data;
}
