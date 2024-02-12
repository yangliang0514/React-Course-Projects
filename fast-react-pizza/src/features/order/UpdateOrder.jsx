import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="POST">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}
