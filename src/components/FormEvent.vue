<template>
  <div>
    <h2>Přidej akci</h2>
    <div class="form">
      <form @submit.prevent="addEvent">
        <label for="name">
          Název události:
          <input
            type="text"
            id="name"
            v-model.trim="name"
            placeholder="Název události"
            required
          />
        </label>
        <label for="type-select">
          Vyberte typ události:
          <select name="type" id="type-select" v-model="type" required>
            <option>Veletrh / festival</option>
            <option>Přednáška</option>
            <option>Workshop</option>
            <option>Tábor / letní škola</option>
            <option>Soutěž</option>
            <option>Kroužek</option>
            <option>Ostatní</option>
          </select>
        </label>

        <br />
        <label for="place">
          Místo konání:
          <input
            type="text"
            id="place"
            v-model.trim="place"
            placeholder="Místo konání"
            required
          />
        </label>
        <label for="town">
          Město:
          <input
            type="text"
            id="town"
            v-model.trim="town"
            placeholder="Město"
            required
          />
        </label>
        <br />
        <label for="street">
          Ulice:
          <input
            type="text"
            id="street"
            v-model.trim="street"
            placeholder="Ulice"
            required
          />
        </label>
        <label for="descriptive-number">
          Číslo popisné:
          <input
            type="number"
            id="descriptive-number"
            min="1"
            v-model="descriptiveNumber"
            required
          />
        </label>
        <label for="orientation-number" class="optionalText">
          Číslo orientační (volitelné):
          <input
            type="number"
            id="orientation-number"
            min="1"
            v-model="orientationNumber"
          />
        </label>
        <br />
        <label for="town-part" class="optionalText">
          Městská čtvrť (volitelné):
          <input
            type="text"
            id="town-part"
            v-model.trim="townPart"
            placeholder="Městská čtvrť"
          />
        </label>
        <label for="zip-code">
          PSČ:
          <input
            type="text"
            inputmode="numeric"
            id="zip-code"
            v-model.trim="zipCode"
            pattern="\d{3} ?\d{2}"
            required
          />
        </label>
        <br />
        <label for="type-select">
          Vyberte kraj:
          <select name="type" id="type-select" v-model="region" required>
            <option>Celá ČR</option>
            <option>Hlavní město Praha</option>
            <option>Středočeský kraj</option>
            <option>Jihočeský kraj</option>
            <option>Plzeňský kraj</option>
            <option>Karlovarský kraj</option>
            <option>Ústecký kraj</option>
            <option>Liberecký kraj</option>
            <option>Královéhradecký kraj</option>
            <option>Pardubický kraj</option>
            <option>Kraj Vysočina</option>
            <option>Jihomoravský kraj</option>
            <option>Olomoucký kraj</option>
            <option>Zlínský kraj</option>
            <option>Moravskoslezský kraj</option>
          </select>
        </label>
        <br />
        <label for="description">
          Popis události:
          <textarea
            id="description"
            v-model.trim="description"
            placeholder="Popis události"
            required
          ></textarea>
        </label>
        <br />
        <label for="child">
          <input
            type="checkbox"
            name="attender"
            value="false"
            id="child"
            v-model="child"
          />
          pro děti
        </label>
        <label for="teenager">
          <input
            type="checkbox"
            name="attender"
            value="false"
            id="teenager"
            v-model="teenager"
          />
          pro studenty
        </label>
        <label for="adult">
          <input
            type="checkbox"
            name="attender"
            value="false"
            id="adult"
            v-model="adult"
          />
          pro dospělé
        </label>
        <br />
        <label for="start">
          Začátek události:
          <input type="date" id="start" v-model="start" required />
        </label>
        <label for="end">
          Konec události:
          <input type="date" id="end" v-model="end" required />
        </label>
        <br />
        <label for="link">
          Odkaz/zdroj:
          <input
            type="url"
            id="link"
            v-model.trim="link"
            placeholder="Odkaz/zdroj"
            required
          />
        </label>
        <br />
        <label for="note" class="optionalText">
          Poznámka (volitelné)
          <input
            type="text"
            id="note"
            v-model.trim="note"
            placeholder="Poznámka k události"
          />
        </label>
        <br />
        <b-button
          variant="success"
          type="submit"
          v-on:submit.prevent="addEvent"
        >
          Odeslat
        </b-button>
        <p v-if="showAddressLabel === true">Adresa neexistuje. Znovu a lépe.</p>
        <p v-if="formSent === true">Formulář odeslán. Děkujeme.</p>
      </form>
    </div>
    <router-link to="/calendar">
      <div class="mb-0">
        <p><b-icon-arrow-left />Zpět do kalendáře</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { db } from "../utils/db";

export default {
  name: "FormEvent",
  data() {
    return {
      events: [],
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
      link: "http://www.",
      child: false,
      teenager: false,
      adult: false,
      start: null,
      end: null,
      note: null,
      region: "Všechny kraje",
      showAddressLabel: false,
      formSent: false,
    };
  },
  methods: {
    addEvent() {
      // Call mapy API and get coords
      const address = `${this.street} ${this.descriptiveNumber}/${this.orientationNumber}, ${this.town}`;
      new SMap.Geocoder(address, (response) => {
        let results = response.getResults()[0].results[0];

        // Error message call
        if (!results) {
          this.showAddressLabel = true;
          return;
        }

        // Add to database
        db.collection("events")
          .add({
            name: this.name,
            type: this.type,
            description: this.description,
            place: this.place,
            address: {
              town: this.town,
              street: this.street,
              descriptiveNumber: this.descriptiveNumber,
              orientationNumber: this.orientationNumber,
              townPart: this.townPart,
              zipCode: this.zipCode,
            },
            coords: { x: results.coords.x, y: results.coords.y },
            link: this.link,
            attender: {
              child: this.child,
              teenager: this.teenager,
              adult: this.adult,
            },
            date: {
              start: this.start,
              end: this.end,
              note: this.note,
            },
            region: this.region,
            branch: {
              bioMed: "1",
              chemistry: "1",
              engineering: "1",
              enviroAgri: "1",
              mathsPhysicsInformatics: "1",
              scienceAboutEarth: "1",
              socialAndArts: "1",
            },
          })
          .then((docRef) => {
            docRef.update({ id: docRef.id });
          });

        // Clearing the input values
        this.name = "";
        this.type = "";
        this.description = "";
        this.place = "";
        this.town = "";
        this.street = "";
        this.descriptiveNumber = "";
        this.orientationNumber = "";
        this.townPart = "";
        this.zipCode = "";
        this.link = "";
        this.child = "";
        this.teenager = "";
        this.adult = "";
        this.start = "";
        this.end = "";
        this.note = "";
        this.region = "";
        this.showAddressLabel = false;
        this.formSent = true;
      });
    },
  },
};
</script>

<style>
input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

/* Submit button style*/
input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

.form {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.optionalText {
  color: grey;
}
</style>
