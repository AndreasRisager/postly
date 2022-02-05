import { Link } from "@reach/router";

export default function Breadcrumb({ step, setCheckout, checkout }) {
  const breadcrumbItems = (step) => {
    switch (step) {
      case 1:
        return (
          <>
            <li className="breadcrumb__item breadcrumb__item--current">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 1 })}>
                Oplysninger
              </button>
              <i className="fas fa-chevron-right breadcrumb__arrow" />
            </li>
            <li className="breadcrumb__item">
              <button className="breadcrumb__button">Levering</button>
              <i className="fas fa-chevron-right breadcrumb__arrow" />
            </li>
            <li className="breadcrumb__item">
              <button className="breadcrumb__button">Betaling</button>
            </li>
          </>
        );
      case 2:
        return (
          <>
            <li className="breadcrumb__item breadcrumb__item--completed">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 1 })}>
                Oplysninger
              </button>
              <i className="fas fa-chevron-right breadcrumb__arrow" />
            </li>
            <li className="breadcrumb__item breadcrumb__item--current">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 2 })}>
                Levering
              </button>
              <i className="fas fa-chevron-right breadcrumb__arrow" />
            </li>
            <li className="breadcrumb__item">
              <button className="breadcrumb__button">Betaling</button>
            </li>
          </>
        );
      case 3:
        return (
          <>
            <li className="breadcrumb__item breadcrumb__item--completed">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 1 })}>
                Oplysninger
              </button>
              <i className="fas fa-chevron-right breadcrumb__arrow" />
            </li>
            <li className="breadcrumb__item breadcrumb__item--completed">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 2 })}>
                Levering
              </button>
              <i className="fas fa-chevron-right breadcrumb__arrow" />
            </li>
            <li className="breadcrumb__item breadcrumb__item--current">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 3 })}>
                Betaling
              </button>
            </li>
          </>
        );
      default:
        return (
          <>
            <li className="breadcrumb__item breadcrumb__item--completed">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 1 })}>
                Oplysninger
              </button>
              <i className="fas fa-chevron-right breadcrumb__arrow" />
            </li>
            <li className="breadcrumb__item breadcrumb__item--completed">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 2 })}>
                Levering
              </button>
              <i className="fas fa-chevron-right breadcrumb__arrow" />
            </li>
            <li className="breadcrumb__item breadcrumb__item--completed">
              <button
                className="breadcrumb__button"
                onClick={() => setCheckout({ ...checkout, step: 3 })}>
                Betaling
              </button>
            </li>
          </>
        );
    }
  };
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb__item breadcrumb__item--completed">
        <Link to="/cart">Indkøbskurv</Link>
        <i className="fas fa-chevron-right breadcrumb__arrow" />
      </li>
      {breadcrumbItems(step)}
    </ol>
  );
}
