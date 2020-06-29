<template>
  <div>
    <div class="header">
      <h1>Popularizátoři vědy</h1>
      <div class="plus">
        <router-link to="/addprofile">
          <img class="add-profile" :src="plus" />
        </router-link>
      </div>
    </div>
    <div>
      <div class="b-container-fluid">
        <b-row>
          <b-col b-col sm="12" md="6" lg="6">
            <label for="region-filter">
              Vyberte kraj:
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
          <b-col b-col sm="12" md="6" lg="6">
            <label for="subject-filter">
              Vyberte školní předmět:
              <br />
              <select
                class="custom-select select-selected"
                name="type"
                id="subject-filter"
                v-model="subjectFilter"
              >
                <option class="select-items">Zobrazit vše</option>
                <option class="select-items">Cizí jazyky</option>
                <option class="select-items">Čeština</option>
                <option class="select-items">Dějepis</option>
                <option class="select-items">Fyzika</option>
                <option class="select-items">Chemie</option>
                <option class="select-items">Matematika</option>
                <option class="select-items">Občanská výchova</option>
                <option class="select-items">Přírodopis</option>
                <option class="select-items">Informatika</option>
                <option class="select-items">Hudební a výtvarný výchova</option>
                <option class="select-items">Zeměpis</option>
              </select>
            </label>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="b-container fluid">
      <b-row>
        <b-col
          sm="12"
          md="6"
          lg="6"
          v-for="profile in filtered_profiles"
          :key="profile.id"
        >
          <Profile
            :id="profile.id"
            :firstName="profile.firstName"
            :lastName="profile.lastName"
            :field="profile.field"
            :subject="profile.subject"
            :institution="profile.institution"
            :offer="profile.offer"
            :whom="profile.whom"
            :region="profile.region"
            :contact="profile.contact"
            :image="image"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { db } from "../utils/db";
import Profile from "./Profile.vue";

export default {
  name: "Profiles",
  components: {
    Profile,
  },
  data() {
    return {
      profiles: [],
      id: "",
      firstName: "",
      lastName: "",
      field: "",
      branch: "",
      subject: "",
      institution: "",
      offer: "",
      whom: "",
      region: "",
      contact: "",
      image: "./assets/img/female_avatar.png",
      regionFilter: "Celá ČR",
      subjectFilter: "Zobrazit vše",
      plus: "./assets/img/button_plus.png",
    };
  },

  // Data upload from database and ordering by lastName
  firestore: {
    profiles: db.collection("profiles").orderBy("lastName"),
  },

  computed: {
    filtered_profiles() {
      return this.profiles.filter((item) => {
        if (
          this.regionFilter !== "Celá ČR" &&
          this.subjectFilter !== "Zobrazit vše"
        ) {
          return (
            item.region === this.regionFilter &&
            item.subject === this.subjectFilter
          );
        } else if (this.regionFilter !== "Celá ČR") {
          return item.region === this.regionFilter;
        } else if (this.subjectFilter !== "Zobrazit vše") {
          return item.subject === this.subjectFilter;
        }
        return true;
      });
    },
  },
  methods: {},
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

.add-profile {
  width: 4rem;
  padding-top: 1rem;
}

.b-container-fluid {
  padding-bottom: 2rem;
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
    width: 40vw;
  }

  .plus {
    position: absolute;
    right: 1rem;
  }
}

@media (min-width: 991.99px) {
  .select-selected {
    width: 30vw;
    margin: 0 auto;
  }
}
</style>
