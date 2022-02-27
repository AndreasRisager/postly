import { Link } from "@reach/router";
import React from "react";
import "./Policy.scss";

export default function TermsOfService() {
  return (
    <section className="policy">
      <h1 className="policy__heading">Handelsbetingelser</h1>
      <div className="policy__content">
        <p>
          Når du bestiller produkter fra Postly, gælder følgende vilkår og betingelser. Det betyder,
          at du som forbruger accepterer og godkender disse vilkår og betingelser i alle køb på
          postly.netlify.app.
        </p>
        <p>
          <strong>Betaling og levering</strong>
          Vi accepterer betaling med Visa og MasterCard via stripe.com. Beløbet trækkes først ved
          bestillingen. Du vælger forsendelsesmetoden i slutningen af bestillingsprocessen. Vi
          sender ordrer via GLS.
        </p>
        <p>
          <strong>Fortrydelsesret</strong>
          Du er berettiget til at annullere en aftale uden grund inden for 14 dage.
          Fortrydelsesretten udløber 14 dage fra den dag, hvor du tager, eller en anden person valgt
          af dig (udover leveringspersonen) tager varen i fysisk besiddelse. Hvis du har bestilt
          flere varer i en enkelt ordre, og vi ikke er i stand til at levere varerne samtidigt,
          træder fortrydelsesretten i kraft fra det øjeblik, du tager, eller en anden person valgt
          af dig (udover leveringspersonen) tager, fysisk besiddelse af den endelige vare.
          Fortrydelsesretten bortfalder, hvis du bryder forseglingen.
        </p>
        <p>
          <strong>Sådan gør du din fortrydelsesret gældende</strong>
          For at annullere din ordre skal du give os besked om annulleringen. Det kan du gøre ved at
          sende en e-mail til kontakt@postly.dk og oplyse, at du melder afbud. Du kan ikke fortryde
          ved at nægte at modtage varen eller ved at undlade at afhente den uden at give besked om,
          at du fortryder. For at overholde fortrydelsesfristen skal du sende din besked om, at du
          fortryder dit køb inden fortrydelsesfristen.
        </p>
        <p>
          <strong>Force majeure</strong>
          Artnificent er ikke ansvarlig for forsinket ydeevne (herunder levering og
          garantiforanstaltninger) forårsaget af omstændigheder uden for Postly's kontrol. Eksempler
          på omstændigheder uden for Postly's kontrol omfatter, men er ikke begrænset til,
          arbejdskonflikter, strømsvigt, lynnedslag, brand, atmosfæriske forstyrrelser, vedtagelse
          af love, foranstaltninger vedtaget af offentlige myndigheder, krigshandlinger, strejker
          eller lignende omstændigheder, enhver magt. svigt, forstyrrelser i lokalerne hos de
          ansvarlige for webstedshosting/servere, hvor Artnificent er placeret og/eller forsinkelser
          på grund af netværk forbundet til internettet osv.
        </p>
        <p>
          <strong>Privatlivspolitik</strong>
          <Link to="/privacy-policy">Du finder vores privatlivspolitik her.</Link>
        </p>
      </div>
    </section>
  );
}
