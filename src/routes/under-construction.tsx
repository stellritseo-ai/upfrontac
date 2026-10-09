import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const Route = createFileRoute("/under-construction")({
  head: () => ({
    meta: [
      { title: "Under Construction | Upfront AC" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UnderConstructionRoute,
});

function UnderConstructionRoute() {
  return <UnderConstruction />;
}
