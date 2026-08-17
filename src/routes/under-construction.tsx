import { createFileRoute } from "@tanstack/react-router";
import { UnderConstruction } from "@/components/site/UnderConstruction";

export const Route = createFileRoute("/under-construction")({
  component: UnderConstructionRoute,
});

function UnderConstructionRoute() {
  return <UnderConstruction />;
}
