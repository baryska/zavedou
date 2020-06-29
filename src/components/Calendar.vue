<template>
  <div class="calendar">
    <div class="header">
      <h1>Kalendář akcí</h1>
      <div class="plus">
        <router-link to="/addevent">
          <img class="add-event" :src="image" />
        </router-link>
      </div>
    </div>

    <div class="b-container">
      <b-row>
        <b-col b-col sm="12" md="4" lg="4">
          <label for="region-filter">
            Kraj:
            <br />
            <select
              class="custom-select select-selected"
              name="type"
              id="region-filter"
              v-model="regionFilter"
            >
              <option class="select-items">Celá ČR</option>
              <option class="select-items">Hlavní město Praha</option>
              <option class="select-items">Středočeský kraj</option>
              <option class="select-items">Jihočeský kraj</option>
              <option class="select-items">Plzeňský kraj</option>
              <option class="select-items">Karlovarský kraj</option>
              <option class="select-items">Ústecký kraj</option>
              <option class="select-items">Liberecký kraj</option>
              <option class="select-items">Královéhradecký kraj</option>
              <option class="select-items">Pardubický kraj</option>
              <option class="select-items">Kraj Vysočina</option>
              <option class="select-items">Jihomoravský kraj</option>
              <option class="select-items">Olomoucký kraj</option>
              <option class="select-items">Zlínský kraj</option>
              <option class="select-items">Moravskoslezský kraj</option>
            </select>
          </label>
        </b-col>

        <b-col b-col sm="12" md="4" lg="4">
          <label for="type-filter">
            Druh akce:
            <br />
            <select
              class="custom-select select-selected"
              name="type"
              id="type-filter"
              v-model="typeFilter"
            >
              <option class="select-items">Všechny akce</option>
              <option class="select-items">Veletrh / festival</option>
              <option class="select-items">Přednáška</option>
              <option class="select-items">Workshop</option>
              <option class="select-items">Soutěž</option>
              <option class="select-items">Tábor / letní škola</option>
              <option class="select-items">Kroužek</option>
              <option class="select-items">Ostatní</option>
            </select>
          </label>
        </b-col>
        <b-col b-col sm="12" md="4" lg="4">
          <label for="attender-filter">
            Pro koho:
            <br />
            <select
              class="custom-select select-selected"
              name="type"
              id="attender-filter"
              v-model="attenderFilter"
            >
              <option class="select-items">Pro všechny</option>
              <option class="select-items">Děti (ZŠ)</option>
              <option class="select-items">Studenti (SŠ)</option>
              <option class="select-items">Dospělí</option>
            </select>
          </label>
        </b-col>
      </b-row>
    </div>

    <div class="b-container fluid">
      <div v-for="event in filtered_events" :key="event.id">
        <Event
          :id="event.id"
          :name="event.name"
          :type="event.type"
          :description="event.description"
          :place="event.place"
          :town="event.address.town"
          :street="event.address.street"
          :descriptiveNumber="event.address.descriptiveNumber"
          :orientationNumber="event.address.orientationNumber"
          :townPart="event.address.townPart"
          :zipCode="event.address.zipCode"
          :link="event.link"
          :link_picture="event.link_picture"
          :child="event.attender.child"
          :teenager="event.attender.teenager"
          :adult="event.attender.adult"
          :start="event.date.start"
          :end="event.date.end"
          :note="event.date.note"
          :region="event.region"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../utils/db";
import Event from "./Event.vue";

export default {
  name: "Calendar",
  components: {
    Event
  },
  data() {
    return {
      events: [],
      id: "",
      name: "",
      type: "",
      description: "",
      place: "",
      town: "",
      street: "",
      descriptiveNumber: "",
      orientationNumber: "",
      townPart: "",
      zipCode: "",
      link: "",
      link_picture: "",
      child: "",
      teenager: "",
      adult: "",
      start: "",
      end: "",
      note: "",
      region: "",
      regionFilter: "Celá ČR",
      typeFilter: "Všechny akce",
      attenderFilter: "Pro všechny",
      image: "./assets/img/button_plus.png"
    };
  },
  firestore: {
    events: db.collection("events").orderBy("date.start")
  },
  computed: {
    filtered_events() {
      let result = this.events;

      //Filter for regions
      result = result.filter(item => {
        if (this.regionFilter === "Celá ČR") {
          return true;
        }
        return item.region === this.regionFilter;
      });

      //Filter for events
      result = result.filter(item => {
        if (this.typeFilter === "Všechny akce") {
          return true;
        }
        return item.type === this.typeFilter;
      });

      //Filter for attenders
      result = result.filter(item => {
        if (this.attenderFilter === "Pro všechny") {
          return true;
        } else if (this.attenderFilter === "Děti (ZŠ)") {
          return item.attender.child === true;
        } else if (this.attenderFilter === "Studenti (SŠ)") {
          return item.attender.teenager === true;
        } else if (this.attenderFilter === "Dospělí") {
          return item.attender.adult === true;
        }
      });
      return result;
    }
  }
};
</script>

<style scoped>
h1 {
  padding: 2rem 0;
}
.header {
  display: flex;
  position: relative;
}

.plus {
  position: absolute;
  right: 3rem;
}

.menu-select {
  display: flex;
  justify-content: space-between;
}

.add-event {
  width: 4rem;
  padding-top: 1rem;
}

.custom-select {
  position: relative;
}

.custom-select select {
  display: none; /*Hides original SELECT element */
}

.select-selected {
  background-color: rgb(188, 220, 241);
  width: 15rem;
}

/* Style of the arrow inside the select element */
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

/* Pointing the arrow upwards when the select box is open (active) */
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 7px;
}

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

/* Hiding the items when the select box is closed */
.select-hide {
  display: none;
}

.select-items div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .select-selected {
    width: 90vw;
  }
  .plus {
    position: absolute;
    right: 1rem;
  }
  h1 {
    font-size: 2rem;
  }
}

@media (max-width: 991.98px) and (min-width: 767.99px) {
  .select-selected {
    width: 30vw;
  }

  .plus {
    position: absolute;
    right: 1rem;
  }
}

@media (min-width: 991.99px) {
  .select-selected {
    width: 20vw;
    margin: 0 auto;
  }
}
</style>
