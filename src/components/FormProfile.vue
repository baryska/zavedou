<template>
  <div>
    <h1>Přidej profil</h1>
    <div class="form">
      <form @submit.prevent="addProfile">
        <label for="first-name">
          Jméno:
          <input
            type="text"
            id="first-name"
            v-model.trim="firstName"
            placeholder="Jméno"
            required
          />
        </label>
        <label for="last-name">
          Příjmení:
          <input
            type="text"
            id="last-name"
            v-model.trim="lastName"
            placeholder="Příjmení"
            required
          />
        </label>
        <br />
        <label for="field">
          Specifikujte váš obor:
          <input
            type="text"
            id="field"
            v-model.trim="field"
            placeholder="Obor"
            required
          />
        </label>
        <label for="subject-select">
          Vhodné pro školní předmět:
          <select
            name="type"
            id="subject-select"
            v-model="subject"
            required
          >
            <option>Cizí jazyky</option>
            <option>Čeština</option>
            <option>Dějepis</option>
            <option>Fyzika</option>
            <option>Chemie</option>
            <option>Matematika</option>
            <option>Občanská výchova</option>
            <option>Přírodopis</option>
            <option>Informatika</option>
            <option>Hudební a výtvarná výchova</option>
            <option>Zeměpis</option>
          </select>
        </label>
        <br />
        <label for="institution">
          Instituce:
          <input
            type="text"
            id="institution"
            v-model.trim="institution"
            placeholder="Instituce"
            required
          />
        </label>
        <label for="address">
          Adresa instituce:
          <input
            type="text"
            id="address"
            v-model.trim="address"
            placeholder="Adresa"
            required
          />
        </label>
        <br />
        <label for="whom-select">
          Pro koho:
          <select name="type" id="whom-select" v-model="whom" required>
            <option>Všechny</option>
            <option>1. stupeň ZŠ</option>
            <option>2. stupeň ZŠ</option>
            <option>Střední školy</option>
            <option>Dospělé</option>
          </select>
        </label>
        <label for="region-select">
          Pro oblast:
          <select name="type" id="region-select" v-model="region" required>
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
        <label for="offer">
          Nabízím:
          <textarea
            id="offer"
            v-model.trim="offer"
            placeholder="Vysvětlím teorii relativity"
            required
          ></textarea>
        </label>
        <br />
        <label for="contact">
          E-mail:
          <input
            type="email"
            id="contact"
            v-model.trim="contact"
            placeholder="Email"
            required
          />
        </label>
        <br />
        <b-button variant="success" type="submit" v-on:submit.prevent="addProfile">Odeslat</b-button>
        <p v-if="showAddressLabel === true">Adresa neexistuje. Znovu a lépe.</p>
        <p v-if="formSent === true">Formulář odeslán. Děkujeme.</p>
      </form>
      <br />
    </div>
    <router-link to="/profiles">
      <div class="mb-0">
        <p>
          <b-icon-arrow-left />Zpět na profily
        </p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { db } from "../utils/db";

export default {
  name: "FormProfile",
  data() {
    return {
      profiles: [],
      firstName: "",
      lastName: "",
      field: "",
      subject: "",
      institution: "",
      address: "",
      offer: "",
      whom: "",
      region: "",
      contact: "",
      showAddressLabel: false,
      formSent: false
    };
  },

  methods: {
    addProfile(event) {
      const address = this.address.replace(/\d{3} ?\d{2}/, "");
      // Call mapy API and get coords
      new SMap.Geocoder(address, response => {
        let results = response.getResults()[0].results[0];

        // Error message call
        if (!results) {
          this.showAddressLabel = true;
          return;
        }

        // Add to database
        db.collection("profiles")
          .add({
            firstName: this.firstName,
            lastName: this.lastName,
            field: this.field,
            subject: this.subject,
            institution: this.institution,
            address: this.address,
            coords: { x: results.coords.x, y: results.coords.y },
            offer: this.offer,
            whom: this.whom,
            region: this.region,
            contact: this.contact,
            branch: {
              bioMed: "1",
              chemistry: "1",
              engineering: "1",
              enviroAgri: "1",
              mathsPhysicsInformatics: "1",
              scienceAboutEarth: "1",
              socialAndArts: "1"
            }
          })
          .then(docRef => {
            docRef.update({ id: docRef.id });
          });

        // Clearing the input values
        this.firstName = "";
        this.lastName = "";
        this.field = "";
        this.subject = "";
        this.institution = "";
        this.address = "";
        this.offer = "";
        this.whom = "";
        this.region = "";
        this.contact = "";
        this.showAddressLabel = false;
        this.formSent = true;
      });
      this.$router.push("profiles");
    }
  }
};
</script>

<style>
.h1 {
  padding: 1rem 0;
}
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

/* Submit button style */
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
</style>
