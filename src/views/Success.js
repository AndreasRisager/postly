import {Helmet} from "react-helmet";

export default function Success() {
  return (
    <>
      <Helmet>
        <title>Postly | Tak for dit køb!</title>
      </Helmet>
      <h1 className="checkout__heading" style={{ margin: "5em 0", textAlign: "center" }}>
        Tak for dit køb!
      </h1>
    </>
  );
}
