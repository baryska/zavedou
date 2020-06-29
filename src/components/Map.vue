<template>
  <div>
    <div class="intro">
      <p>
        Seznamte se s českými vědeckými institucemi a science parky. Podívejte
        se, kdy a kde se konají vědecké akce pro veřejnost, a prohlédněte si
        profily vědců, které si může škola pozvat k sobě na hodinu. Česká věda
        vám nikdy nebyla blíž! <br />
        <br />
        Filtrujte pomocí tlačítek:
      </p>
    </div>
    <div class="b-container-fluid">
      <b-row class="text-center">
        <b-col>
          <Button
            btnName="Vědecké instituce"
            @vyber="selected1 = !selected1"
            :class="{ selected: selected1 }"
          />
        </b-col>
        <b-col>
          <Button
            btnName="Profily vědců"
            @vyber="selected2 = !selected2"
            :class="{ selected: selected2 }"
          />
        </b-col>
        <b-col>
          <Button
            btnName="Vědecké akce"
            @vyber="selected3 = !selected3"
            :class="{ selected: selected3 }"
          />
        </b-col>
        <b-col>
          <Button
            btnName="Vědecké parky"
            @vyber="selected4 = !selected4"
            :class="{ selected: selected4 }"
          />
        </b-col>
      </b-row>
    </div>

    <label class="select" for="subject-filter">
      Vyberte obor: <br />
      <select
        class="custom-select select-selected"
        name="type"
        id="branch-filter"
        v-model="branchFilter"
        @change="filtered_items"
      >
        <option class="select-items">Zobrazit vše</option>
        <option class="select-items">Matematika, fyzika a informatika</option>
        <option class="select-items">Chemie</option>
        <option class="select-items">Technické vědy, inženýrství</option>
        <option class="select-items">Vědy o Zemi</option>
        <option class="select-items">Biologie a medicína</option>
        <option class="select-items">Environmentální a zemědělské vědy</option>
        <option class="select-items">Společenské a humanitní vědy</option>
      </select>
    </label>

    <div id="map"></div>
  </div>
</template>

<script>
import { db } from "../utils/db";
import Button from "./Button.vue";

export default {
  name: "Map",
  components: {
    Button,
  },
  data() {
    return {
      loading: false,
      post: null,
      error: null,
      institutions: [],
      filteredInstitutions: {},
      map: null,
      subject: "",
      branch: "",
      subjectFilter: "Zobrazit vše",
      branchFilter: "Zobrazit vše",
      layer: null,
      btnName: "",
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
    };
  },
  firestore: {
    institutions: db.collection("institutions"), //.limit(10),
    profiles: db.collection("profiles"), //.limit(10),
    events: db.collection("events"), //.limit(10),
    parks: db.collection("parks"), //.limit(10),
  },

  mounted() {
    let main = document.querySelector("#map");

    // Adding a map and choosing the first focus and its zoom size
    let center = SMap.Coords.fromWGS84(14.4252625, 50.0833472);
    this.map = new SMap(main, center, 7);
    this.map.addDefaultLayer(SMap.DEF_BASE).enable();
    this.layer = new SMap.Layer.Marker();
    this.map.addLayer(this.layer);
    this.layer.enable();

    // Resizing of the window during website resizing
    window.addEventListener("resize", () => this.map.syncPort());

    // Map controls such as zoom in, out
    this.map.addDefaultControls();
    this.filtered_items();
  },
  methods: {
    filtered_items() {
      let source = { institutions: [], profiles: [], events: [], parks: [] };
      if (this.selected1 === true) {
        source.institutions = this.institutions;
      }
      if (this.selected2 === true) {
        source.profiles = this.profiles;
      }
      if (this.selected3 === true) {
        source.events = this.events;
      }
      if (this.selected4 === true) {
        source.parks = this.parks;
      }
      if (
        !this.selected1 &&
        !this.selected2 &&
        !this.selected3 &&
        !this.selected4
      ) {
        source = {
          institutions: this.institutions,
          profiles: this.profiles,
          events: this.events,
          parks: this.parks,
        };
      }

      Object.keys(source).forEach((category) => {
        source[category] = source[category].filter((item) => {
          if (this.branchFilter === "Zobrazit vše") {
            return true;
          } else if (this.branchFilter === "Matematika, fyzika a informatika") {
            return item.branch.mathsPhysicsInformatics === "1";
          } else if (this.branchFilter === "Chemie") {
            return item.branch.chemistry === "1";
          } else if (this.branchFilter === "Technické vědy, inženýrství") {
            return item.branch.engineering === "1";
          } else if (this.branchFilter === "Vědy o Zemi") {
            return item.branch.scienceAboutEarth === "1";
          } else if (this.branchFilter === "Biologie a medicína") {
            return item.branch.bioMed === "1";
          } else if (
            this.branchFilter === "Environmentální a zemědělské vědy"
          ) {
            return item.branch.enviroAgri === "1";
          } else if (this.branchFilter === "Společenské a humanitní vědy") {
            return item.branch.socialAndArts === "1";
          }
        });
      });

      this.filteredInstitutions = source;
    },
    // Get marker coordination numbers
    getMarkers(source) {
      if (!source) return;
      const markers = [];
      const cards = [];

      //Markers and cards for institutions
      const renderInstitutions = (institution, index) => {
        const pin = JAK.mel("div");
        const pinImg = JAK.mel("img", {
          src: "./assets/img/pin_institution.png",
        });
        pinImg.classList.add("custom_pin");
        pin.appendChild(pinImg);

        let marker = new SMap.Marker(
          SMap.Coords.fromWGS84(institution.coords.x, institution.coords.y),
          null,
          {
            url: pin,
          }
        );
        markers.push(marker);

        let card = new SMap.Card();
        // Card styles and content
        card.setSize(350, 250);
        card.getHeader().style.backgroundColor = "#6687C4";
        card.getHeader().style.width = "100%";
        card.getHeader().style.height = "100%";
        card.getHeader().style.padding = "2px";
        card.getBody().style.padding = "5px 0px";
        card.getFooter().style.padding = "0";

        card.getHeader().innerHTML = `
        <strong>${institution.scientificInstitution}</strong>
            `;
        card.getBody().innerHTML = `
        ${institution.address}<br /> 
        ${institution.funFact}
        `;
        card.getFooter().innerHTML = `
        <a href="${institution.website}">Odkaz na web</a>
        `;

        cards.push(card);
      };

      //Markers and cards for Profiles
      const renderProfiles = (profile, index) => {
        const pin = JAK.mel("div");
        const pinImg = JAK.mel("img", {
          src: "./assets/img/pin_profile.png",
        });
        pinImg.classList.add("custom_pin");
        pin.appendChild(pinImg);

        let marker = new SMap.Marker(
          SMap.Coords.fromWGS84(profile.coords.x, profile.coords.y),
          null,
          {
            url: pin,
          }
        );

        markers.push(marker);

        let card = new SMap.Card();
        // Card styles and content
        card.setSize(350, 200);
        card.getHeader().style.backgroundColor = "#AF519A";
        card.getHeader().style.width = "100%";
        card.getHeader().style.height = "100%";
        card.getHeader().style.padding = "2px";
        card.getBody().style.padding = "5px 0px";
        card.getFooter().style.padding = "0";

        card.getHeader().innerHTML = `
             <strong>${profile.firstName} ${profile.lastName}</strong> <br />
            `;
        card.getBody().innerHTML = `Obor: ${profile.field}<br />
            ${profile.offer}`;
        card.getFooter().innerHTML = `Kontakt: ${profile.contact}`;
        cards.push(card);
      };

      //Marker and cards for Events
      const renderEvents = (event, index) => {
        const pin = JAK.mel("div");
        const pinImg = JAK.mel("img", {
          src: "./assets/img/pin_event.png",
        });
        pinImg.classList.add("custom_pin");
        pin.appendChild(pinImg);
        let marker = new SMap.Marker(
          SMap.Coords.fromWGS84(event.coords.x, event.coords.y),
          null,
          {
            url: pin,
          }
        );
        markers.push(marker);

        let card = new SMap.Card();

        // Card styles and content
        card.setSize(350, 250);
        card.getHeader().style.backgroundColor = "#7DBA27";
        card.getHeader().style.width = "100%";
        card.getHeader().style.height = "100%";
        card.getHeader().style.padding = "2px";
        card.getBody().style.padding = "5px 0px";
        card.getFooter().style.padding = "0";

        card.getHeader().innerHTML = `
             <strong>${event.name}</strong> <br />
            `;
        card.getBody().innerHTML = `${event.description}`;
        card.getFooter().innerHTML = `<a href="${event.link}">Odkaz na akci</a>`;
        cards.push(card);
      };

      //Markers and cards for Parks
      const renderParks = (park, index) => {
        const pin = JAK.mel("div");
        const pinImg = JAK.mel("img", {
          src: "./assets/img/pin_park.png",
        });
        pinImg.classList.add("custom_pin");
        pin.appendChild(pinImg);
        let marker = new SMap.Marker(
          SMap.Coords.fromWGS84(park.coords.x, park.coords.y),
          null,
          {
            url: pin,
          }
        );
        markers.push(marker);

        let card = new SMap.Card();

        // Card styles and content
        card.setSize(350, 250);
        card.getHeader().style.backgroundColor = "#FBBB19";
        card.getHeader().style.width = "100%";
        card.getHeader().style.height = "100%";
        card.getHeader().style.padding = "2px";
        card.getBody().style.padding = "5px 0px";
        card.getFooter().style.padding = "0";

        card.getHeader().innerHTML = `
             <strong>${park.name}</strong>
            `;
        card.getBody().innerHTML = `${park.address}`;
        card.getFooter().innerHTML = `<a href="${park.website}">Odkaz na akci</a>`;
        cards.push(card);
      };

      source.institutions.forEach(renderInstitutions);
      source.profiles.forEach(renderProfiles);
      source.events.forEach(renderEvents);
      source.parks.forEach(renderParks);
      return { markers, cards };
    },

    pressButton() {
      this.selected = !this.selected;
    },
  },
  watch: {
    filteredInstitutions() {
      if (!this.layer) return;

      // Return marker coords
      const markerCards = this.getMarkers(this.filteredInstitutions);
      // const filteredItems = this.filtered_items(this.institutions);
      // Adding to the map a marker layer
      this.layer.removeAll();

      // Adding markers to marker layer
      markerCards.markers.map((marker, index) => {
        this.layer.addMarker(marker);
      });

      // Return cards

      // Show card on marker click
      markerCards.cards.forEach((card, index) => {
        markerCards.markers[index].decorate(
          SMap.Marker.Feature.Card,
          markerCards.cards[index]
        );
      });
    },
    institutions() {
      setTimeout(() => this.filtered_items(), 1);
    },
    profiles() {
      setTimeout(() => this.filtered_items(), 1);
    },
    events() {
      setTimeout(() => this.filtered_items(), 1);
    },
    parks() {
      setTimeout(() => this.filtered_items(), 1);
    },
    // institutions() {
    //   this.filtered_items();
    // },
    selected1() {
      this.filtered_items();
    },
    selected2() {
      this.filtered_items();
    },
    selected3() {
      this.filtered_items();
    },
    selected4() {
      this.filtered_items();
    },
  },
};
</script>

<style>
.smap {
  position: relative;
  width: 100%;
  height: 80vh;
  margin: 10px 0;
}

.smap img.custom_pin {
  width: 30px;
}

button {
  border: none;
  color: white;
  padding: 0.5rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  background-color: #8d99ae;
  border-radius: 20px;
  width: 8rem;
}
button:focus {
  outline: none;
}
.selected {
  background-color: #84b71c;
}
.custom_pin {
  width: 40px;
}

.categories {
  display: flex;
  height: 5rem;
  max-width: 100%;
}

.categories p {
  padding: 1rem;
}

.intro {
  font-family: Raleway;
  font-size: 1.2rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  height: 10%;
}
.select {
  margin-top: 1.5rem;
}

.custom-select {
  position: relative;
  width: 19rem;
}

.custom-select select {
  display: none; /*hide original SELECT element: */
}

.select-selected {
  background-color: rgb(188, 220, 241);
}

/* Style the arrow inside the select element: */
.select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
}

/* Point the arrow upwards when the select box is open (active): */
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}

/* style the items (options), including the selected item: */
.select-items div,
.select-selected {
  color: black;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
}

.select-items {
  position: absolute;
  background-color: white;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}

.select-hide {
  display: none;
}

.select-items div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .custom-select.select-selected {
    width: 90vw;
  }

  h1 {
    font-size: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 12px;
    height: 3rem;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 20px;
    width: 5rem;
  }
  .select {
    margin-top: 1.5rem;
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 991.98px) and (min-width: 767.99px) {
  .custom-select.select-selected {
    width: 50vw;
  }
}

@media (min-width: 991.99px) {
  .custom-select.select-selected {
    width: 20vw;
    margin: 0 auto;
  }
}
</style>
