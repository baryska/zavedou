<template>
  <!-- <b-col sm="12" md="12" lg="4"> -->
  <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle="'accordion-' + id" variant="info">
          <div class="d-flex justify-content-around align-items-center">
            <div class="picture">
              <img class="avatar" :src="image" />
            </div>
            <div class="name_surname">{{ firstName }} {{ lastName }}</div>
            <div class="subject">{{ subject }}</div>
          </div>
        </b-button>
      </b-card-header>
      <b-collapse
        :id="'accordion-' + id"
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <table>
            <tr>
              <b-card-text>
                <td>
                  <strong>Jsem z:</strong>
                </td>
                <td>{{ institution }}</td>
              </b-card-text>
            </tr>
            <tr>
              <b-card-text>
                <td>
                  <strong>Obor:</strong>
                </td>
                <td>{{ field }}</td>
              </b-card-text>
            </tr>
            <tr>
              <b-card-text>
                <td>
                  <strong>Nabízím:</strong>
                </td>
                <td>{{ offer }}</td>
              </b-card-text>
            </tr>
            <tr>
              <b-card-text>
                <td>
                  <strong>Pro koho:</strong>
                </td>
                <td>{{ whom }}</td>
              </b-card-text>
            </tr>
            <tr>
              <b-card-text>
                <td>
                  <strong>Působím v:</strong>
                </td>
                <td>{{ region }}</td>
              </b-card-text>
            </tr>
            <tr>
              <b-card-text>
                <td>
                  <strong>Kontakt:</strong>
                </td>
                <td>{{ contact }}</td>
              </b-card-text>
            </tr>
          </table>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
  <!-- </b-col> -->
</template>

<script>
export default {
  name: "Profile",
  props: [
    "id",
    "firstName",
    "lastName",
    "field",
    "subject",
    "institution",
    "offer",
    "whom",
    "region",
    "contact",
    "image",
  ],
};
</script>

<style>
.name_surname {
  font-family: "Roboto Slab";
  font-size: 1rem;
  width: 35%;
  margin-left: 2rem;
}

.subject {
  font-family: "Roboto Slab";
  font-size: 1rem;
  width: 30%;
}

.picture {
  width: 10%;
}

td:first-child {
  min-width: 10vw;
  padding: 1px;
}
td:nth-child(2) {
  padding-right: 1rem;
}

.avatar {
  height: 80px;
  width: 80px;
  padding: 0;
}

div[role="tablist"] {
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

.card.mb-1 {
  width: 30vw;
}

.card-text:last-child {
  width: 30vw;
}

.card-body {
  background-color: whitesmoke;
  font-family: "Roboto Slab";
  line-height: 35px;
}

.card-header:first-child {
  width: 30vw;
  height: 100px;
  background-color: #84d3ef;
}

.card-header.p-1 {
  padding: 0 !important; /*tímto přepisuji Bootstrap-Vue třídu, která má také !important */
}

.btn.btn-info {
  width: 30vw;
  height: 100px;
  background-color: #84d3ef;
  border-color: #84d3ef;
}

.btn.btn-info:hover {
  width: 30vw;
  height: 100px;
  background-color: #84d3ef;
  border-color: #84d3ef;
}

.btn.btn-info:focus {
  width: 30vw;
  height: 100px;
  background-color: #84d3ef;
  border-color: #84d3ef;
}

@media (max-width: 767.98px) {
  .avatar {
    height: 60px;
    width: 60px;
    padding: 0;
  }
  .card.mb-1 {
    width: 90vw;
  }

  .card-body {
    line-height: 25px;
  }

  .card-header:first-child {
    width: 90vw;
  }

  .btn.btn-info {
    width: 90vw;
  }

  .btn.btn-info:hover {
    width: 90vw;
  }
  .btn.btn-info:focus {
    width: 90vw;
  }
  td:first-child {
    min-width: 20vw;
    padding: 1px;
  }
  td:nth-child(2) {
    min-width: 15rem;
    padding: 0.5rem;
  }
}

@media (max-width: 991.98px) and (min-width: 767.99px) {
  td:first-child {
    min-width: 12vw;
    padding: 1px;
  }

  td:nth-child(2) {
    width: 15rem;
    padding: 0.5rem;
  }

  .avatar {
    height: 60px;
    width: 60px;
    padding: 0;
  }

  .card-body {
    line-height: 25px;
  }

  .card.mb-1 {
    width: 40vw;
  }

  .card-header:first-child {
    width: 40vw;
  }

  .btn.btn-info {
    width: 40vw;
  }

  .btn.btn-info:hover {
    width: 40vw;
  }
  .btn.btn-info:focus {
    width: 40vw;
  }
}

@media (min-width: 991.99px) {
  td:first-child {
    min-width: 6vw;
    padding: 1px;
  }
  td:nth-child(2) {
    width: 20rem;
  }
}
</style>
