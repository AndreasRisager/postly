import { Link } from "@reach/router";

export default function Breadcrumb({ step }) {
  return (
    <ol className="breadcrumb">
      <li className="breadcrumb__item breadcrumb__item--completed">
        <Link to="/cart">Indkøbskurv</Link>
        <i className="fas fa-chevron-right breadcrumb__arrow" />
      </li>
      <li className="breadcrumb__item breadcrumb__item--current">
        <span>Oplysninger</span>
        <i className="fas fa-chevron-right breadcrumb__arrow" />
      </li>
      <li className="breadcrumb__item">
        <span>Levering</span>
        <i className="fas fa-chevron-right breadcrumb__arrow" />
      </li>
      <li className="breadcrumb__item">Betaling</li>
    </ol>
  );
}
