<template>
  <div>
    <h1>O projektu</h1>
    <div class="aboutText">
      <p>
        Jak vlastně vznikla tato webová stránka? <br /><br />
        Začátkem roku 2020 jsme se rozhodly, že se zúčastníme Digitální akademie
        Czechitas zaměřené na webový vývoj (frontend). A naším společným
        výstupem je právě tato stránka. <br /><br />Obě dvě máme rády vědu -
        Bára mnoho let s vědci spolupracovala a Andra zase jako vědkyně několik
        let pracovala. Věda podle nás hraje v našich životech stále důležitější
        roli – třeba kvůli změně klimatu nebo aktuálně při koronavirové krizi.
        Přály bychom si, aby veřejnost měla mnohem lepší představu o tom, co
        věda je, jak se dělá a co všechno pro nás věda může udělat. A taky že
        vědcem se může stát každý, kdo jen trochu chce. <br /><br />Zjistily
        jsme, že v České republice neexistuje žádná centralizovaná databáze
        vědeckých institucí a vědců, science parků a popularizačních aktivit, a
        proto jsme se rozhodly něco takového vytvořit. Právě tak vznikl projekt
        zavedou.cz – stránky, které vás zavedou za vědou. <br /><br />Tato
        stránka by měla povzbudit všechny zvídavé lidi napříč generacemi – od
        dětí, přes středoškolské studenty, až po dospělé, aby se o vědu více
        zajímali. A třeba aby si ji vybrali jako svou profesi nebo aby rozšířili
        svoje znalosti a něčemu novému se přiučili. Protože kvalitní informace
        jsou v dnešní době nesmírně cenné. Prostě tak jako Czechitas podporuje
        vstup žen do IT, tak bychom i my rády podpořily vstup lidí do vědy.
        <br /><br />A mimochodem, znáte
        <a
          href="https://www.czechitas.cz/cs/"
          target="_blank"
          rel="noopener noreferrer"
          ><img id="czechitas" src="../assets/img/czechitas.png"/></a
        >? <br /><br />
        Andra & Bára
      </p>
    </div>
  </div>
</template>

<script>
// import { db } from "../utils/db";

export default {
  name: "About",
};
</script>

<style>
.aboutText {
  text-align: justify;
}
h1 {
  margin-bottom: 20px;
}

#czechitas {
  width: 10rem;
}
</style>
